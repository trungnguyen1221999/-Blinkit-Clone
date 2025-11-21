import { Link } from "react-router-dom";

// Helper: slugify string (safe)
function slugify(str: any) {
  if (!str || typeof str !== 'string') return 'unknown';
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');
}

// Helper: get category/subcategory name (safe)
function getCategoryName(cat: any) {
  if (!cat) return 'unknown';
  if (typeof cat === 'string') return slugify(cat);
  if (typeof cat === 'object' && typeof cat.name === 'string') return slugify(cat.name);
  return 'unknown';
}
function getSubCategoryName(sub: any) {
  if (!sub) return 'unknown';
  if (typeof sub === 'string') return slugify(sub);
  if (typeof sub === 'object' && typeof sub.name === 'string') return slugify(sub.name);
  return 'unknown';
}

interface ProductCardProps {
  product: any;
  onAddToCart?: (product: any) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const discount = typeof product.discount === 'number' ? product.discount : 0;
  const discountedPrice = product.price * (1 - discount / 100);

  // Build SEO url (safe)
  const category = product.category && product.category[0] ? getCategoryName(product.category[0]) : 'unknown';
  const subcategory = product.SubCategory && product.SubCategory[0] ? getSubCategoryName(product.SubCategory[0]) : 'unknown';
  const nameSlug = slugify(product.name);
  const slug = `${nameSlug}-${product._id}`;
  const productUrl = `/products/${category}/${subcategory}/${slug}`;

  return (
    <div className="block bg-white rounded-lg shadow p-4 hover:shadow-lg flex flex-col relative">
      {discount > 0 && (
        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10 shadow-lg animate-bounce">
          Sale
        </div>
      )}
      <Link to={productUrl}>
        <div className="w-full aspect-square mb-2 flex items-center justify-center overflow-hidden">
          <img src={product.images?.[0]?.url || "/images/placeholder-product.jpg"} alt={product.name} className="object-contain w-full h-full" />
        </div>
      </Link>
      <div className="font-semibold text-slate-800 line-clamp-1 mb-1">{product.name}</div>
      <div className="text-xs text-slate-500 line-clamp-1 mb-1">{product.unit}</div>
      {product.more_details && (
        <div className="mb-1 flex flex-row gap-2 flex-wrap">
          {product.more_details["Country of origin/country of manufacture"] && (
            <div className="inline-flex items-center bg-slate-100 rounded-full px-2 py-0.5 text-xs text-slate-700 font-medium border border-slate-200">
              <span className="mr-1 text-slate-400">Origin:</span>
              <span>{product.more_details["Country of origin/country of manufacture"]}</span>
            </div>
          )}
          {product.more_details["EAN code"] && (
            <div className="inline-flex items-center bg-slate-100 rounded-full px-2 py-0.5 text-xs text-slate-700 font-mono border border-slate-200">
              <span className="mr-1 text-slate-400">EAN:</span>
              <span>{product.more_details["EAN code"]}</span>
            </div>
          )}
        </div>
      )}
      <div className="mb-2">
        {discount > 0 ? (
          <>
            <span className="text-primary-600 font-bold text-base mr-1">${discountedPrice.toFixed(2)}</span>
            <span className="text-xs text-slate-400 line-through">${product.price.toFixed(2)}</span>
            <span className="ml-2 text-xs text-red-500 font-bold">-{discount}%</span>
          </>
        ) : (
          <span className="text-primary-600 font-bold text-base">${product.price.toFixed(2)}</span>
        )}
      </div>
      <button
        className="mt-auto px-3 py-1.5 bg-primary-100 text-primary-700 rounded hover:bg-primary-200 text-sm font-semibold transition-all"
        onClick={() => onAddToCart ? onAddToCart(product) : console.log('Add to cart', product)}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
