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
};

export type Data = {
  products?: Product[];
};
