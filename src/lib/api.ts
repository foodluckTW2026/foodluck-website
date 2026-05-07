export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.foodluck.com.tw/api/v1";

export type Category = {
  id: number;
  name: string;
  icon: string | null;
  sort_order: number;
};

export type ApiSuccess<T> = { message: string; data: T };
export type ApiError = {
  message: string;
  errors?: Record<string, string[]>;
};

export async function fetchCategories(): Promise<Category[]> {
  const res = await fetch(`${API_BASE_URL}/categories`, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) {
    throw new Error(`Failed to load categories (${res.status})`);
  }
  const json = (await res.json()) as ApiSuccess<Category[]>;
  return json.data;
}

export type StoreApplicationPayload = {
  name: string;
  owner_name: string;
  email: string;
  phone: string;
  address: string;
  tax_id: string;
  food_business_license_number?: string;
  description?: string;
  reason?: string;
  category_ids: number[];
};

export type StoreApplicationResult = {
  ok: true;
  message: string;
  data: { id: number; status: string };
} | {
  ok: false;
  message: string;
  errors?: Record<string, string[]>;
};

export async function submitStoreApplication(
  payload: StoreApplicationPayload,
): Promise<StoreApplicationResult> {
  const res = await fetch(`${API_BASE_URL}/store/applications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  const json = await res.json().catch(() => null);

  if (res.ok && json && "data" in json) {
    return {
      ok: true,
      message: json.message ?? "申請已送出",
      data: json.data,
    };
  }

  return {
    ok: false,
    message: json?.message ?? `申請失敗 (HTTP ${res.status})`,
    errors: json?.errors,
  };
}
