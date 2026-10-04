// import { ChevronDown } from "lucide-react";
// import { useState } from "react";
// import { X } from "lucide-react";
// import type { Product } from "../lib/types";
// import { useSearchParams } from "react-router";

// interface FilterItems {
//   filterKey: string;
//   filterName: string;
//   filterValue: string | number;
// }

// const FilterPanel = ({ products }: { products: Product[] }) => {
//   const [selectedFilters, setSelectedFilters] = useState<FilterItems[] | []>(
//     [],
//   );
//   // const [isExpanded, setIsExpanded] = useState<number[] | []>([]);
//   const [expanded, setExpanded] = useState<{
//     [key: string]: string | number | unknown;
//   }>({});

//   const [_, setSearchParams] = useSearchParams();

//   let discountValue = 20;

//   let filterId = 1;

//   const discountFilterValues = Array(5)
//     .fill(5)
//     .map((_) => {
//       discountValue += 10;
//       return {
//         filterId: filterId++,
//         name: `${discountValue}% or more`,
//         value: discountValue,
//         key: "discount",
//       };
//     });

//   let ratingValue = 4;

//   const ratingFilterValues = Array(3)
//     .fill(0)
//     .map((_) => {
//       ratingValue -= 1;
//       return {
//         filterId: filterId++,
//         name: `${ratingValue} ⭐️ and above`,
//         value: ratingValue,
//         key: "rating",
//       };
//     });

//   let brandSet = new Set();

//   for (let each of products) {
//     brandSet.add(each.brand);
//   }

//   const brandValues = Array.from(brandSet).map((item) => ({
//     filterId: filterId++,
//     name: item,
//     value: item,
//     key: "brand",
//   }));

//   const handleFilterSelection = (
//     filterKey: string,
//     filterName: string,
//     filterValue: string | number,
//   ) => {
//     // console.log(e.currentTarget);
//     setSelectedFilters((prev) => [
//       ...prev,
//       { filterKey, filterName, filterValue },
//     ]);

//     setSearchParams((prev) => {
//       const next = new URLSearchParams(prev);

//       next.delete(filterName);

//       if (filterKey == "price") {
//         next.set(filterName, String(filterValue));
//       } else next.append(filterKey, String(filterValue));

//       return next;
//     });
//   };

//   // console.log(selectedFilters);

//   const generateFilterOptions = (dataArr: any[]) => {
//     const filterOptions = dataArr.map((item) => (
//       <div className="flex gap-2.5 text-lg py-2">
//         {" "}
//         <input
//           type="checkbox"
//           // value={item.value}
//           name={item.name}
//           id={item.filterId}
//           onChange={(e) => {
//             console.log(e.target.checked);
//             if (e.target.checked) {
//               handleFilterSelection(item.key, item.name, item.value);
//             } else {
//               handleFilterRemoval(item.key, item.name, item.value);
//             }
//           }}
//           className="w-5 h-5 mt-0.75 cursor-pointer"
//         />{" "}
//         <label> {item.name} </label>
//       </div>
//     ));

//     return filterOptions;
//   };

//   // console.log(brandValues);

//   const createPriceRanges = () => {
//     const numOptions = 5;

//     let minPrice = Infinity;

//     let maxPrice = 0;

//     for (let each of products) {
//       if (each.price < minPrice) {
//         minPrice = each.price;
//       }

//       if (each.price > maxPrice) {
//         maxPrice = each.price;
//       }
//     }

//     const stepSize = (maxPrice - minPrice) / numOptions;

//     let minValues = minPrice - stepSize;

//     const minOptions = Array(numOptions)
//       .fill(0)
//       .map((_) => {
//         minValues += stepSize;
//         return (
//           <option value={Math.floor(minValues)}>
//             {" "}
//             ${Math.floor(minValues)}
//           </option>
//         );
//       });

//     let maxValues = minPrice;

//     const maxOptions = Array(numOptions)
//       .fill(0)
//       .map((_) => {
//         maxValues += stepSize;
//         return (
//           <option value={Math.ceil(maxValues)}> ${Math.ceil(maxValues)}</option>
//         );
//       });

//     // console.log(minOptions);
//     // console.log(maxOptions);

