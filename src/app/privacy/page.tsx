import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const scopeItems = [
    "使用 FOODLUCK APP 消費者版之一般使用者（以下稱「消費者」）。",
    "使用 FOODLUCK APP 店家版之餐飲業者（以下稱「店家」）。",
    "瀏覽 FOODLUCK 官方網站（foodluck.com.tw）之所有訪客。",
    "透過官網商家申請表單提交資料之申請者。",
];

const consumerAppRows = [
    ["帳號資料", "Email 信箱", "使用者主動提供"],
    ["第三方登入", "Google 帳號識別碼（不含密碼）", "Google 授權"],
    ["位置資料", "GPS 定位（搜尋附近店家用）", "使用者授權後取得"],
    ["訂購紀錄", "訂單編號、購買店家、金額、取餐時間", "交易產生"],
    [
        "付款資訊",
        "由 PAYUNi 金流服務商處理，本公司不儲存卡號",
        "PAYUNi 直接處理",
    ],
    ["評價內容", "消費者對店家之評價文字及評分", "使用者主動提供"],
    [
        "裝置硬體存取",
        "相機拍攝之照片、相簿中選取之圖片",
        "申訴退款上傳佐證照片時，經使用者授權後取得",
    ],
    ["裝置資訊", "裝置 ID、作業系統版本（推播通知用）", "系統自動取得"],
    ["使用行為", "瀏覽頁面、點擊行為（Firebase Analytics）", "系統自動蒐集"],
    [
        "系統錯誤紀錄",
        "APP 日誌、錯誤代碼（已去識別化）",
        "APP 發生異常時由 Firebase Crashlytics 自動蒐集",
    ],
];

const merchantAppRows = [
    ["帳號資料", "Email 信箱、手機號碼", "使用者主動提供"],
    ["店家資料", "店名、地址、食品業者登錄字號、負責人姓名", "使用者主動提供"],
    ["結款資訊", "銀行帳號、戶名、銀行代碼", "使用者主動提供"],
    ["上架紀錄", "Luckie Bag 品項、數量、定價、取餐時段", "使用者操作產生"],
    ["交易紀錄", "訂單明細、銷售金額、抽成明細、退款紀錄", "交易產生"],
    [
        "裝置硬體存取",
        "相機拍攝之照片、相簿中選取之圖片",
        "建立店家檔案或上傳食品照片時，經使用者授權後取得",
    ],
    ["裝置資訊", "裝置 ID、作業系統版本（推播通知用）", "系統自動取得"],
    ["使用行為", "後台操作紀錄（Firebase Analytics）", "系統自動蒐集"],
    [
        "系統錯誤紀錄",
        "APP 日誌、錯誤代碼（已去識別化）",
        "APP 發生異常時由 Firebase Crashlytics 自動蒐集",
    ],
];

const websiteRows = [
    [
        "瀏覽資料",
        "IP 位址（匿名化）、瀏覽頁面、停留時間、裝置類型",
        "Google Analytics 自動蒐集",
    ],
    ["廣告追蹤", "廣告點擊、轉換行為", "Facebook Pixel 自動蒐集"],
    [
        "商家申請資料",
        "店名、負責人姓名、電話、Email、地址、品項",
        "使用者主動填寫 Google 表單",
    ],
];

const purposes = [
    "提供消費者搜尋附近店家、訂購 Luckie Bag、完成取餐等核心服務。",
    "提供店家上架管理、訂單管理、交易報表及結款等後台服務。",
    "處理付款、退款及相關金流事宜。",
    "發送訂單確認、取餐提醒、系統公告等推播通知及 Email 通知。",
    "分析使用行為以優化 APP 體驗及官網效能（Firebase Analytics、Google Analytics）。",
    "評估廣告投放成效及建立再行銷受眾（Facebook Pixel）。",
    "審核商家申請、與申請者進行聯繫溝通。",
    "遵循中華民國相關法令規定。",
];

