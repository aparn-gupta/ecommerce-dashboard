import FilterPanel from "@/features/products/FilterPanel";
import { useParams, useSearchParams } from "react-router";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useRef, useState } from "react";
import type { Product } from "../lib/types";
import Products from "@/features/products/Products";

const ProductsPage = () => {
  const { name } = useParams();

  const [searchParams] = useSearchParams();

  const searchTerm = searchParams.get("search") || "";

  const [products, setProducts] = useState<Product[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null | unknown>("");
  // const [hasMore, setHasMore] = useState(true);

  const skipRef = useRef(0);
  const observerRef = useRef(null);
  const allProductRef = useRef<Product[] | []>([]);
  const hasMoreRef = useRef(true);

  // const [targetEl, setTargetEl] = useState<any>(null);

  let productsUrl = "";

  // console.log(productsUrl, name);

  const fetchData = async (url: string) => {
    console.log("fetch: " + url);

    setLoading(true);

    try {
      const response = await fetch(url);
      const result = await response.json();

      console.log("total: " + result?.total);
      console.log(allProductRef.current);
      // console.log("products Length: " + products.length);

      if (result?.total <= allProductRef.current.length) {
        console.log(" total same as allproducts");
        hasMoreRef.current = false;
        return;
      }

      allProductRef.current = [...allProductRef.current, ...result?.products];

      setProducts((prev) => [...prev, ...result?.products]);
    } catch (err: unknown) {
      console.log(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // console.log(products);

  useEffect(() => {
    setProducts([]);
    skipRef.current = 0;
    allProductRef.current = [];
    hasMoreRef.current = true;
  }, [searchTerm]);

  useEffect(() => {
    // console.log("heheheh");
    const targetEl = observerRef.current;

    if (!targetEl) return;
    // console.log(targetEl);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          console.log("element visssible");
          console.log("hasMoreRef: " + hasMoreRef.current);

          if (hasMoreRef.current) {
            console.log("proceeding");
            console.log(skipRef.current, searchTerm, hasMoreRef.current, name);
            if (name) {
              productsUrl = `https://dummyjson.com/products/category/${name}?limit=12&skip=${skipRef.current}`;
            } else {
              productsUrl = `https://dummyjson.com/products/search?q=${searchTerm}&limit=12&skip=${skipRef.current}`;
            }

            fetchData(productsUrl);
            skipRef.current += 12;
          }
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(targetEl);

    return () => {
      if (targetEl) {
        observer.disconnect();
      }
    };
  }, [searchTerm]);

  return (
    <div className=" w-screen   p-4 h-screen bg-page_bg min-h-screen">
      {loading ? (
        <div className="flex w-full gap-3.5">
          <div className="w-[22%] ">
            <FilterPanel products={[]} />
          </div>
          <div className="grid grid-cols-4 gap-x-4 gap-y-8">
            {Array(10)
              .fill(0)
              .map(() => (
                <div>
                  <div className=" w-full h-auto flex justify-center items-center rounded-2xl ">
                    <div>
                      {" "}
                      <Skeleton className="w-60 h-52" />
                      <Skeleton className="w-44 h-6 mt-3 "></Skeleton>
                      <Skeleton className="w-52 h-6 mt-3 "></Skeleton>
                      <Skeleton className="w-28 h-9 mt-10 "></Skeleton>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ) : error ? (
        <div className="text-red-500 w-full text-md text-center">
          {" "}
          {JSON.stringify(error)}{" "}
        </div>
      ) : !products?.length ? (
        <div className="w-full text-2xl text-muted text-center">
          {" "}
          No products found
        </div>
      ) : (
        <></>
      )}

      <>
        <div className="flex w-full gap-3.5">
          <div className="w-[22%] ">
            <FilterPanel products={products} />
          </div>
          <div className="w-full  h-[calc(100vh-76px)] overflow-y-scroll">
            {" "}
            <Products products={products} />
            <div className="w-full h-3" ref={observerRef}>
              {" "}
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default ProductsPage;
