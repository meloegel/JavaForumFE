import { useCallback } from "react";
import useMountedState from "./useMountedState";

type Options = {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: BodyInit;
  headers?: Headers;
};

type Headers = {
  [key: string]: string;
};

type Result<T> = [(url: string, options: Options) => Promise<void>, T | null];

export default function useFetch<T>(): Result<T> {
  const [result, setResult] = useMountedState<T | null>(null);

  const request = useCallback(
    async (url: string, options: Options) => {
      const response = await fetch(url, options);
      setResult(response.ok ? await response.json() : null);
    },
    [setResult]
  );
  return [request, result];
}
