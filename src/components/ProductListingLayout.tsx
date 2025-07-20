import Image from "next/image";

type Product = {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
  sku: string;
};

type Props = {
  products: Product[];
};

export default function ProductListingLayout({ products }: Props) {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Customers also purchased
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <Image
                alt={product.title}
                src={product.thumbnail}
                width={300}
                height={300}
                className="aspect-square w-full rounded-md bg-gray-200 object-cover lg:aspect-auto lg:h-80"
              />
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">{product.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">{product.sku}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
