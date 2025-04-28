import axios, { AxiosError } from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export function query<TArgs extends unknown[], TReturn>(
  cb: (...args: TArgs) => Promise<TReturn>
) {
  return async (...args: TArgs): Promise<TReturn> => {
    try {
      return await cb(...args);
    } catch (e: unknown) {
      if (e instanceof AxiosError && e.response) {
        throw new Error(e.response.data?.message || "Unknown error occurred");
      }
      throw e;
    }
  };
}
