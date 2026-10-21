import FilterPanel from "./FilterPanel";
import { useParams, useSearchParams } from "react-router";
import { useFetch } from "../hooks/useFetch";
import type { Data } from "../lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useRef, useState } from "react";

import Products from "./Products";

const CategoryPage = () => {
  const { name } = useParams();

  const [searchParams] = useSearchParams();

  const searchTerm = searchParams.get("search") || "";

  const observerRef = useRef(null);

  // const [targetEl, setTargetEl] = useState(null);

  let productsUrl;

  if (name) {
    productsUrl = `https://dummyjson.com/products/category/${name}`;
  } else {
    productsUrl = `https://dummyjson.com/products/search?q=${searchTerm}`;
  }

  const {
    data,
    loading,
    error,
  }: { data: Data | null; loading: boolean; error: Error | null | unknown } =
    useFetch(productsUrl);

  useEffect(() => {
    // console.log("heheheh");
    const targetEl = observerRef.current;

    if (!targetEl) return;
    console.log(targetEl);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          console.log("element visisble");
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
  }, [loading]);

  // const productsUrl = ``;

  // console.log(data);
  const products = data?.products ?? [];

  // localStorage.setItem("viewedProducts", JSON.stringify(products));

  // const handleFiltering = () => {};

  return (
    <div className=" w-screen   p-4 h-screen bg-page_bg min-h-screen">
      {loading ? (
        <div className="flex w-full gap-3.5">
          <div className="w-[22%] ">
            <FilterPanel products={products} />
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
        <div className="text-red-500"> {JSON.stringify(error)} </div>
      ) : !products?.length ? (
        <div> No products found</div>
      ) : (
        <>
          <div className="flex w-full gap-3.5">
            <div className="w-[22%] ">
              <FilterPanel products={products} />
            </div>
            <div className="w-full  h-[calc(100vh-76px)] overflow-y-scroll">
              {" "}
              <Products products={products} />
              <div className="w-full h-3 bg-pink-500" ref={observerRef}>
                hehe{" "}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryPage;
