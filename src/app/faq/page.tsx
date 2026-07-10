import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LineContactLink from "@/components/LineContactLink";

type FaqItem = {
    question: string;
    answer?: string[];
    steps?: string[];
    bullets?: string[];
    note?: string;
};

type FaqSection = {
    id: string;
    eyebrow: string;
    title: string;
    description: string;
    audience: string;
    items: FaqItem[];
};

const faqSections: FaqSection[] = [
    {
        id: "consumer",
        eyebrow: "For Consumers",
        title: "消費者常見問題",
        description:
            "從預訂、取餐到申訴與點數規則，快速找到使用 FOODLUCK 時最常遇到的問題。",
        audience: "適用對象：消費者版 APP 使用者",
        items: [
            {
                question: "什麼是 Luckie Bag？",
                answer: [
                    "Luckie Bag 是以盲盒形式呈現的組合商品，內容主要是店家打烊前尚未售完的餐點。",
                    "透過優惠價格銷售，消費者能以更實惠的價格享用美食，同時幫助商家降低報廢與食物浪費，一起實踐永續飲食。",
                ],
            },
            {
                question: "為什麼採用盲盒形式？",
                answer: [
                    "Foodluck 採用盲盒機制，是為了降低店家逐項上架剩餘餐點的作業負擔。",
                    "由於每日剩餘品項不固定，若要求店家逐一建檔，會大幅增加行政與核對成本；改用盲盒後，店家能在不影響打烊流程的情況下更快出貨，也讓平台整體運作更有效率。",
                ],
            },
            {
                question: "訂購流程是什麼？",
                steps: [
                    "線上預訂：打開 App 探索附近美味，將商品加入購物車並確認下單。",
                    "到店付款：於約定取餐時間內抵達店家，支付餐點費用。",
                    "掃描核銷：點選訂單資訊中的「掃描店家 QR Code」或提供核銷碼給店員。",
                    "領取餐點：完成核銷後即可取餐享用。",
                    "評論積點：留下評論後，還能獲得 Luckie Points。",
                ],
                note: "核銷成功才視為完成訂單，請務必完成此步驟。",
            },
            {
                question: "餐點有狀況怎麼辦？",
                answer: [
                    "若有任何餐點相關疑問，請於取餐後 24 小時內，至 App 訂單列表點選該筆訂單，並使用頁面下方的「申訴」功能反映。",
                    "客服團隊將協助釐清狀況並處理後續事宜。",
                ],
            },
            {
                question: "可以取消訂單嗎？",
                answer: [
                    "由於 Luckie Bag 具高度時效性，每次取消都可能導致餐點浪費，因此平台目前不提供消費者主動取消訂單。",
                    "下單前請務必確認時間與距離，確保能準時前往取餐。",
                ],
            },
            {
                question: "所在地區何時開放？",
                answer: [
                    "Foodluck 目前採取分區穩健擴張策略。若您所在的地區尚未開放，歡迎於 App 中使用「集氣功能」。",
                    "該地區集氣人數越多，我們越有機會優先規劃進駐。",
                ],
            },
            {
                question: "可以查看商家過去的餐點嗎？",
                answer: [
                    "可以。點選首頁「附近的 Luckie Bags」旁的「看全部」，再於篩選器中選擇「已過期」或「已售完」，即可瀏覽商家過往的餐點紀錄。",
                ],
            },
            {
                question: "可以委託他人代領嗎？",
                answer: [
                    "可以。進入「我的訂單」中的取餐資訊，點擊 QR Code 下方的「或點我顯示取貨碼供店家核銷」，將畫面截圖傳給代領者即可。",
                    "對方出示該畫面後，店家即可完成核銷並交付餐點。",
                ],
            },
            {
                question: "商家上架會有通知嗎？",
                answer: [
                    "會。進入商家頁面後點擊右上角的愛心收藏店家，當對方上架 Luckie Bag 時，您就會收到推播通知。",
                ],
            },
            {
                question: "會有收據或發票嗎？",
                answer: [
                    "購買流程與一般消費相同，是否提供發票或收據依店家規定辦理。",
                    "若店家依法需開立發票，將依規定提供；免用統一發票之店家，則依相關法規辦理。",
                ],
            },
            {
                question: "店家臨時取消餐點怎麼辦？",
                answer: [
                    "若遇現場突發狀況導致店家取消訂單，Foodluck 會立即推播通知您。",
                    "平台也會對店家進行違規記點，以降低常態性取消的發生並保障消費體驗。",
                ],
            },
            {
                question: "看到不適當的圖片或文案？",
                answer: [
                    "若您發現內容不妥，請點擊評論或商家頁面右上角的「更多選項」（垂直三個點），使用檢舉或封鎖功能即可。",
                ],
            },
            {
                question: "如何獲得與使用 Luckie Points？",
                bullets: [
                    "獲取方式：每筆訂單金額達 50 元，取餐並完成評論即可獲得 1 點；100 元獲得 2 點，以此類推。",
                    "點數價值：1 點等同 1 元，於下次預訂時可折抵消費，每筆訂單最高可折抵總金額的 20%。",
                ],
            },
            {
                question: "沒去取餐會怎樣？",
                answer: [
                    "未在時間內取餐將視同棄單。累積 2 次棄單會收到平台警告，累積達 3 次則可能停權。",
                    "請珍惜餐點，也請務必在取餐時段內完成領取。",
                ],
            },
        ],
    },
    {
        id: "merchant",
        eyebrow: "For Merchants",
        title: "商家常見問題",
        description:
            "整理商家最常問的上架、收費、核銷與訂單異常處理方式，方便快速了解 FOODLUCK 的合作流程。",
        audience: "適用對象：店家版 APP 使用者與申請中的合作商家",
        items: [
            {
                question: "什麼是 Luckie Bag？",
                answer: [
                    "Luckie Bag 是由店家打烊前尚未售完的餐點組成的盲盒商品。",
                    "透過這個機制，您能更有效處理剩餘食材並回收部分營運成本。",
                ],
            },
            {
                question: "價格與內容物有何規範？",
                answer: [
                    "您可以用單一或多種品項組成一份 Luckie Bag，售價需設定在原價 7 折以下。",
                    "上架時也請務必勾選常見過敏原，協助消費者更安全地選購。",
                ],
            },
            {
                question: "收費方式如何？",
                answer: [
                    "Foodluck 目前主打低門檻合作，無月費、無上架費，且每月銷售額 1,000 元內完全免費。",
                    "若需要進一步了解合作費率與方案細節，歡迎聯繫客服。",
                ],
            },
            {
                question: "取餐流程為何？",
                steps: [
                    "消費者完成預訂並依約到店。",
                    "店家依實際交易流程開立發票或收據。",
                    "消費者掃描 QR Code，或由店家手動核銷取貨碼。",
                    "確認核銷完成後，再將餐點交付給消費者。",
                ],
            },
            {
                question: "參與平台有什麼好處？",
                bullets: [
                    "成本回收：有效處理剩餘食材，回收部分營運成本。",
                    "擴大客源：透過平台接觸新客群，將線上買家轉化為忠實顧客。",
                    "品牌曝光：提升品牌在區域內的知名度與曝光度。",
                ],
            },
            {
                question: "上架流程難嗎？",
                answer: [
                    "操作相當簡單，只需拍攝餐點照片或使用系統預設圖，接著選擇分類、勾選過敏原、填寫名稱與價格，再輸入介紹與庫存即可上架。",
                    "系統支援重複使用既有商品與快速調整，後續多半只需修改數量即可。",
                ],
            },
            {
                question: "消費者預訂後臨時無法出貨怎麼辦？",
                answer: [
                    "若遇突發狀況，請至訂單頁面點擊該筆訂單後選擇取消。",
                    "請注意，每次取消皆可能被記點；為避免消費者撲空影響評價，建議您平時區分現場銷售量與平台預留量。",
                ],
            },
            {
                question: "沒售完需要下架嗎？",
                answer: [
                    "不需要。當系統時間超過您設定的取餐截止時間後，平台會自動將數量歸零。",
                    "若隔天要再上架，只需重新調整庫存數量即可。",
                ],
            },
            {
                question: "消費者未取餐該怎麼辦？",
                answer: [
                    "若超過取餐時間仍無人領取，系統會視為消費者棄單，平台也會對該名消費者進行違規記點。",
                    "至於餐點後續如何處置，則由店家自行決定。",
                ],
            },
            {
                question: "消費者反應餐點問題怎麼辦？",
                answer: [
                    "食安責任的歸屬與一般銷售相同。若消費者透過 App 提出申訴，平台會協助了解狀況並提供必要協助。",
                ],
            },
            {
                question: "惡意或不實評論怎麼處理？",
                answer: [
                    "若收到惡意評論，請點擊評論內容旁的「更多選項」（垂直三個點）進行檢舉，平台會盡快審核並協助處理。",
                ],
            },
        ],
    },
];

