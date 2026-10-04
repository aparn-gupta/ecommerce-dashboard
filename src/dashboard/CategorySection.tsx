import { useEffect, useState } from "react";
import CategoryCard from "../components/CategoryCard";
import { Link } from "react-router";

interface Product {
  category: string;
  images: string[];
}

function CategorySection() {
  const [productsData, setProductsData] = useState<Product[] | []>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | unknown>("");

  let numOfCategories = 12;

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    setLoading(true);

    let categorySet = new Set();
    let uniqueProducts: Product[] = [];
    let limit = 20;
    let offset = 0;

    const fetchData = async (limit: number, offset: number) => {
      try {
        const url = `https://dummyjson.com/products?limit=${limit}&skip=${offset}`;
        const response = await fetch(url);
        const result = await response.json();

        // console.log(result.products);

        for (let item of result.products) {
          if (!categorySet.has(item.category)) {
            uniqueProducts.push(item);
            categorySet.add(item.category);
          }
        }
      } catch (err: unknown) {
        console.log(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData(limit, offset);

    // console.log(categorySet.size);
    // console.log(categorySet);

    while (categorySet.size < numOfCategories) {
      offset += limit;
      // console.log(limit, offset, categorySet);
      await fetchData(limit, offset);
    }

    setProductsData(uniqueProducts);
  }

  return (
    <div className="pb-40">
      <h1 className="text-4xl py-6"> Categories</h1>
      <div className="w-[80vw] mx-auto mt-5">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-500">{JSON.stringify(error)}</div>
        ) : !productsData.length ? (
          <div>No category data found</div>
        ) : (
          <div className="grid grid-cols-4 gap-x-4 gap-y-8">
            {productsData.map((item, i) => (
              <Link to={`/category/${item.category}`} key={i}>
                <CategoryCard catName={item.category} imgSrc={item.images[0]} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CategorySection;
