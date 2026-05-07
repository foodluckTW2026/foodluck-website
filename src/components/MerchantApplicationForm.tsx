"use client";

import { useEffect, useRef, useState } from "react";
import {
  fetchCategories,
  submitStoreApplication,
  type Category,
  type StoreApplicationPayload,
} from "@/lib/api";

type BankMode = "text" | "image";

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

  bank_code: string;
  bank_name: string;
  bank_branch_code: string;
  bank_branch_name: string;
  bank_account_number: string;
  bank_account_name: string;
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
  bank_code: "",
  bank_name: "",
  bank_branch_code: "",
  bank_branch_name: "",
  bank_account_number: "",
  bank_account_name: "",
};

const ALLOWED_IMAGE_EXT = /\.(jpe?g|png|webp|heic|heif)$/i;
const MAX_IMAGE_BYTES = 10 * 1024 * 1024; // 10 MB

export default function MerchantApplicationForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [bankMode, setBankMode] = useState<BankMode>("text");
  const [bankImage, setBankImage] = useState<File | null>(null);
  const [bankImageError, setBankImageError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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

  const handleBankImage = (file: File | null) => {
    setBankImageError(null);
    if (!file) {
      setBankImage(null);
      return;
    }
    if (!ALLOWED_IMAGE_EXT.test(file.name)) {
      setBankImageError("僅支援 JPG / PNG / WebP / HEIC 圖片");
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      setBankImageError("圖片不可超過 10MB");
      return;
    }
    setBankImage(file);
  };

  const switchBankMode = (mode: BankMode) => {
    setBankMode(mode);
    setBankImageError(null);
    if (mode === "text") {
      setBankImage(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
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
      food_business_license_number: form.food_business_license_number.trim(),
      category_ids: form.category_ids,
      ...(form.tax_id.trim() ? { tax_id: form.tax_id.trim() } : {}),
      ...(form.company_name.trim() ? { company_name: form.company_name.trim() } : {}),
      ...(form.description.trim() ? { description: form.description.trim() } : {}),
      ...(form.reason.trim() ? { reason: form.reason.trim() } : {}),
    };

    if (bankMode === "image") {
      if (!bankImage) {
        setBankImageError("請選擇存摺封面照片");
        setSubmitting(false);
        return;
      }
      payload.bank_book_image = bankImage;
    } else {
      payload.bank_code = form.bank_code.trim();
      payload.bank_name = form.bank_name.trim();
      payload.bank_branch_code = form.bank_branch_code.trim();
      payload.bank_branch_name = form.bank_branch_name.trim();
      payload.bank_account_number = form.bank_account_number.trim();
      payload.bank_account_name = form.bank_account_name.trim();
    }

    const result = await submitStoreApplication(payload);
    setSubmitting(false);

    if (result.ok) {
      setSuccess({ id: result.data.id });
      setForm(initialState);
      setBankImage(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
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

      <div className="grid gap-6 md:grid-cols-2">
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
        <Field
          label="公司登記名稱（選填）"
          name="company_name"
          value={form.company_name}
          onChange={handleChange}
          error={fieldError("company_name")}
          placeholder="例：幸福食品有限公司"
        />
      </div>

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

      {/* Bank section with mode toggle */}
      <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
        <div className="mb-4 flex items-baseline justify-between gap-4">
          <h3 className="text-base font-bold text-gray-900">
            收款帳戶 <span className="text-red-500">*</span>
          </h3>
          <p className="text-xs text-gray-500">填寫資訊或上傳存摺封面，二擇一</p>
        </div>

        <div className="mb-5 inline-flex rounded-full border border-gray-300 bg-white p-1">
          <button
            type="button"
            onClick={() => switchBankMode("text")}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              bankMode === "text"
                ? "bg-primary text-white"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            填寫資訊
          </button>
          <button
            type="button"
            onClick={() => switchBankMode("image")}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              bankMode === "image"
                ? "bg-primary text-white"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            上傳存摺封面
          </button>
        </div>

        {bankMode === "text" ? (
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Field
                label="戶名"
                name="bank_account_name"
                value={form.bank_account_name}
                onChange={handleChange}
                error={fieldError("bank_account_name")}
                required
                placeholder="存摺戶名"
              />
              <Field
                label="帳號"
                name="bank_account_number"
                value={form.bank_account_number}
                onChange={handleChange}
                error={fieldError("bank_account_number")}
                required
                placeholder="僅數字／可包含 -"
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Field
                label="銀行代碼（選填）"
                name="bank_code"
                value={form.bank_code}
                onChange={handleChange}
                error={fieldError("bank_code")}
                placeholder="例：004"
              />
              <Field
                label="銀行名稱（選填）"
                name="bank_name"
                value={form.bank_name}
                onChange={handleChange}
                error={fieldError("bank_name")}
                placeholder="例：台灣銀行"
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Field
                label="分行代碼（選填）"
                name="bank_branch_code"
                value={form.bank_branch_code}
                onChange={handleChange}
                error={fieldError("bank_branch_code")}
              />
              <Field
                label="分行名稱（選填）"
                name="bank_branch_name"
                value={form.bank_branch_name}
                onChange={handleChange}
                error={fieldError("bank_branch_name")}
              />
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <label
              htmlFor="bank_book_image"
              className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-white px-6 py-10 text-center transition-colors hover:border-primary"
            >
              {bankImage ? (
                <>
                  <span className="text-sm font-semibold text-gray-900">
                    {bankImage.name}
                  </span>
                  <span className="mt-1 text-xs text-gray-500">
                    {(bankImage.size / 1024 / 1024).toFixed(2)} MB ・ 點擊更換
                  </span>
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mb-2 h-8 w-8 text-gray-400"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" x2="12" y1="3" y2="15" />
                  </svg>
                  <span className="text-sm font-semibold text-gray-700">
                    點擊選擇存摺封面照片
                  </span>
                  <span className="mt-1 text-xs text-gray-500">
                    JPG / PNG / WebP / HEIC，最大 10MB
                  </span>
                </>
              )}
              <input
                id="bank_book_image"
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/heic,image/heif,.heic,.heif"
                className="hidden"
                onChange={(e) => handleBankImage(e.target.files?.[0] ?? null)}
              />
            </label>
            {(bankImageError || fieldError("bank_book_image")) && (
              <p className="text-sm text-red-600">
                {bankImageError ?? fieldError("bank_book_image")}
              </p>
            )}
            <p className="text-xs leading-6 text-gray-500">
              系統會自動移除照片中的位置／拍攝資訊（EXIF）後，僅將圖片資料儲存於後台。
            </p>
          </div>
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
        。
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
