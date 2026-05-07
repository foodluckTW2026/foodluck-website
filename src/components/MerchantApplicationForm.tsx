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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleCategory = (id: number) => {
    setForm((prev) => {
      const exists = prev.category_ids.includes(id);
      if (exists) {
        return {
          ...prev,
          category_ids: prev.category_ids.filter((cid) => cid !== id),
        };
      }
      if (prev.category_ids.length >= 3) {
        return prev;
      }
      return { ...prev, category_ids: [...prev.category_ids, id] };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      tax_id: form.tax_id.trim(),
      category_ids: form.category_ids,
      ...(form.food_business_license_number.trim()
        ? { food_business_license_number: form.food_business_license_number.trim() }
        : {}),
      ...(form.description.trim() ? { description: form.description.trim() } : {}),
      ...(form.reason.trim() ? { reason: form.reason.trim() } : {}),
    };

    const result = await submitStoreApplication(payload);
    setSubmitting(false);

    if (result.ok) {
      setSuccess({ id: result.data.id });
      setForm(initialState);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setErrors(result.errors ?? {});
    setTopError(result.message);
  };

  const fieldError = (key: string): string | null => {
    const list = errors[key];
    return list && list.length > 0 ? list[0] : null;
  };

  if (success) {
    return (
      <div className="rounded-3xl border border-primary/20 bg-primary/5 p-10 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 text-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-7 w-7"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-black text-gray-900 mb-3">申請已送出</h2>
        <p className="text-gray-600 leading-8">
          感謝您加入 FOODLUCK！我們的團隊會在 3 個工作天內審核您的申請，
          <br />
          審核結果會以 Email 寄送至您填寫的信箱。
        </p>
        <p className="mt-4 text-sm text-gray-500">
          申請編號：#{success.id}
        </p>
        <button
          type="button"
          onClick={() => setSuccess(null)}
          className="mt-8 inline-flex items-center justify-center rounded-full border-2 border-primary px-8 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
        >
          再送出一筆申請
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm md:p-10"
      noValidate
    >
      {topError && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {topError}
        </div>
      )}

      <Field
        label="店家名稱"
        name="name"
        value={form.name}
        onChange={handleChange}
        error={fieldError("name")}
        required
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
          placeholder="merchant@example.com"
        />
        <Field
          label="聯絡電話"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          error={fieldError("phone")}
          required
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
        placeholder="例：台北市中正區忠孝東路一段 1 號"
      />

      <Field
        label="統一編號（選填）"
        name="tax_id"
        value={form.tax_id}
        onChange={handleChange}
        error={fieldError("tax_id")}
        placeholder="8 碼數字，如有公司行號請填寫"
        inputMode="numeric"
        maxLength={8}
      />

      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-800">
          餐點類型 <span className="text-red-500">*</span>
          <span className="ml-2 text-xs font-normal text-gray-500">
            可複選，最多 3 項
          </span>
        </label>
        {loadingCategories ? (
          <p className="text-sm text-gray-500">載入中…</p>
        ) : categoryError ? (
          <p className="text-sm text-red-600">{categoryError}</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const selected = form.category_ids.includes(cat.id);
              const disabled = !selected && form.category_ids.length >= 3;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => toggleCategory(cat.id)}
                  disabled={disabled}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                    selected
                      ? "border-primary bg-primary text-white shadow-sm shadow-primary/20"
                      : disabled
                        ? "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                        : "border-gray-300 bg-white text-gray-700 hover:border-primary hover:text-primary"
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        )}
        {fieldError("category_ids") && (
          <p className="mt-2 text-sm text-red-600">
            {fieldError("category_ids")}
          </p>
        )}
      </div>

      <Textarea
        label="店家簡介（選填）"
        name="description"
        value={form.description}
        onChange={handleChange}
        error={fieldError("description")}
        placeholder="簡單介紹店家的特色、招牌商品..."
        rows={3}
      />

      <Textarea
        label="想加入 FOODLUCK 的原因（選填）"
        name="reason"
        value={form.reason}
        onChange={handleChange}
        error={fieldError("reason")}
        placeholder="告訴我們你的故事，協助我們更快了解你的品牌"
        rows={3}
      />

      <p className="text-xs leading-6 text-gray-500">
        送出申請即表示您同意 FOODLUCK 為審核目的處理您所提供之資料，
        詳細內容請參閱
        <a href="/privacy" className="ml-1 text-primary hover:underline">
          隱私權政策
        </a>
        。後續匯款帳戶等敏感資訊，將於審核通過、合作確認後由本公司專人協助補登。
      </p>

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-full bg-primary py-4 text-base font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-primary/60 disabled:hover:translate-y-0"
      >
        {submitting ? "送出中…" : "送出申請"}
      </button>
    </form>
  );
}

type FieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string | null;
  required?: boolean;
  type?: string;
  placeholder?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  maxLength?: number;
};

function Field({
  label,
  name,
  value,
  onChange,
  error,
  required,
  type = "text",
  placeholder,
  inputMode,
  maxLength,
}: FieldProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-semibold text-gray-800"
      >
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
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
        className={`w-full rounded-xl border bg-white px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/30 ${
          error
            ? "border-red-300 focus:border-red-400"
            : "border-gray-200 focus:border-primary"
        }`}
      />
      {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
    </div>
  );
}

type TextareaProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error: string | null;
  placeholder?: string;
  rows?: number;
};

function Textarea({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
  rows = 3,
}: TextareaProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-semibold text-gray-800"
      >
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className={`w-full resize-none rounded-xl border bg-white px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/30 ${
          error
            ? "border-red-300 focus:border-red-400"
            : "border-gray-200 focus:border-primary"
        }`}
      />
      {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
    </div>
  );
}