export const metadata: Metadata = {
  title: "常見問題 | FOODLUCK",
  description:
    "查看 FOODLUCK 消費者與商家的常見問題，快速了解預訂、取餐、上架、核銷與合作流程。",
};

const lineOfficialAccount = "https://lin.ee/OUqBsHc";

function FaqEntry({ item }: Readonly<{ item: FaqItem }>) {
    return (
        <details className="rounded-3xl border border-gray-200 bg-white shadow-sm">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 p-6">
                <div className="space-y-2">
                    <h3 className="text-lg font-bold leading-8 text-gray-900 md:text-xl">
                        {item.question}
                    </h3>
                    {item.note ? (
                        <p className="text-sm font-medium leading-6 text-primary">
                            {item.note}
                        </p>
                    ) : null}
                </div>
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/15 bg-primary/5 text-xl font-light text-primary">
                    +
                </span>
            </summary>

            <div className="border-t border-gray-100 px-6 py-5">
                <div className="space-y-4 text-base leading-8 text-gray-700">
                    {item.answer?.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                    ))}

                    {item.steps ? (
                        <ol className="space-y-3 pl-6 text-gray-700">
                            {item.steps.map((step) => (
                                <li key={step} className="list-decimal">
                                    {step}
                                </li>
                            ))}
                        </ol>
                    ) : null}

                    {item.bullets ? (
                        <ul className="space-y-3">
                            {item.bullets.map((bullet) => (
                                <li key={bullet} className="flex gap-3">
                                    <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-primary" />
                                    <span>{bullet}</span>
                                </li>
                            ))}
                        </ul>
                    ) : null}
                </div>
            </div>
        </details>
    );
}