//     return [minOptions, maxOptions];
//   };

//   const [minOptions, maxOptions] = createPriceRanges();

//   const priceFilter = (
//     <div className="flex gap-x-5 py-2">
//       <select
//         name="min-price"
//         className="w-24 h-8 border border-zinc-400 cursor-pointer"
//         onChange={(e) => {
//           handleFilterSelection("price", "min", e.target.value);
//         }}
//       >
//         <option selected>Min</option>
//         {minOptions}
//       </select>
//       to
//       <select
//         name="max-price"
//         className="w-24 h-8 border border-zinc-400 cursor-pointer"
//         onChange={(e) => {
//           handleFilterSelection("price", "max", e.target.value);
//         }}
//       >
//         <option selected> Max</option>
//         {maxOptions}
//       </select>
//     </div>
//   );

//   const handleExpand = (id: number) => {
//     const updatedState = expanded[id] ? false : true;

//     setExpanded((prev: any) => ({ ...prev, [id]: updatedState }));
//   };

//   const filterTypes = [
//     {
//       id: 1,
//       name: "Price",
//       content: priceFilter,
//     },
//     {
//       id: 2,
//       name: "Rating",
//       content: generateFilterOptions(ratingFilterValues),
//     },
//     {
//       id: 3,
//       name: "Discount",
//       content: generateFilterOptions(discountFilterValues),
//     },
//     {
//       id: 4,
//       name: "Brand",
//       content: generateFilterOptions(brandValues),
//     },
//   ];

//   const handleFilterRemoval = (
//     filterKey: string,
//     filterName: string,
//     filterVal: string | number,
//   ) => {
//     setSearchParams((prev) => {
//       const newParams = new URLSearchParams(prev);

//       if (
//         filterKey == "brand" ||
//         filterKey == "rating" ||
//         filterKey == "discount"
//       ) {
//         const remanining = newParams
//           .getAll(filterKey)
//           .filter((item) => item != filterVal);

//         newParams.delete(filterKey);

//         remanining.forEach((item) => newParams.append(filterKey, item));
//       } else {
//         newParams.delete(filterKey);
//       }

//       return newParams;
//     });

//     const remainingFilters = selectedFilters.filter(
//       (item) => item.filterName != filterName,
//     );

//     console.log(remainingFilters);
//     setSelectedFilters(remainingFilters);
//   };

//   const handleResetFilter = () => {
//     setSelectedFilters([]);
//     setSearchParams({});
//   };

//   return (
//     <div className="bg-white py-5 px-3 h-[calc(100vh-76px)] overflow-y-scroll">
//       <div className="flex flex-wrap gap-y-3 gap-x-3 ">
//         {selectedFilters.map((item, i) => (
//           <div className="bg-zinc-300 p-2   gap-3 flex w-auto h-auto rounded-xs">
//             <div className="flex gap-x-1">
//               <span
//                 className="mt-1.5"
//                 onClick={() => {
//                   handleFilterRemoval(
//                     item.filterKey,
//                     item.filterName,
//                     item.filterValue,
//                   );
//                 }}
//               >
//                 {" "}
//                 <X size={16} />
//               </span>
//               <span>
//                 {" "}
//                 {item.filterKey == "price"
//                   ? `${item.filterName}-${item.filterValue}`
//                   : item.filterName}
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="w-full flex justify-between px-2 pt-4">
//         <span className="text-2xl font-semibold">Filters</span>
//         <span className=" text-nav  font-semibold" onClick={handleResetFilter}>
//           RESET
//         </span>
//       </div>

//       {filterTypes.map((item, i) => (
//         <div key={i}>
//           <div
//             className={`border-b uppercase font-semibold  border-zinc-300 h-18 px-5 w-full flex justify-between items-center`}
//           >
//             {" "}
//             {item.name}{" "}
//             <span
//               onClick={() => handleExpand(item.id)}
//               className="cursor-pointer"
//             >
//               <ChevronDown />
//             </span>
//           </div>

//           <div
//             className={`h-auto px-5 py-3  ${expanded[item.id] ? "block" : "hidden"}`}
//           >
//             {item.content}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default FilterPanel;
