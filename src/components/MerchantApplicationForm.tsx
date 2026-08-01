"use client";

import { useEffect, useState } from "react";
import {
    fetchCategories,
    submitStoreApplication,
    type Category,
    type StoreApplicationPayload,
} from "@/lib/api";

type FormState = {
    name: string;
    owner_name: string;
    email: string;
    phone: string;
    address: string;
    tax_id: string;
    company_name: string;
    food_business_license_number: string;
    description: string;
    reason: string;
    category_ids: number[];
};

const initialState: FormState = {
    name: "",
    owner_name: "",
    email: "",
    phone: "",
    address: "",
    tax_id: "",
    company_name: "",
    food_business_license_number: "",
    description: "",
    reason: "",
    category_ids: [],
};

export default function MerchantApplicationForm() {
    const [form, setForm] = useState<FormState>(initialState);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [categoryError, setCategoryError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string[]>>({});
    const [topError, setTopError] = useState<string | null>(null);
    const [success, setSuccess] = useState<{ id: number } | null>(null);

    useEffect(() => {
        let cancelled = false;

        fetchCategories()
            .then((data) => {
                if (!cancelled) {
                    setCategories(data);
                    setCategoryError(null);
                }
            })
            .catch(() => {
                if (!cancelled) {
                    setCategoryError("無法載入餐點類型，請稍後再試或重新整理頁面。");
                }
            })
            .finally(() => {
                if (!cancelled) {
                    setLoadingCategories(false);
                }
            });

        return () => {
            cancelled = true;
        };
    }, []);

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = event.target;
        setForm((previous) => ({ ...previous, [name]: value }));
    };

    const toggleCategory = (id: number) => {
        setForm((previous) => {
            const selected = previous.category_ids.includes(id);

            if (selected) {
                return {
                    ...previous,
                    category_ids: previous.category_ids.filter(
                        (categoryId) => categoryId !== id,
                    ),
                };
            }

            if (previous.category_ids.length >= 3) {
                return previous;
            }

            return {
                ...previous,
                category_ids: [...previous.category_ids, id],
            };
        });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (submitting) return;

        setSubmitting(true);
        setErrors({});
        setTopError(null);

        const payload: StoreApplicationPayload = {
            name: form.name.trim(),
            owner_name: form.owner_name.trim(),
            email: form.email.trim(),
            phone: form.phone.trim(),
            address: form.address.trim(),
            food_business_license_number:
                form.food_business_license_number.trim(),
            category_ids: form.category_ids,
            ...(form.tax_id.trim() ? { tax_id: form.tax_id.trim() } : {}),
            ...(form.company_name.trim()
                ? { company_name: form.company_name.trim() }
                : {}),
            ...(form.description.trim()
                ? { description: form.description.trim() }
                : {}),
            ...(form.reason.trim() ? { reason: form.reason.trim() } : {}),
        };

        const result = await submitStoreApplication(payload);
        setSubmitting(false);

        if (result.ok) {
            setSuccess({ id: result.data.id });
            setForm(initialState);
            return;
        }

        setErrors(result.errors ?? {});
        setTopError(result.message);
    };

    const fieldError = (key: string): string | null => {
        const messages = errors[key];
        return messages && messages.length > 0 ? messages[0] : null;
    };

    if (success) {
        return (
            <div
                className="rounded-3xl border border-primary/20 bg-primary/5 p-8 text-center md:p-12"
                role="status"
            >
                <p className="text-sm font-bold text-primary">
                    資料已成功送達
                </p>
                <h2 className="mt-3 text-2xl font-black text-gray-900 md:text-3xl">
                    申請已送出
                </h2>
                <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-gray-600">
                    我們會在 3 個工作天內完成初步審核，並將結果寄到你填寫的 Email。若未收到信件，請查看垃圾郵件或促銷內容分類。
                </p>
                <p className="mt-4 text-xs text-gray-500">
                    申請編號 #{success.id}
                </p>
                <button
                    type="button"
                    onClick={() => setSuccess(null)}
                    className="mt-8 inline-flex min-h-12 items-center justify-center whitespace-nowrap rounded-full border-2 border-primary px-7 py-3 text-sm font-bold text-primary transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary hover:text-white active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
                >
                    填寫另一家店
                </button>
            </div>
        );
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-10"
            noValidate
        >
            {topError && (
                <div
                    className="mb-8 rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700"
                    role="alert"
                >
                    {topError}
                </div>
            )}

            <fieldset>
                <legend className="mb-6 text-xl font-black text-gray-900">
                    店家基本資料
                </legend>

                <div className="space-y-6">
                    <Field
                        label="店家名稱"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        error={fieldError("name")}
                        required
                        autoComplete="organization"
                        placeholder="例：幸福麵包坊"
                    />

                    <div className="grid gap-6 md:grid-cols-2">
                        <Field
                            label="負責人姓名"
                            name="owner_name"
                            value={form.owner_name}
                            onChange={handleChange}
                            error={fieldError("owner_name")}
                            required
                            autoComplete="name"
                            placeholder="例：王小明"
                        />
                        <Field
                            label="食品業者登錄字號"
                            name="food_business_license_number"
                            value={form.food_business_license_number}
                            onChange={handleChange}
                            error={fieldError("food_business_license_number")}
                            required
                            placeholder="例：A-123-456789-00000-0"
                        />
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <Field
                            label="聯絡 Email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            error={fieldError("email")}
                            required
                            autoComplete="email"
                            placeholder="merchant@example.com"
                        />
                        <Field
                            label="聯絡電話"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            error={fieldError("phone")}
                            required
                            autoComplete="tel"
                            placeholder="例：0912345678"
                            inputMode="tel"
                        />
                    </div>

                    <Field
                        label="店家地址"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        error={fieldError("address")}
                        required
                        autoComplete="street-address"
                        placeholder="例：台北市中正區忠孝東路一段 1 號"
                    />

                    <div className="grid gap-6 md:grid-cols-2">
                        <Field
                            label="統一編號"
                            optional
                            name="tax_id"
                            value={form.tax_id}
                            onChange={handleChange}
                            error={fieldError("tax_id")}
                            placeholder="8 碼數字"
                            inputMode="numeric"
                            maxLength={8}
                        />
                        <Field
                            label="公司登記名稱"
                            optional
                            name="company_name"
                            value={form.company_name}
                            onChange={handleChange}
                            error={fieldError("company_name")}
                            autoComplete="organization"
                            placeholder="例：幸福食品有限公司"
                        />
                    </div>
                </div>
            </fieldset>

            <fieldset className="mt-10 border-t border-gray-200 pt-9">
                <legend className="px-0 text-xl font-black text-gray-900">
                    餐點與品牌
                </legend>

                <div className="mt-6">
                    <div className="mb-3 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                        <p className="text-sm font-bold text-gray-800">
                            餐點類型 <span className="text-red-500">*</span>
                        </p>
                        <p className="text-xs text-gray-500">
                            最多選擇 3 項
                        </p>
                    </div>

                    {loadingCategories ? (
                        <div className="flex flex-wrap gap-2" aria-label="正在載入餐點類型">
                            {[72, 92, 80, 104, 76].map((width) => (
                                <span
                                    key={width}
                                    className="h-10 rounded-full bg-gray-100 motion-safe:animate-pulse"
                                    style={{ width }}
                                />
                            ))}
                        </div>
                    ) : categoryError ? (
                        <p className="text-sm text-red-600" role="alert">
                            {categoryError}
                        </p>
                    ) : categories.length === 0 ? (
                        <p className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-500">
                            目前沒有可選擇的餐點類型，請稍後再試。
                        </p>
                    ) : (
                        <div className="flex flex-wrap gap-2">
                            {categories.map((category) => {
                                const selected = form.category_ids.includes(category.id);
                                const disabled =
                                    !selected && form.category_ids.length >= 3;

                                return (
                                    <button
                                        key={category.id}
                                        type="button"
                                        onClick={() => toggleCategory(category.id)}
                                        disabled={disabled}
                                        aria-pressed={selected}
                                        className={`rounded-full border px-4 py-2.5 text-sm font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 ${
                                            selected
                                                ? "border-primary bg-primary text-white shadow-sm shadow-primary/20"
                                                : disabled
                                                  ? "cursor-not-allowed border-gray-200 bg-gray-50 text-gray-400"
                                                  : "border-gray-300 bg-white text-gray-700 hover:border-primary hover:text-primary"
                                        }`}
                                    >
                                        {category.name}
                                    </button>
                                );
                            })}
                        </div>
                    )}

                    {fieldError("category_ids") && (
                        <p className="mt-2 text-sm text-red-600" role="alert">
                            {fieldError("category_ids")}
                        </p>
                    )}
                </div>

                <div className="mt-6 space-y-6">
                    <Textarea
                        label="店家簡介"
                        optional
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        error={fieldError("description")}
                        placeholder="簡單介紹店家的特色與招牌商品"
                        rows={3}
                    />

                    <Textarea
                        label="想加入 FOODLUCK 的原因"
                        optional
                        name="reason"
                        value={form.reason}
                        onChange={handleChange}
                        error={fieldError("reason")}
                        placeholder="告訴我們你的需求，協助我們更快了解你的品牌"
                        rows={3}
                    />
                </div>
            </fieldset>

            <p className="mt-8 text-xs leading-6 text-gray-500">
                送出申請即表示你同意 FOODLUCK 為審核目的處理所提供的資料。詳細內容請參閱
                <a
                    href="/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-1 font-bold text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary"
                >
                    隱私權政策
                </a>
                。
            </p>

            <button
                type="submit"
                disabled={submitting}
                className="mt-6 inline-flex min-h-14 w-full items-center justify-center whitespace-nowrap rounded-full bg-primary px-8 py-4 text-base font-bold text-white shadow-lg shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
            >
                {submitting ? "正在送出..." : "立即申請"}
            </button>
        </form>
    );
}