const thirdPartyRows = [
    [
        "PAYUNi 金流",
        "統一金流股份有限公司",
        "信用卡付款處理，本公司不接觸卡號",
        "payuni.com.tw",
    ],
    [
        "Firebase",
        "Google LLC",
        "APP 後端服務、推播通知、使用分析",
        "policies.google.com/privacy",
    ],
    [
        "Google 登入",
        "Google LLC",
        "消費者第三方帳號登入",
        "policies.google.com/privacy",
    ],
    [
        "Google Analytics",
        "Google LLC",
        "網站流量分析",
        "policies.google.com/privacy",
    ],
    [
        "Facebook Pixel",
        "Meta Platforms, Inc.",
        "廣告成效追蹤、再行銷受眾",
        "facebook.com/policy.php",
    ],
    [
        "Google 表單",
        "Google LLC",
        "商家申請資料收集與儲存",
        "policies.google.com/privacy",
    ],
];

const retentionRows = [
    ["消費者帳號資料", "帳號存續期間，刪除帳號後 90 天內銷毀", ""],
    ["消費者訂購紀錄", "自交易完成日起 3 年", "消費者保護法申訴期限"],
    ["店家帳號及交易紀錄", "自合約終止日起 5 年", "稅務申報需要"],
    ["店家結款帳戶資訊", "合約終止後立即刪除（法令要求保存者除外）", ""],
    ["網站瀏覽統計資料", "最長 26 個月", "Google Analytics 預設"],
    ["商家申請表單資料", "自收到申請日起 1 年", ""],
    ["Firebase 使用行為資料", "最長 14 個月", "Firebase 預設"],
];

const dataSharingItems = [
    "依法令規定或主管機關、司法機關之要求，本公司依法配合提供。",
    "為提供核心服務所必要之第三方服務商（如 PAYUNi 處理付款），均受保密義務約束。",
    "為保護本公司、使用者或第三人之合法權益，有必要揭露時。",
    "消費者之訂單資訊（不含個人識別資料）將提供予對應之店家，以利取餐作業。",
];

const rightsItems = [
    "查詢或閱覽：請求查詢本公司持有之您的個人資料。",
    "製給複製本：請求提供您個人資料之複本。",
    "補充或更正：如您的個人資料有誤，請求補充或更正。",
    "停止蒐集、處理或利用：請求停止蒐集、處理或利用您的個人資料。",
    "刪除：請求刪除您的個人資料（法令要求保存者除外）。",
];

const securityItems = [
    "APP 與伺服器之間採用 HTTPS/TLS 加密傳輸。",
    "信用卡付款資料由 PCI DSS 合規之 PAYUNi 處理，本公司不接觸卡號。",
    "店家結款帳戶資訊存放於受存取控制之系統，僅授權之財務人員可存取。",
    "Firebase 後端服務採用 Google Cloud 之安全基礎架構。",
    "定期檢視資料存取權限，確保僅必要人員可接觸個人資料。",
];

export const metadata: Metadata = {
    title: "隱私權政策 | FOODLUCK",
    description: "FOODLUCK 隱私權政策與個人資料保護說明。",
};

function Section({
    id,
    title,
    children,
}: Readonly<{
    id: string;
    title: string;
    children: React.ReactNode;
}>) {
    return (
        <section
            id={id}
            className="scroll-mt-28 space-y-5 border-b border-gray-200 pb-10 last:border-b-0"
        >
            <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                    Privacy Policy
                </p>
                <h2 className="text-2xl font-black text-gray-900 md:text-3xl">
                    {title}
                </h2>
            </div>
            {children}
        </section>
    );
}

