import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getProductByIdApi, getProductsByCategoryApi } from '../api/adminApi/productApi';
import { BadgePercent, Globe, Barcode, Info, Layers, ChevronDown, ChevronUp, BookOpen, List } from 'lucide-react';
import { useState, useEffect } from 'react';
import AddToCart from '../components/AddToCart';
import ProductCard from '../components/ProductCard';

interface Product {
  _id: string;
  name: string;
  images: Array<{ url: string; public_id: string }>;
  category: (string | { _id: string; name: string })[];
  SubCategory: string[];
  unit: string;
  stock: number;
  price: number;
  discount?: number;
  description: string;
  more_details?: Record<string, string>;
  publish: boolean;
  createdAt: string;
  updatedAt: string;
}

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, error } = useQuery<Product | undefined>({
    queryKey: ['product', id],
    queryFn: () => getProductByIdApi(id!),
    enabled: !!id,
  });
  const [showMoreDetails, setShowMoreDetails] = useState(false);
  const [mainImgIdx, setMainImgIdx] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  // Fetch related products by category
  useEffect(() => {
    const fetchRelated = async () => {
      if (product && product.category && product.category.length > 0) {
        const cat = product.category[0];
        const catId = typeof cat === 'string' ? cat : (cat && 'object' === typeof cat ? cat._id : '');
        if (!catId) return;
        try {
          const products = await getProductsByCategoryApi(catId);
          setRelatedProducts(products.filter((p: Product) => p._id !== product._id));
        } catch (e) {
          setRelatedProducts([]);
        }
      }
    };
    fetchRelated();
  }, [product]);

  if (isLoading) return <div className="text-center py-12 text-lg">Loading product...</div>;
  if (error || !product) return <div className="text-center py-12 text-lg text-red-500">Product not found.</div>;

  const discount = typeof product.discount === 'number' ? product.discount : 0;
  const discountedPrice = product.price * (1 - discount / 100);
  const origin = product.more_details?.['Country of origin/country of manufacture'] || 'Unknown';
  const ean = product.more_details?.['EAN code'] || 'N/A';

  // Prepare more details, including Origin and EAN
  const moreDetails: Record<string, string> = {
    ...(product.more_details || {}),
    'Country of origin/country of manufacture': origin,
    'EAN code': ean,
  };

  return (
    <>
      <section className="w-full min-h-screen bg-white pb-16">
        <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row gap-16 items-start">
          {/* Image */}
          <div className="flex-1 flex flex-col items-center md:items-start">
            <div className="w-full max-w-lg aspect-square bg-white rounded-2xl flex items-center justify-center overflow-hidden mb-4 p-8">
              <img
                src={product.images?.[mainImgIdx]?.url || '/images/placeholder-product.jpg'}
                alt={product.name}
                className="object-contain w-full h-full"
              />
            </div>
            {product.images && product.images.length > 1 && (
              <div className="w-full max-w-lg flex gap-2 mt-2">
                {product.images.map((img, idx) => (
                  <img
                    key={img.public_id || idx}
                    src={img.url}
                    alt={product.name + ' ' + (idx + 1)}
                    className={`w-16 h-16 object-contain rounded ${mainImgIdx === idx ? 'border-2 border-primary-200 ring-2 ring-primary-400' : 'border border-slate-200'} bg-white cursor-pointer transition ${mainImgIdx !== idx ? 'hover:border-primary-200 hover:ring-2 hover:ring-primary-400' : ''}`}
                    onMouseEnter={() => setMainImgIdx(idx)}
                    onClick={() => setMainImgIdx(idx)}
                  />
                ))}
              </div>
            )}
          </div>
          {/* Details (name, price, add to cart) */}
          <div className="flex-1 flex flex-col gap-8 bg-white rounded-2xl p-10">
            <div className="flex flex-col gap-3 md:gap-5">
              <div className="flex flex-col gap-1 md:gap-2">
                <h1 className="text-4xl font-extrabold text-slate-900 mb-1">
                  {product.name}
                </h1>
                {product.stock < 20 && (
                  <span className="inline-flex items-center gap-1 bg-red-50 text-red-700 px-4 py-1 rounded-full text-base font-bold animate-pulse">
                    <Info className="w-5 h-5 text-red-500" /> Low Stock
                  </span>
                )}
              </div>
              <div className="flex items-center gap-5 mb-2">
                {discount > 0 ? (
                  <>
                    <span className="text-4xl font-extrabold text-primary-600 flex items-center gap-2">
                      <BadgePercent className="w-7 h-7 text-red-500" />
                      <span className="text-5xl font-extrabold">${discountedPrice.toFixed(2)}</span>
                      <span className="text-lg font-normal text-slate-700">/{product.unit}</span>
                    </span>
                    <span className="text-xl text-slate-400 line-through font-normal">${product.price.toFixed(2)}/<span className='text-base'>{product.unit}</span></span>
                    <span className="ml-2 text-xl text-red-500 font-extrabold">-{discount}%</span>
                  </>
                ) : (
                  <span className="text-4xl font-extrabold text-primary-600">
                    <span className="text-5xl font-extrabold">${product.price.toFixed(2)}</span>
                    <span className="text-lg font-normal text-slate-700">/{product.unit}</span>
                  </span>
                )}
              </div>
            </div>
            <AddToCart product={product} />
          </div>
        </div>
        {/* Description + More Details full width, but inside container */}
        <div className="container mx-auto px-4 mt-8">
          <div className="w-full">
            <div className="border-t border-slate-100 pt-6">
              <h2 className="text-xl font-extrabold mb-2 flex items-center gap-2 text-primary-700">
                <Info className="w-6 h-6" /> Description
              </h2>
              <p className="text-slate-800 text-lg font-normal whitespace-pre-line mb-2 leading-relaxed">{product.description}</p>
            </div>
            <div className="border-t border-slate-100 pt-6">
              <button
                className="flex items-center gap-2 text-xl font-extrabold mb-2 text-primary-700 focus:outline-none select-none"
                onClick={() => setShowMoreDetails((v) => !v)}
                aria-expanded={showMoreDetails}
                aria-controls="more-details-section"
              >
                <Layers className="w-6 h-6" /> More Details
                {showMoreDetails ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
              {showMoreDetails && (
                <ul id="more-details-section" className="flex flex-col gap-3 mt-2">
                  {Object.entries(moreDetails).map(([key, value]) => {
                    let icon = <Layers className="w-5 h-5 text-primary-400" />;
                    if (/ean/i.test(key)) icon = <Barcode className="w-5 h-5 text-primary-400" />;
                    else if (/origin|country/i.test(key)) icon = <Globe className="w-5 h-5 text-primary-400" />;
                    else if (/instruction|use|usage/i.test(key)) icon = <BookOpen className="w-5 h-5 text-primary-400" />;
                    else if (/ingredient/i.test(key)) icon = <List className="w-5 h-5 text-primary-400" />;
                    return (
                      <li key={key} className="flex gap-2 text-base text-slate-800 font-normal items-center">
                        {icon}
                        <span className="font-semibold text-slate-500">{key}:</span>
                        <span className="font-normal text-slate-800">{String(value)}</span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>
      {/* Related Products List */}
      {relatedProducts.length > 0 && (
        <div className="w-full container mx-auto mt-12">
          <h3 className="text-2xl font-extrabold mb-4 text-slate-900 text-left">Related Products</h3>
          <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-primary-200 text-left justify-start items-stretch">
            {relatedProducts.map((product) => (
              <div key={product._id} className="min-w-[200px] max-w-[220px] flex items-stretch">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetailPage;
