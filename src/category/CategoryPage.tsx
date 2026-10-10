import FilterPanel from "./FilterPanel";
import { useParams } from "react-router";
import { useFetch } from "../hooks/useFetch";
import type { Data } from "../lib/types";

import Products from "./Products";

const CategoryPage = () => {
  const { name } = useParams();

  const productsUrl = `https://dummyjson.com/products/category/${name}`;
  // const productsUrl = ``;

  const {
    data,
    loading,
    error,
  }: { data: Data | null; loading: boolean; error: Error | null | unknown } =
    useFetch(productsUrl);

  // console.log(data);
  const products = data?.products ?? [];

  localStorage.setItem("viewedProducts", JSON.stringify(products));

  // const handleFiltering = () => {};

  return (
    <div>
      {loading ? (
        <div className="text-zinc-500"> Loading...</div>
      ) : error ? (
        <div className="text-red-500"> {JSON.stringify(error)} </div>
      ) : !products?.length ? (
        <div> No products found</div>
      ) : (
        <div>
          <div className="w-full flex gap-3.5 p-4 h-screen bg-page_bg">
            <div className="w-[22%] ">
              <FilterPanel products={products} />
            </div>
            <div className="w-full ">
              {" "}
              <Products products={products} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
