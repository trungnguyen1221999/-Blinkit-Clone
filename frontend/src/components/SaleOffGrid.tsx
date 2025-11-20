import { useQuery } from '@tanstack/react-query';
import { getAllProductsApi } from '../api/adminApi/productApi';
import { Link } from 'react-router-dom';
import { ShoppingCart, Percent } from 'lucide-react';
import { useMemo } from 'react';

interface Product {
  _id: string;
  name: string;
  images: Array<{
    url: string;
    public_id: string;
  }>;
  unit: string;
  price: number;
  discount?: number;
  publish: boolean;
}

const SaleOffGrid = () => {
  // Fetch all products
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products', 'all'],
    queryFn: getAllProductsApi,
  });

  // Filter only published products with discount > 0
  const saleProducts: Product[] = useMemo(() => (
    Array.isArray(products)
      ? products.filter((product: Product) => product.publish && typeof product.discount === 'number' && product.discount > 0)
      : []
  ), [products]);

  if (isLoading) {
    return (
      <div className="w-full py-12">
        <div className="container mx-auto px-4">
          <div className="h-8 bg-slate-200 rounded-lg w-64 mx-auto animate-pulse mb-8"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-lg animate-pulse">
                <div className="w-full h-32 bg-slate-200 rounded-xl mb-4"></div>
                <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-slate-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!saleProducts.length) return null;

  return (
    <section className="w-full py-12 relative rounded-3xl shadow-2xl my-8 overflow-hidden">
      {/* Impressive background gradient and pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-br from-primary-100 via-white via-60% to-red-100 opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-200/30 via-transparent to-transparent opacity-60" />
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-red-200 opacity-20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary-200 opacity-20 rounded-full blur-2xl" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Percent size={32} className="text-red-500 drop-shadow-lg animate-bounce" />
            <h2 className="text-2xl md:text-3xl font-extrabold text-red-500 tracking-tight drop-shadow-sm">
              Hot Sale Off
            </h2>
            <span className="bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full shadow animate-pulse">
              {saleProducts.length} deals
            </span>
          </div>
          <Link
            to="/sale-off"
            className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-semibold bg-red-500 text-white shadow hover:bg-red-600 transition-all duration-200 border border-red-200/40"
          >
            View All
          </Link>
        </div>
        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {saleProducts.slice(0, 12).map((product) => {
            const originalPrice = product.price;
            const discount = typeof product.discount === 'number' ? product.discount : 0;
            const discountedPrice = originalPrice * (1 - discount / 100);
            return (
              <Link
                key={product._id}
                to={`/product/${product._id}`}
                className="group block h-full"
              >
                <div className="relative bg-white rounded-xl p-2 shadow-md hover:shadow-xl transition-all duration-300 transform group-hover:scale-105 overflow-hidden h-full flex flex-col border-2 border-primary-100 hover:border-primary-300">
                  {/* Discount Badge */}
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10 shadow-lg animate-bounce">
                    -{discount}%
                  </div>
                  {/* Image */}
                  <div className="relative mb-2 flex items-center justify-center overflow-hidden rounded-md bg-primary-50 min-h-[120px]" style={{ height: '140px' }}>
                    <img
                      src={product.images?.[0]?.url || '/images/placeholder-product.jpg'}
                      alt={product.name}
                      className="max-h-[120px] w-auto h-auto object-contain mx-auto group-hover:scale-110 transition-transform duration-500"
                      style={{ maxHeight: '120px', width: 'auto', height: 'auto' }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop&crop=center';
                      }}
                    />
                  </div>
                  {/* Content */}
                  <div className="text-center grow flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-slate-800 text-xs group-hover:text-primary-200 transition-colors duration-300 line-clamp-1 mb-1">
                        {product.name}
                      </h3>
                      <p className="text-xs text-slate-500 mb-1 line-clamp-1">
                        {product.unit}
                      </p>
                    </div>
                    {/* Price */}
                    <div className="mb-1">
                      <span className="text-sm font-bold text-primary-200">
                        ${discountedPrice.toFixed(2)}
                      </span>
                      <span className="text-xs text-slate-400 line-through ml-1">
                        ${originalPrice.toFixed(2)}
                      </span>
                    </div>
                    <div className="inline-flex items-center justify-center bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs font-semibold mt-1">
                      <span>Add to Cart</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SaleOffGrid;
