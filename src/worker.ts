/**
 * foodluck.com.tw worker（#277 店家 QR App Links）
 *
 * 只有兩類路徑會進到這裡（wrangler.jsonc `run_worker_first`），其餘全部直接由 static assets 服務：
 *   /.well-known/apple-app-site-association  iOS Universal Links 驗證檔（純 JSON、200、不轉址）
 *   /.well-known/assetlinks.json             Android App Links 驗證檔
 *   /s/{storeCode}                           店家 QR：有裝 App 的手機由 OS 直接開 App、到不了這裡；
 *                                            沒裝的 iOS/Android 302 到商店，其他（桌機、爬蟲）顯示導引頁
 * 另外 www → apex 的 301 也在這裡（WWW_REDIRECT）。
 */
export interface Env {
    ASSETS: Fetcher;
    SITE_HOST: string;
    WWW_REDIRECT: string;
    IOS_APP_IDS: string;
    ANDROID_PACKAGE: string;
    ANDROID_SHA256: string;
    APP_STORE_ID: string;
    IOS_STORE_URL: string;
    ANDROID_STORE_URL: string;
    STORE_REDIRECT: string;
}

const STORE_CODE = /^\/s\/([A-Za-z0-9]{4,32})\/?$/;

const list = (value: string): string[] =>
    value
        .split(",")
        .map((v) => v.trim())
        .filter((v) => v.length > 0 && !v.startsWith("REPLACE_WITH"));

const json = (body: unknown): Response =>
    new Response(JSON.stringify(body), {
        status: 200,
        headers: {
            "content-type": "application/json",
            // Apple / Google 會快取；改了驗證內容想快點生效就縮短
            "cache-control": "public, max-age=3600",
        },
    });

export function appleAppSiteAssociation(env: Env) {
    return {
        applinks: {
            details: [
                {
                    appIDs: list(env.IOS_APP_IDS),
                    components: [{ "/": "/s/*", comment: "FOODLUCK 店家取餐 QR Code" }],
                },
            ],
        },
    };
}

export function assetLinks(env: Env) {
    return [
        {
            relation: ["delegate_permission/common.handle_all_urls"],
            target: {
                namespace: "android_app",
                package_name: env.ANDROID_PACKAGE,
                sha256_cert_fingerprints: list(env.ANDROID_SHA256),
            },
        },
    ];
}

export type Platform = "ios" | "android" | "other";

/** 只看 UA 粗分：iPhone/iPad/iPod → ios；Android → android；其餘（桌機、爬蟲、判不出來）→ other */
export function detectPlatform(userAgent: string | null): Platform {
    const ua = userAgent ?? "";
    if (/iPhone|iPad|iPod/i.test(ua)) return "ios";
    if (/Android/i.test(ua)) return "android";
    return "other";
}

function withReferrer(storeUrl: string, storeCode: string): string {
    // Play 的 install referrer：Android App 安裝後可讀到，之後要做「裝完帶到那家店」有材料；iOS 沒有對應機制
    try {
        const url = new URL(storeUrl);
        if (url.hostname === "play.google.com") {
            url.searchParams.set("referrer", `store_code=${storeCode}`);
        }
        return url.toString();
    } catch {
        return storeUrl;
    }
}

export default {
    async fetch(request: Request, env: Env): Promise<Response> {
        const url = new URL(request.url);

        if (env.WWW_REDIRECT === "1" && url.hostname === `www.${env.SITE_HOST}`) {
            url.hostname = env.SITE_HOST;
            return Response.redirect(url.toString(), 301);
        }

        if (url.pathname === "/.well-known/apple-app-site-association") {
            return json(appleAppSiteAssociation(env));
        }
        if (url.pathname === "/.well-known/assetlinks.json") {
            return json(assetLinks(env));
        }

        const match = STORE_CODE.exec(url.pathname);
        if (match) {
            const storeCode = match[1];
            if (env.STORE_REDIRECT === "1") {
                const platform = detectPlatform(request.headers.get("user-agent"));
                const target =
                    platform === "ios" ? env.IOS_STORE_URL : platform === "android" ? env.ANDROID_STORE_URL : "";
                if (target) {
                    return new Response(null, {
                        status: 302,
                        headers: { location: withReferrer(target, storeCode), "cache-control": "no-store" },
                    });
                }
            }
            // 導引頁：靜態的 /s/ 頁面，code 由頁面 JS 從網址讀（只顯示、不打 API）
            const page = await env.ASSETS.fetch(new Request(new URL("/s/", request.url), request));
            return new Response(page.body, {
                status: page.status === 200 ? 200 : page.status,
                headers: { ...Object.fromEntries(page.headers), "cache-control": "no-store" },
            });
        }

        return env.ASSETS.fetch(request);
    },
} satisfies ExportedHandler<Env>;
