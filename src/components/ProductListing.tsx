import { API_URL } from "@/api";
import ProductListingLayout from "./ProductListingLayout";

export default async function ProductListing() {
  const res = await fetch(new URL("/products?limit=100", API_URL));
  const { products } = await res.json();

  return <ProductListingLayout products={products} />;
}
