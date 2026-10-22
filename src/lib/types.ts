export type Product = {
  id: number;
  title: string;
  price: number;
  brand: string;
  discountPercentage: number;
  meta: {
    createdAt: Date;
  };
  rating: number;
  thumbnail: string;
  description?: string;

  quantity: number;
  category: string;
  tags: string[];
};

export type Data = {
  products?: Product[];
};
