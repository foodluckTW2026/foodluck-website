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
  tax_id?: string;
  company_name?: string;
  food_business_license_number: string;
  description?: string;
  reason?: string;
  category_ids: number[];
};

export type StoreApplicationResult =
  | {
      ok: true;
      message: string;
      data: { id: number; status: string };
    }
  | {
      ok: false;
      message: string;
      errors?: Record<string, string[]>;
    };

export async function submitStoreApplication(
  payload: StoreApplicationPayload,
): Promise<StoreApplicationResult> {
  // multipart：圖片要走 FormData，純 JSON 場景也統一用 FormData，後端皆可接
  const formData = new FormData();

  const set = (key: string, value: string | undefined) => {
    if (value !== undefined && value !== "") {
      formData.append(key, value);
    }
  };

  set("name", payload.name);
  set("owner_name", payload.owner_name);
  set("email", payload.email);
  set("phone", payload.phone);
  set("address", payload.address);
  set("food_business_license_number", payload.food_business_license_number);
  set("tax_id", payload.tax_id);
  set("company_name", payload.company_name);
  set("description", payload.description);
  set("reason", payload.reason);

  // 後端會把 string JSON 解開成陣列
  formData.append("category_ids", JSON.stringify(payload.category_ids));

  const res = await fetch(`${API_BASE_URL}/store/applications`, {
    method: "POST",
    headers: {
      // 注意：不要自己加 Content-Type，瀏覽器會自動補 multipart boundary
      Accept: "application/json",
    },
    body: formData,
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
