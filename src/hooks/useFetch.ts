import { useEffect, useState } from "react";
import type { Product, Data } from "../lib/types";

export function useFetch(url: string) {
  const [data, setData] = useState<null | Data>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null | unknown>("");

  useEffect(() => {
    fetchData();
  }, [url]);

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await fetch(url);
      const result = await response.json();

      // console.log(result.products);
      setData(result);
    } catch (err: unknown) {
      console.log(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error };
}