function FaqSectionBlock({ section }: Readonly<{ section: FaqSection }>) {
    return (
        <section
            id={section.id}
            className="scroll-mt-28 space-y-6 border-b border-gray-200 pb-10 last:border-b-0"
        >
            <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                    {section.eyebrow}
                </p>
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div className="space-y-3">
                        <h2 className="text-3xl font-black leading-tight text-gray-900 md:text-4xl">
                            {section.title}
                        </h2>
                        <p className="max-w-3xl text-base leading-8 text-gray-700">
                            {section.description}
                        </p>
                    </div>
                </div>
                <p className="text-sm leading-6 text-gray-500">
                    {section.audience}
                </p>
            </div>

            <div className="space-y-4">
                {section.items.map((item) => (
                    <FaqEntry key={item.question} item={item} />
                ))}
            </div>
        </section>
    );
}

export default function FaqPage() {
    const totalQuestions = faqSections.reduce(
        (count, section) => count + section.items.length,
        0,
    );

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-[linear-gradient(180deg,_#f7fbf8_0%,_#ffffff_18%,_#ffffff_100%)]">
                <section className="border-b border-primary/10 bg-[radial-gradient(circle_at_top_left,_#34ab7c,_transparent_35%),linear-gradient(135deg,_#34ab7c,_#34ab7c)] text-white mb-10">
                    <div className="mx-auto max-w-6xl px-6 pb-16 pt-28 md:pb-20 md:pt-32">
                        <div className="max-w-3xl space-y-6">
                            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
                                FAQ
                            </span>
                            <h1 className="text-4xl font-black leading-tight md:text-6xl">
                                FOODLUCK 常見問題
                            </h1>
                        </div>
                    </div>
                </section>

                <section className="mx-auto max-w-6xl px-6 pb-20">
                    <div className="grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)]">
                        <aside className="lg:sticky lg:top-28 lg:self-start">
                            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                                <h2 className="text-sm font-bold uppercase tracking-[0.25em] text-gray-500">
                                    章節索引
                                </h2>
                                <nav className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
                                    {faqSections.map((section) => (
                                        <a
                                            key={section.id}
                                            href={`#${section.id}`}
                                            className="block transition-colors hover:text-primary"
                                        >
                                            {section.title}
                                        </a>
                                    ))}
                                </nav>
                            </div>
                        </aside>

                        <div className="min-w-0 space-y-10">
                            {faqSections.map((section) => (
                                <FaqSectionBlock
                                    key={section.id}
                                    section={section}
                                />
                            ))}

                            <section className="rounded-[2rem] border border-primary/15 bg-[linear-gradient(135deg,_rgba(52,171,124,0.08),_rgba(52,171,124,0.02))] p-8 shadow-sm">
                                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                                    Need More Help
                                </p>
                                <h2 className="mt-4 text-3xl font-black leading-tight text-gray-900">
                                    找不到你要的答案？
                                </h2>
                                <p className="mt-4 max-w-2xl text-base leading-8 text-gray-700">
                                    如果你的問題沒有列在這裡，歡迎直接聯繫我們，或前往商家申請頁了解合作流程。
                                </p>
                                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                                    <Link
                                        href="/merchant-apply"
                                        className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
                                    >
                                        查看商家申請
                                    </Link>
                                    <LineContactLink
                                        href={lineOfficialAccount}
                                        className="inline-flex items-center justify-center gap-3 rounded-full border border-[#06C755]/25 bg-white px-6 py-3 text-sm font-semibold text-gray-800 transition-colors hover:border-[#06C755] hover:text-[#06C755]"
                                    />
                                    <a
                                        href="mailto:service@foodluck.com.tw"
                                        className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-800 transition-colors hover:border-primary hover:text-primary"
                                    >
                                        service@foodluck.com.tw
                                    </a>
                                </div>
                            </section>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
