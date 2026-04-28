import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const eligibilityItems = [
    "具有合法使用電子付款工具之能力。",
    "提供真實有效之 Email 信箱，並完成 Email 認證。",
    "同意本條款及本平台之隱私權政策。",
];

const purchaseFlowItems = [
    "於 APP 瀏覽附近店家，選擇欲購買之 Luckie Bag。",
    "確認取餐時段後完成付款。",
    "依指定取餐時段前往店家，出示訂單 QR Code。",
    "取餐完成後，歡迎於 APP 留下評價。",
];

const allergenItems = [
    "蝦、蟹（甲殼類）",
    "花生",
    "牛奶",
    "蛋",
    "堅果類（杏仁、腰果、核桃等）",
    "芝麻",
    "大豆",
    "小麥（含麩質）",
    "魚類",
    "芒果",
    "亞硫酸鹽（蜜餞、果乾等）",
];

const refundRows = [
    [
        "食物有腐敗、發霉、異味等明顯變質",
        "全額退款",
        "另提供折價券補償",
        "店家記 2 點",
    ],
    [
        "食物份量明顯不足",
        "依比例退款或全額退款（由本平台審核認定）",
        "提供折價券補償",
        "店家記 1 點",
    ],
    [
        "店家無法提供 Luckie Bag（臨時取消）",
        "全額退款",
        "提供折價券補償",
        "不記點",
    ],
    ["食物不符合個人口味", "不退款", "無", "不記點"],
    ["消費者取餐逾時未取", "不退款", "無", "不記點"],
];

const platformResponsibilityItems = [
    "因個人口味偏好所生之不滿意。",
    "因消費者未詳閱過敏原標示而引發之過敏或健康問題。",
    "因消費者取餐後保存不當所致之變質或健康問題。",
    "因不可抗力事件（天災、政府命令、大規模網路中斷等）導致之服務中斷。",
    "因消費者取餐逾時所生之損失。",
    "消費者使用第三方連結或服務所生之損害。",
];

const userConductItems = [
    "提供不實資料進行註冊或申訴。",
    "惡意申訴、重複申訴同一筆訂單或進行不實投訴。",
    "以任何方式干擾平台正常運作。",
    "將帳號用於商業目的或轉讓予他人使用。",
    "違反中華民國相關法律法規之行為。",
];

const reviewItems = [
    "人身攻擊、歧視性言論或謾罵。",
    "不實陳述或惡意毀謗。",
    "廣告推銷或與本次消費體驗無關之內容。",
    "任何違反中華民國法律之言論。",
];

