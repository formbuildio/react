import { useState } from "react";

export interface UseFormbuildOptions {
  /** Optional custom endpoint base URL. Defaults to https://formbuild.io */
  endpoint?: string;
}

export function useFormbuild(formId: string, options?: UseFormbuildOptions) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const endpoint = options?.endpoint || "https://formbuild.io";

  const submit = async (data: Record<string, any> | FormData) => {
    setIsLoading(true);
    setIsSuccess(false);
    setError(null);

    try {
      let body: string | FormData;
      const headers: HeadersInit = {
        Accept: "application/json",
      };

      if (data instanceof FormData) {
        body = data;
        // The browser automatically sets Content-Type to multipart/form-data with the correct boundary
      } else {
        body = JSON.stringify(data);
        headers["Content-Type"] = "application/json";
      }

      const response = await fetch(`${endpoint}/in/${formId}`, {
        method: "POST",
        headers,
        body,
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(result?.error || "Failed to submit form");
      }

      setIsSuccess(true);
      return { success: true, data: result };
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  return { submit, isLoading, isSuccess, error };
}
