import ProductCard from "../components/ProductCard";
import { useState, useMemo } from "react";
import { useParams, useSearchParams } from "react-router";
import type { Product } from "../lib/types";

const Products = ({ products }: { products: Product[] }) => {
  // const [processedData, setProcessedData] = useState(products);
  const [selectedSortType, setSelectedSortType] = useState("");

  const [searchParams] = useSearchParams();

  // console.log(products);
  const { name } = useParams();

  // const handleSort = (key: string, order: string, sortType: string) => {
  //   setSelectedSortType(sortType);

  //   if (key == "price") {
  //     if (order == "increasing") {
  //       processedData.sort((a, b) => a.price - b.price);
  //     } else processedData.sort((a, b) => b.price - a.price);
  //   } else {
  //     // console.log(
  //     //   new Date(processedData[0].meta.createdAt).getTime() ==
  //     //     new Date(processedData[0].meta.createdAt).getTime(),
  //     // );
  //     processedData.sort(
  //       (a, b) =>
  //         new Date(b.meta.createdAt).getTime() -
  //         new Date(a.meta.createdAt).getTime(),
  //     );
  //   }

  //   setProcessedData([...processedData]);
  // };

  const selectedFilters = useMemo(() => {
    const minLimit = searchParams.get("min") || 0;
    const maxLimit = searchParams.get("max") || Infinity;
    const brands = searchParams.getAll("brand") || [];
    const ratings = searchParams.getAll("rating") || [];
    const discounts = searchParams.getAll("discount") || [];

    return { minLimit, maxLimit, brands, ratings, discounts };
  }, [searchParams]);

  const filteredProducts: Product[] | [] = useMemo(() => {
    const { minLimit, maxLimit, brands, ratings, discounts } = selectedFilters;

    const filtered = products.filter((item) => {
      let brandMatches = !brands.length || brands.includes(item.brand);
      let minRating = 5;
      let minDiscount = 100;

      ratings.forEach((item) => {
        const itemInNum = Number(item);
        if (itemInNum <= minRating) {
          minRating = itemInNum;
        }
      });

      const rate = minRating == 5 ? 0 : minRating;

      discounts.forEach((item) => {
        const itemInNum = Number(item);
        if (itemInNum <= minDiscount) {
          minDiscount = itemInNum;
        }
      });

      const discount = minDiscount == 100 ? 0 : minDiscount;

      // console.log("rate", "discount", rate, discount);

      // console.log(minRating, minDiscount);

      const otherFilterMatches =
        item.price >= Number(minLimit) &&
        item.price <= Number(maxLimit) &&
        item.rating >= rate &&
        item.discountPercentage >= discount;
      return brandMatches && otherFilterMatches;
    });

    let [key, order] = selectedSortType.split("-");

    let sortedAndFiltered;

    if (key == "price") {
      if (order == "increasing") {
        sortedAndFiltered = filtered.sort((a, b) => a.price - b.price);
      } else sortedAndFiltered = filtered.sort((a, b) => b.price - a.price);
    } else {
      // console.log(
      //   new Date(processedData[0].meta.createdAt).getTime() ==
      //     new Date(processedData[0].meta.createdAt).getTime(),
      // );
      sortedAndFiltered = filtered.sort(
        (a, b) =>
          new Date(b.meta.createdAt).getTime() -
          new Date(a.meta.createdAt).getTime(),
      );
    }

    return sortedAndFiltered;

    // const filtered = products;
  }, [selectedFilters, products, selectedSortType]);

  return (
    <div className="bg-white w-full p-3 rounded-xs h-[calc(100vh-76px)] overflow-y-scroll">
      <div className="flex mt-5 px-3 mb-7">
        <h1 className="text-3xl  capitalize"> {name}</h1>{" "}
        <span className="text-zinc-500 pt-2 ml-3">
          Showing {filteredProducts.length} products
        </span>
      </div>

      <div className="flex gap-x-8 mb-3 pl-3">
        <span className="font-semibold">Sort By: </span>
        <span
          className={`cursor-pointer  ${
            selectedSortType == "price-increasing"
              ? "pb-1 font-semibold text-nav border-b-2 border-nav"
              : ""
          }`}
          id="price-increasing"
          onClick={(e) => setSelectedSortType(e.currentTarget.id)}

          // onClick={(e) => handleSort("price", "increasing", e.currentTarget.id)}
        >
          Price -- Low to High
        </span>
        <span
          className={`cursor-pointer  ${
            selectedSortType == "price-decreasing"
              ? "font-semibold text-nav border-b-2"
              : ""
          }`}
          id="price-decreasing"
          // onClick={(e) => handleSort("price", "decreasing", e.currentTarget.id)}
          onClick={(e) => setSelectedSortType(e.currentTarget.id)}
        >
          Price -- High to Low
        </span>
        <span
          className={`cursor-pointer  ${
            selectedSortType == "created-date"
              ? "font-semibold text-nav border-b-2"
              : ""
          }`}
          id="created-date"
          onClick={
            (e) => setSelectedSortType(e.currentTarget.id)
            // handleSort("addedDate", "decreasing", e.currentTarget.id)
          }
        >
          Newest first
        </span>
      </div>

      <div className="grid grid-cols-4 gap-x-4 gap-y-8">
        {filteredProducts.map((item, i: number) => (
          <div key={i}>
            <ProductCard
              // productId={item.}
              title={item.title}
              price={item.price}
              discountPercent={Math.round(item.discountPercentage)}
              rating={item.rating}
              thumbnail={item.thumbnail}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