export const metadata: Metadata = {
    title: "服務條款 | FOODLUCK",
    description: "FOODLUCK 消費者服務條款。",
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
                    Terms of Service
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

function TermsTable({
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

export default function TermsPage() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-[linear-gradient(180deg,_#f7fbf8_0%,_#ffffff_18%,_#ffffff_100%)]">
                <section className="border-b border-primary/10 bg-[radial-gradient(circle_at_top_left,_rgba(52,171,124,0.16),_transparent_35%),linear-gradient(135deg,_rgba(12,28,22,0.96),_rgba(18,72,54,0.9))] text-white">
                    <div className="mx-auto max-w-6xl px-6 pb-16 pt-28 md:pb-20 md:pt-32">
                        <div className="max-w-3xl space-y-6">
                            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
                                Terms of Service
                            </span>
                            <h1 className="text-4xl font-black leading-tight md:text-6xl">
                                FOODLUCK 消費者服務條款
                            </h1>
                            <div className="space-y-2 text-base leading-8 text-white/80 md:text-lg">
                                <p>版本：1.1</p>
                                <p>最後更新日期：115 年 4 月 28 日</p>
                            </div>
                            <p className="max-w-2xl text-base leading-8 text-white/85 md:text-lg">
                                請於使用本服務前詳細閱讀以下條款。當您完成首次訂單並點擊「同意服務條款」時，即表示您已閱讀、理解並同意接受本條款之所有內容。
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
                                        ["about", "第一條 關於本條款"],
                                        ["eligibility", "第二條 使用資格"],
                                        ["account", "第三條 帳號註冊與管理"],
                                        [
                                            "luckie-bag",
                                            "第四條 Luckie Bag 服務說明",
                                        ],
                                        [
                                            "food-safety",
                                            "第五條 食品安全與過敏提醒",
                                        ],
                                        ["payment", "第六條 付款方式"],
                                        [
                                            "complaint",
                                            "第七條 申訴、退款與補償",
                                        ],
                                        [
                                            "responsibility",
                                            "第八條 平台責任範圍",
                                        ],
                                        ["conduct", "第九條 使用者行為規範"],
                                        ["reviews", "第十條 使用者評價規範"],
                                        ["privacy", "第十一條 個人資料保護"],
                                        ["ip", "第十二條 智慧財產權"],
                                        ["amendment", "第十三條 條款修改"],
                                        ["termination", "第十四條 終止服務"],
                                        ["law", "第十五條 準據法與管轄"],
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
                            <Section id="about" title="第一條 關於本條款">
                                <p className="text-base leading-8 text-gray-700">
                                    本服務條款（以下稱「本條款」）係由 FOODLUCK
                                    福來科技有限公司（以下稱「本平台」或「我們」）制定，適用於所有使用
                                    FOODLUCK APP
                                    及相關服務之消費者（以下稱「您」或「使用者」）。
                                </p>
                                <p className="text-base leading-8 text-gray-700">
                                    本平台為媒合平台，負責連結餐飲店家（以下稱「店家」）與消費者，協助消費者以優惠價格購買店家當日未售完之剩餘食品（以下稱「Luckie
                                    Bag」）。
                                </p>
                            </Section>

                            <Section id="eligibility" title="第二條 使用資格">
                                <p className="text-base leading-8 text-gray-700">
                                    使用本平台服務，您須符合下列條件：
                                </p>
                                <BulletList items={eligibilityItems} />
                                <p className="text-base leading-8 text-gray-700">
                                    若您為未成年人，使用本平台即視為已獲得您的法定代理人（家長或監護人）之同意。本平台建議法定代理人與未成年人共同閱讀本條款，並監督未成年人之使用行為。
                                </p>
                            </Section>

                            <Section id="account" title="第三條 帳號註冊與管理">
                                <BulletList
                                    items={[
                                        "您須以有效 Email 信箱完成註冊並通過認證，方可使用本平台完整功能。",
                                        "您應妥善保管帳號密碼，不得將帳號提供予他人使用。帳號下之所有行為均視為您本人之行為，相關責任由您承擔。",
                                        "如發現帳號遭盜用或異常使用，請立即通知本平台客服。",
                                        "本平台保有審核、暫停或終止帳號之權利，如發現使用者有違反本條款之行為，得不經事先通知逕行處理。",
                                    ]}
                                />
                            </Section>

                            <Section
                                id="luckie-bag"
                                title="第四條 Luckie Bag 服務說明"
                            >
                                <div className="space-y-6">
                                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                                        <h3 className="text-xl font-bold text-gray-900">
                                            4.1 服務性質
                                        </h3>
                                        <p className="mt-3 text-base leading-8 text-gray-700">
                                            Luckie Bag
                                            為驚喜盲盒性質之商品，消費者於訂購時無法預知確切內容物，此為本服務之核心特色，消費者於訂購前應充分了解並接受此特性。
                                        </p>
                                    </div>

                                    <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
                                        <h3 className="text-xl font-bold text-gray-900">
                                            4.2 通訊交易解除權之例外聲明
                                        </h3>
                                        <p className="mt-3 text-base leading-8 text-gray-700">
                                            本平台所提供之 Luckie Bag
                                            內含生鮮、餐飲食品，屬《通訊交易解除權合理例外情事適用準則》第二條第一款「易於腐敗、保存期限較短或解約時即將逾期」之商品。因此，本服務排除《消費者保護法》第十九條第一項七日猶豫期（鑑賞期）之適用。消費者完成訂單並付款後，除本條款明定之退款情形外，不得以任意個人因素要求取消訂單或退款。
                                        </p>
                                    </div>

                                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                                        <h3 className="text-xl font-bold text-gray-900">
                                            4.3 訂購流程
                                        </h3>
                                        <div className="mt-4">
                                            <BulletList
                                                items={purchaseFlowItems}
                                            />
                                        </div>
                                    </div>

                                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                                        <h3 className="text-xl font-bold text-gray-900">
                                            4.4 取餐規定
                                        </h3>
                                        <p className="mt-3 text-base leading-8 text-gray-700">
                                            消費者應於店家設定之指定取餐時段內完成取餐。逾時未取者，視為消費者自行放棄，恕不退款。
                                        </p>
                                        <p className="mt-3 text-base leading-8 text-gray-700">
                                            取餐時，消費者應配合店家之作業流程，並於取餐後當場確認食品狀況。
                                        </p>
                                        <p className="mt-3 text-base leading-8 text-gray-700">
                                            環保提示：為響應環保減塑，本平台鼓勵消費者前往取餐時自備環保提袋及環保餐具。部分店家可能不主動提供免費提袋，敬請留意。
                                        </p>
                                    </div>
                                </div>
                            </Section>

                            <Section
                                id="food-safety"
                                title="第五條 食品安全與過敏提醒"
                            >
                                <p className="text-base leading-8 text-gray-700">
                                    Luckie Bag
                                    為驚喜盲盒，消費者於取餐前無法得知確切內容物。有食物過敏或特殊飲食需求（含宗教飲食限制）者，請務必於訂購前詳閱店家標示之過敏原資訊，並評估自身風險後再行訂購。
                                </p>
                                <p className="text-base leading-8 text-gray-700">
                                    本平台要求店家於上架時標示 Luckie Bag
                                    可能含有之常見過敏原，供消費者參考：
                                </p>
                                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                    {allergenItems.map((item) => (
                                        <div
                                            key={item}
                                            className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm leading-7 text-gray-700 shadow-sm"
                                        >
                                            {item}
                                        </div>
                                    ))}
                                </div>
                                <p className="text-base leading-8 text-gray-700">
                                    如需進一步確認食品成分，消費者得於取餐前直接聯繫店家詢問。因個人過敏體質、飲食限制或未詳閱過敏原標示所造成之健康損害，本平台不負賠償責任，相關責任由店家及消費者依實際情況承擔。
                                </p>

                                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                                    <h3 className="text-xl font-bold text-gray-900">
                                        5.1 食品保存與食用建議
                                    </h3>
                                    <p className="mt-3 text-base leading-8 text-gray-700">
                                        Luckie Bag
                                        內含之食品均為當日製作之未售出餐點。為確保食品安全與最佳風味，消費者取餐後應立即食用，或依食品特性以適當方式妥善冷藏保存。若因消費者個人保存方式不當（如常溫放置過夜）導致之食品變質或健康問題，本平台與店家恕不負責。
                                    </p>
                                </div>
                            </Section>

                            <Section id="payment" title="第六條 付款方式">
                                <BulletList
                                    items={[
                                        "本平台目前支援信用卡付款。消費者付款後，本平台將以信用卡授權方式完成交易。",
                                        "金流手續費由本平台全額負擔，消費者無需額外支付。",
                                        "所有交易均以新台幣（NTD）計價。",
                                    ]}
                                />
                            </Section>

                            <Section
                                id="complaint"
                                title="第七條 申訴、退款與補償"
                            >
                                <div className="space-y-6">
                                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                                        <h3 className="text-xl font-bold text-gray-900">
                                            7.1 申訴方式
                                        </h3>
                                        <p className="mt-3 text-base leading-8 text-gray-700">
                                            如對訂單有任何疑義，消費者得於取餐後二十四（24）小時內，透過
                                            APP
                                            訂單頁面之申訴功能提出申請。申訴時請選擇問題類型並填寫簡要說明，如有照片佐證請一併上傳，有助於加速處理。
                                        </p>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-xl font-bold text-gray-900">
                                            7.2 退款與補償標準
                                        </h3>
                                        <TermsTable
                                            headers={[
                                                "情況",
                                                "退款",
                                                "補償",
                                                "店家積點",
                                            ]}
                                            rows={refundRows}
                                        />
                                        <p className="text-base leading-8 text-gray-700">
                                            退款將退回消費者原付款之信用卡，或由本平台視情況提供等值之
                                            FOODLUCK
                                            折價券供消費者選擇。以信用卡退刷者，退款處理時間依各發卡銀行作業時間而定，通常為三至七個工作日；以折價券方式補償者，將於審核完成後立即發放至消費者帳號，有效期限另行標示於折價券上。
                                        </p>
                                    </div>

                                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                                        <h3 className="text-xl font-bold text-gray-900">
                                            7.3 店家臨時取消訂單
                                        </h3>
                                        <p className="mt-3 text-base leading-8 text-gray-700">
                                            若店家因當日實際銷售情況無法提供已被預訂之
                                            Luckie
                                            Bag，本平台將主動取消該訂單並全額退款至消費者原付款信用卡，消費者無需另行申訴。退款處理時間依各發卡銀行作業時間而定。
                                        </p>
                                    </div>

                                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                                        <h3 className="text-xl font-bold text-gray-900">
                                            7.4 申訴審核
                                        </h3>
                                        <p className="mt-3 text-base leading-8 text-gray-700">
                                            本平台將於收到申訴後三（3）個工作日內完成審核並通知結果。本平台之審核決定基於消費者提供之資訊及平台紀錄，如有不實申訴，本平台得拒絕退款及補償，並得暫停或終止申訴人之帳號。
                                        </p>
                                    </div>
                                </div>
                            </Section>

                            <Section
                                id="responsibility"
                                title="第八條 平台責任範圍"
                            >
                                <p className="text-base leading-8 text-gray-700">
                                    本平台為媒合服務提供者，負責連結店家與消費者，但不直接參與食品之製作、保存及配送過程。
                                </p>
                                <p className="text-base leading-8 text-gray-700">
                                    食品之品質、安全及合法性由各店家負責。本平台對下列情事不負賠償責任：
                                </p>
                                <BulletList
                                    items={platformResponsibilityItems}
                                />
                            </Section>

                            <Section id="conduct" title="第九條 使用者行為規範">
                                <p className="text-base leading-8 text-gray-700">
                                    消費者使用本平台時，不得有下列行為：
                                </p>
                                <BulletList items={userConductItems} />
                                <p className="text-base leading-8 text-gray-700">
                                    本平台得對違反上述規定之使用者，採取警告、暫停或永久終止帳號等措施，並保留追究法律責任之權利。
                                </p>
                            </Section>

                            <Section id="reviews" title="第十條 使用者評價規範">
                                <p className="text-base leading-8 text-gray-700">
                                    本平台歡迎消費者基於真實體驗於 APP
                                    內留下評價，協助其他消費者及店家改善服務品質。
                                </p>
                                <p className="text-base leading-8 text-gray-700">
                                    評價內容不得包含下列情事：
                                </p>
                                <BulletList items={reviewItems} />
                                <p className="text-base leading-8 text-gray-700">
                                    若評價內容涉有上述情事，本平台保有逕行隱藏或刪除該評價之權利，並得視情節輕重暫停或終止該使用者之帳號。
                                </p>
                            </Section>

                            <Section id="privacy" title="第十一條 個人資料保護">
                                <p className="text-base leading-8 text-gray-700">
                                    本平台蒐集、處理及利用您的個人資料，依據本平台之隱私權政策及中華民國個人資料保護法辦理。
                                </p>
                                <p className="text-base leading-8 text-gray-700">
                                    您得依個資法相關規定，向本平台行使查詢、閱覽、複製、補充、更正、停止蒐集處理利用及刪除個人資料等權利，請聯繫本平台客服辦理。
                                </p>
                            </Section>

                            <Section id="ip" title="第十二條 智慧財產權">
                                <p className="text-base leading-8 text-gray-700">
                                    本平台之商標、LOGO、APP
                                    介面、文字內容及相關設計，均屬本平台或相關權利人所有，未經授權不得重製、修改、散布或為其他商業利用。
                                </p>
                            </Section>

                            <Section id="amendment" title="第十三條 條款修改">
                                <p className="text-base leading-8 text-gray-700">
                                    本平台保有隨時修改本條款之權利。修改後之條款將於
                                    APP 內公告，並以推播通知或 Email
                                    通知使用者。
                                </p>
                                <p className="text-base leading-8 text-gray-700">
                                    修改後繼續使用本平台服務，即視為同意接受修改後之條款。如不同意，請停止使用本平台並刪除帳號。
                                </p>
                            </Section>

                            <Section id="termination" title="第十四條 終止服務">
                                <p className="text-base leading-8 text-gray-700">
                                    您得隨時透過 APP
                                    申請刪除帳號，終止使用本平台服務。帳號刪除後，您的個人資料將依本平台隱私權政策及法律規定之保存期限處理。
                                </p>
                                <p className="text-base leading-8 text-gray-700">
                                    未完成之訂單或待處理之退款，將於帳號刪除前依正常程序完成處理。
                                </p>
                            </Section>

                            <Section id="law" title="第十五條 準據法與管轄">
                                <p className="text-base leading-8 text-gray-700">
                                    本條款之成立、效力、解釋及履行，均依中華民國法律為準據法。
                                </p>
                                <p className="text-base leading-8 text-gray-700">
                                    因本條款或本平台服務所生之爭議，雙方同意以台灣台北地方法院為第一審管轄法院。
                                </p>
                            </Section>

                            <Section id="contact" title="第十六條 聯絡我們">
                                <p className="text-base leading-8 text-gray-700">
                                    如對本條款有任何疑問，或需要協助，歡迎透過下列方式聯繫本平台：
                                </p>
                                <div className="grid gap-4 md:grid-cols-3">
                                    {[
                                        [
                                            "公司名稱",
                                            "FOODLUCK 福來科技有限公司",
                                        ],
                                        [
                                            "客服 Email",
                                            "service@foodluck.com.tw",
                                        ],
                                        [
                                            "客服時間",
                                            "週一至週五 10:00–18:00（國定假日除外）",
                                        ],
                                        [
                                            "公司地址",
                                            "臺北市中正區館前路 43 號 7 樓",
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
                                        感謝您使用
                                        FOODLUCK，我們致力於提供安全、便利且友善環境的剩食媒合服務。每一份
                                        Luckie Bag，都是對食物浪費說不的一小步。
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