function BulletList({ items }: Readonly<{ items: string[] }>) {
    return (
        <ul className="space-y-3 text-base leading-8 text-gray-700">
            {items.map((item) => (
                <li key={item} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    );
}

function PolicyTable({
    headers,
    rows,
}: Readonly<{
    headers: string[];
    rows: string[][];
}>) {
    return (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 text-left">
                    <thead className="bg-gray-50">
                        <tr>
                            {headers.map((header) => (
                                <th
                                    key={header}
                                    className="px-4 py-3 text-sm font-semibold tracking-wide text-gray-700"
                                    scope="col"
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {rows.map((row) => (
                            <tr key={row.join("-")} className="align-top">
                                {row.map((cell) => (
                                    <td
                                        key={cell}
                                        className="px-4 py-3 text-sm leading-7 text-gray-600"
                                    >
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default function PrivacyPage() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-[linear-gradient(180deg,_#f7fbf8_0%,_#ffffff_18%,_#ffffff_100%)]">
                <section className="border-b border-primary/10 bg-[radial-gradient(circle_at_top_left,_rgba(52,171,124,0.16),_transparent_35%),linear-gradient(135deg,_rgba(12,28,22,0.96),_rgba(18,72,54,0.9))] text-white">
                    <div className="mx-auto max-w-6xl px-6 pb-16 pt-28 md:pb-20 md:pt-32">
                        <div className="max-w-3xl space-y-6">
                            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
                                Privacy Policy
                            </span>
                            <h1 className="text-4xl font-black leading-tight md:text-6xl">
                                FOODLUCK 隱私權政策
                            </h1>
                            <div className="space-y-2 text-base leading-8 text-white/80 md:text-lg">
                                <p>版本：1.0</p>
                                <p>最後更新日期：115 年 4 月 28 日</p>
                                <p>
                                    適用範圍：FOODLUCK APP、FOODLUCK商家 APP
                                    及官方網站
                                </p>
                            </div>
                            <p className="max-w-2xl text-base leading-8 text-white/85 md:text-lg">
                                本隱私權政策說明 FOODLUCK
                                福來科技有限公司如何蒐集、處理、利用及保護您在使用
                                FOODLUCK APP
                                及官方網站時所提供或產生之個人資料。請於使用本服務前詳細閱讀本政策。
                            </p>
                        </div>
                    </div>
                </section>

                <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
                    <div className="grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)]">
                        <aside className="lg:sticky lg:top-28 lg:self-start">
                            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                                <h2 className="text-sm font-bold uppercase tracking-[0.25em] text-gray-500">
                                    章節索引
                                </h2>
                                <nav className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
                                    {[
                                        ["controller", "第一條 資料控制者資訊"],
                                        ["scope", "第二條 本政策適用範圍"],
                                        [
                                            "collection",
                                            "第三條 蒐集之個人資料類型",
                                        ],
                                        ["purpose", "第四條 資料蒐集目的"],
                                        [
                                            "third-party",
                                            "第五條 第三方服務說明",
                                        ],
                                        ["location", "第六條 位置資料之使用"],
                                        ["push", "第七條 推播通知"],
                                        ["cookie", "第八條 Cookie 與追蹤技術"],
                                        ["retention", "第九條 資料保存期限"],
                                        ["sharing", "第十條 資料分享與揭露"],
                                        ["rights", "第十一條 您的個資權利"],
                                        ["security", "第十二條 資料安全"],
                                        [
                                            "cross-border",
                                            "第十三條 個人資料之境外傳輸",
                                        ],
                                        ["minor", "第十四條 未成年人隱私"],
                                        ["revision", "第十五條 政策修訂"],
                                        ["contact", "第十六條 聯絡我們"],
                                    ].map(([id, label]) => (
                                        <a
                                            key={id}
                                            href={`#${id}`}
                                            className="block transition-colors hover:text-primary"
                                        >
                                            {label}
                                        </a>
                                    ))}
                                </nav>
                            </div>
                        </aside>

                        <div className="space-y-10">
                            <Section
                                id="controller"
                                title="第一條 資料控制者資訊"
                            >
                                <div className="grid gap-4 md:grid-cols-2">
                                    {[
                                        [
                                            "公司名稱",
                                            "FOODLUCK 福來科技有限公司",
                                        ],
                                        ["統一編號", "62214273"],
                                        [
                                            "公司地址",
                                            "臺北市中正區館前路 43 號 7 樓",
                                        ],
                                        [
                                            "隱私權聯絡信箱",
                                            "service@foodluck.com.tw",
                                        ],
                                        [
                                            "官方網站",
                                            "https://www.foodluck.com.tw",
                                        ],
                                    ].map(([label, value]) => (
                                        <div
                                            key={label}
                                            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                                        >
                                            <p className="text-sm font-semibold text-gray-500">
                                                {label}
                                            </p>
                                            <p className="mt-2 text-base font-medium leading-7 text-gray-800">
                                                {value}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </Section>

                            <Section id="scope" title="第二條 本政策適用範圍">
                                <BulletList items={scopeItems} />
                            </Section>

                            <Section
                                id="collection"
                                title="第三條 蒐集之個人資料類型"
                            >
                                <div className="space-y-8">
                                    <div className="space-y-4">
                                        <h3 className="text-xl font-bold text-gray-900">
                                            3.1 消費者 APP
                                        </h3>
                                        <PolicyTable
                                            headers={[
                                                "資料類型",
                                                "具體項目",
                                                "蒐集方式",
                                            ]}
                                            rows={consumerAppRows}
                                        />
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-xl font-bold text-gray-900">
                                            3.2 店家 APP
                                        </h3>
                                        <PolicyTable
                                            headers={[
                                                "資料類型",
                                                "具體項目",
                                                "蒐集方式",
                                            ]}
                                            rows={merchantAppRows}
                                        />
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-xl font-bold text-gray-900">
                                            3.3 官方網站
                                        </h3>
                                        <PolicyTable
                                            headers={[
                                                "資料類型",
                                                "具體項目",
                                                "蒐集方式",
                                            ]}
                                            rows={websiteRows}
                                        />
                                    </div>

                                    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
                                        <h3 className="text-xl font-bold text-gray-900">
                                            3.4 社群媒體互動資料
                                        </h3>
                                        <p className="mt-3 text-base leading-8 text-gray-700">
                                            當您透過
                                            Facebook、Instagram、Threads、LINE
                                            等社群媒體與本公司官方帳號進行互動（如按讚、留言、私訊）時，本公司將蒐集您的公開社群帳號名稱、大頭貼及您主動提供之訊息內容，用於客服回應或行銷活動之用途。上述社群平台各自之隱私政策亦同時適用，建議您自行閱覽。
                                        </p>
                                    </div>
                                </div>
                            </Section>

                            <Section id="purpose" title="第四條 資料蒐集目的">
                                <BulletList items={purposes} />
                            </Section>

                            <Section
                                id="third-party"
                                title="第五條 第三方服務說明"
                            >
                                <div className="space-y-5">
                                    <p className="text-base leading-8 text-gray-700">
                                        本服務使用下列第三方服務，各服務提供商依其隱私權政策獨立處理相關資料：
                                    </p>
                                    <PolicyTable
                                        headers={[
                                            "第三方服務",
                                            "服務提供商",
                                            "用途",
                                            "隱私權政策",
                                        ]}
                                        rows={thirdPartyRows}
                                    />
                                    <p className="text-base leading-8 text-gray-700">
                                        本公司對上述第三方服務提供商之資料處理方式不負責任，建議您自行閱覽各服務之隱私權政策。
                                    </p>
                                    <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
                                        <h3 className="text-xl font-bold text-gray-900">
                                            5.1 信用卡資料之特別說明
                                        </h3>
                                        <p className="mt-3 text-base leading-8 text-gray-700">
                                            消費者之信用卡付款資料由
                                            PAYUNi（統一金流）直接處理，本公司不儲存、不接觸任何信用卡卡號或完整付款資訊。本公司僅保有交易結果（成功／失敗）及交易金額等必要資訊。
                                        </p>
                                    </div>
                                </div>
                            </Section>

                            <Section
                                id="location"
                                title="第六條 位置資料之使用"
                            >
                                <p className="text-base leading-8 text-gray-700">
                                    消費者 APP
                                    於使用「搜尋附近店家」功能時，將請求存取您的裝置
                                    GPS 定位資料。
                                </p>
                                <BulletList
                                    items={[
                                        "位置資料僅用於顯示您附近之 Luckie Bag 店家，不會長期儲存或用於其他目的。",
                                        "您可隨時於裝置設定中關閉位置存取權限，但將無法使用「搜尋附近店家」功能。",
                                        "本公司不會將您的精確位置資料分享予第三方。",
                                    ]}
                                />
                            </Section>

                            <Section id="push" title="第七條 推播通知">
                                <p className="text-base leading-8 text-gray-700">
                                    本服務透過 Firebase Cloud Messaging
                                    發送推播通知，包含訂單確認、取餐提醒、系統公告及行銷訊息。
                                </p>
                                <BulletList
                                    items={[
                                        "首次安裝 APP 時，系統將請求您的推播通知授權。",
                                        "您可隨時於裝置設定中關閉推播通知，但可能影響訂單相關通知之接收。",
                                        "推播通知需使用您的裝置 ID，本公司僅將裝置 ID 用於發送通知，不作其他用途。",
                                    ]}
                                />
                            </Section>

                            <Section
                                id="cookie"
                                title="第八條 Cookie 與追蹤技術"
                            >
                                <p className="text-base leading-8 text-gray-700">
                                    本服務於官方網站使用以下追蹤技術：
                                </p>
                                <BulletList
                                    items={[
                                        "必要性 Cookie：維持網站基本功能，無法關閉。",
                                        "分析性 Cookie：由 Google Analytics 設置，以匿名形式統計網站流量。",
                                        "行銷性 Cookie：由 Facebook Pixel 設置，用於追蹤廣告成效及建立再行銷受眾。",
                                    ]}
                                />
                                <p className="text-base leading-8 text-gray-700">
                                    您可透過瀏覽器設定拒絕或刪除
                                    Cookie。如需停用 Google Analytics
                                    追蹤，可安裝
                                    <a
                                        href="https://tools.google.com/dlpage/gaoptout"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="ml-1 font-semibold text-primary underline decoration-primary/40 underline-offset-4"
                                    >
                                        Google Analytics 停用附加元件
                                    </a>
                                    。
                                </p>
                            </Section>

                            <Section id="retention" title="第九條 資料保存期限">
                                <PolicyTable
                                    headers={["資料類型", "保存期限", "說明"]}
                                    rows={retentionRows}
                                />
                            </Section>

                            <Section id="sharing" title="第十條 資料分享與揭露">
                                <p className="text-base leading-8 text-gray-700">
                                    本公司不會將您的個人資料出售予第三方。下列情況下，本公司可能分享您的資料：
                                </p>
                                <BulletList items={dataSharingItems} />
                            </Section>

                            <Section id="rights" title="第十一條 您的個資權利">
                                <BulletList items={rightsItems} />
                                <p className="text-base leading-8 text-gray-700">
                                    如需行使上述權利，請以 Email
                                    聯繫本公司（service@foodluck.com.tw），本公司將於收到請求後十四（14）個工作日內回覆處理。
                                </p>

                                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                                    <h3 className="text-xl font-bold text-gray-900">
                                        11.1 帳號刪除機制
                                    </h3>
                                    <BulletList
                                        items={[
                                            "消費者：可於 APP 內「設定 > 帳號管理 > 刪除帳號」自行完成帳號註銷，無需聯繫客服。",
                                            "店家：請聯繫客服信箱（service@foodluck.com.tw）辦理帳號註銷，本公司將於七（7）個工作日內完成處理。",
                                        ]}
                                    />
                                    <p className="mt-4 text-base leading-8 text-gray-700">
                                        帳號刪除後，您的個人識別資料將被永久匿名化或銷毀。惟依相關稅務法規及為解決潛在爭議之必要，本公司將保留必要之交易紀錄（如訂單明細、結算紀錄）至法定期限屆滿（最長五（5）年）後始予銷毀。
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                                    <h3 className="text-xl font-bold text-gray-900">
                                        11.2 行銷訊息之拒絕權
                                    </h3>
                                    <p className="mt-3 text-base leading-8 text-gray-700">
                                        本公司可能透過推播通知或 Email
                                        向您發送行銷優惠訊息。您有權隨時拒絕接收此類行銷訊息：
                                    </p>
                                    <BulletList
                                        items={[
                                            "推播通知：於 APP 設定中關閉「行銷推播」，或於裝置系統設定中關閉本 APP 之通知權限。",
                                            "Email 行銷訊息：點擊 Email 底部之「取消訂閱」連結，或聯繫客服信箱辦理。",
                                        ]}
                                    />
                                    <p className="mt-4 text-base leading-8 text-gray-700">
                                        當您表示拒絕後，本公司將立即停止向您發送行銷訊息。惟與訂單交易直接相關之系統通知（如取餐提醒、退款通知）不受拒絕行銷之影響，仍將正常發送。
                                    </p>
                                </div>
                            </Section>

                            <Section id="security" title="第十二條 資料安全">
                                <BulletList items={securityItems} />
                                <p className="text-base leading-8 text-gray-700">
                                    儘管本公司已採取合理之安全措施，網際網路傳輸無法保證絕對安全。如發生資料外洩事件，本公司將依個資法規定於發現後七十二（72）小時內通知主管機關，並儘速通知受影響之使用者。
                                </p>
                            </Section>

                            <Section
                                id="cross-border"
                                title="第十三條 個人資料之境外傳輸"
                            >
                                <p className="text-base leading-8 text-gray-700">
                                    本服務使用 Google Firebase
                                    等國際雲端服務供應商，您的個人資料可能因此被傳輸、儲存及處理於中華民國境外之伺服器（包含但不限於日本、新加坡或美國之
                                    Google Cloud 資料中心）。
                                </p>
                                <p className="text-base leading-8 text-gray-700">
                                    本公司依據中華民國個人資料保護法第二十一條規定，已採取下列措施確保境外傳輸之安全：
                                </p>
                                <BulletList
                                    items={[
                                        "要求境外服務提供商提供與本政策同等標準之資料安全保護。",
                                        "選擇具備 ISO 27001 或同等資安認證之服務提供商。",
                                        "與境外服務提供商簽訂資料處理協議，明確限制資料使用目的。",
                                    ]}
                                />
                                <p className="text-base leading-8 text-gray-700">
                                    繼續使用本服務，即表示您同意您的個人資料依本政策所述方式進行境外傳輸。
                                </p>
                            </Section>

                            <Section id="minor" title="第十四條 未成年人隱私">
                                <p className="text-base leading-8 text-gray-700">
                                    本服務未針對未成年人設計特定功能，亦不刻意蒐集未成年人之個人資料。未成年人使用本服務，視為已獲得法定代理人同意。如本公司發現在未獲得法定代理人同意之情形下蒐集了未成年人之個人資料，將立即予以刪除。
                                </p>
                            </Section>

                            <Section id="revision" title="第十五條 政策修訂">
                                <p className="text-base leading-8 text-gray-700">
                                    本公司保有隨時修訂本隱私權政策之權利。修訂後之政策將於本服務（APP
                                    及官網）公告，並標示最後更新日期。重大變更時，本公司將以推播通知或
                                    Email
                                    之顯著方式通知使用者，並於修訂生效前至少七（7）日公告。
                                </p>
                                <p className="text-base leading-8 text-gray-700">
                                    繼續使用本服務即視為同意接受修訂後之隱私權政策。
                                </p>
                            </Section>

                            <Section id="contact" title="第十六條 聯絡我們">
                                <div className="grid gap-4 md:grid-cols-3">
                                    {[
                                        [
                                            "隱私權及客服信箱",
                                            "service@foodluck.com.tw",
                                        ],
                                        [
                                            "公司地址",
                                            "臺北市中正區館前路 43 號 7 樓",
                                        ],
                                        [
                                            "客服時間",
                                            "週一至週五 10:00–18:00（國定假日除外）",
                                        ],
                                    ].map(([label, value]) => (
                                        <div
                                            key={label}
                                            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                                        >
                                            <p className="text-sm font-semibold text-gray-500">
                                                {label}
                                            </p>
                                            <p className="mt-2 text-base leading-7 text-gray-800">
                                                {value}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                                <div className="rounded-3xl bg-gray-900 px-6 py-8 text-white">
                                    <p className="text-lg leading-8 text-white/90">
                                        FOODLUCK
                                        重視每一位使用者的隱私，並致力於以透明、負責任的方式處理您的個人資料。感謝您對我們的信任與支持。
                                    </p>
                                </div>
                            </Section>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