type FieldProps = {
    label: string;
    name: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    error: string | null;
    required?: boolean;
    optional?: boolean;
    type?: string;
    placeholder?: string;
    inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
    maxLength?: number;
    autoComplete?: string;
};

function Field({
    label,
    name,
    value,
    onChange,
    error,
    required,
    optional,
    type = "text",
    placeholder,
    inputMode,
    maxLength,
    autoComplete,
}: FieldProps) {
    const errorId = `${name}-error`;

    return (
        <div>
            <label htmlFor={name} className="mb-2 block text-sm font-bold text-gray-800">
                {label}
                {required && <span className="ml-1 text-red-500">*</span>}
                {optional && <span className="ml-2 text-xs font-normal text-gray-500">選填</span>}
            </label>
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                inputMode={inputMode}
                maxLength={maxLength}
                autoComplete={autoComplete}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? errorId : undefined}
                className={`w-full rounded-xl border bg-white px-4 py-3.5 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:ring-2 focus:ring-primary/30 ${
                    error
                        ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                        : "border-gray-200 focus:border-primary"
                }`}
            />
            {error && (
                <p id={errorId} className="mt-2 text-sm text-red-600" role="alert">
                    {error}
                </p>
            )}
        </div>
    );
}

type TextareaProps = {
    label: string;
    name: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    error: string | null;
    optional?: boolean;
    placeholder?: string;
    rows?: number;
};

function Textarea({
    label,
    name,
    value,
    onChange,
    error,
    optional,
    placeholder,
    rows = 3,
}: TextareaProps) {
    const errorId = `${name}-error`;

    return (
        <div>
            <label htmlFor={name} className="mb-2 block text-sm font-bold text-gray-800">
                {label}
                {optional && <span className="ml-2 text-xs font-normal text-gray-500">選填</span>}
            </label>
            <textarea
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                rows={rows}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? errorId : undefined}
                className={`w-full resize-y rounded-xl border bg-white px-4 py-3.5 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:ring-2 focus:ring-primary/30 ${
                    error
                        ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                        : "border-gray-200 focus:border-primary"
                }`}
            />
            {error && (
                <p id={errorId} className="mt-2 text-sm text-red-600" role="alert">
                    {error}
                </p>
            )}
        </div>
    );
}
