import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getSubCategoriesApi } from '../api/subCategoryApi/subCategoryApi';
import { getProductsBySubCategoryApi } from '../api/adminApi/productApi';
import ProductCard from '../components/ProductCard';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

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

const SubCategoryPage = () => {
  const params = useParams();
  // Lấy id robust: nếu subCategoryId dài hơn 24 ký tự, tách 24 ký tự cuối (sau dấu - cuối cùng)
  let subCategoryId = params.subCategoryId;
  if (subCategoryId && subCategoryId.length > 24) {
    const match = subCategoryId.match(/([a-f0-9]{24})$/);
    if (match) subCategoryId = match[1];
  }
  // Fetch all subcategories to get the specific one
  const { data: subCategories = [], isLoading } = useQuery({
    queryKey: ['subcategories'],
    queryFn: getSubCategoriesApi,
  });

  // Fetch products for this subcategory
  const { data: products = [], isLoading: isLoadingProducts } = useQuery({
    queryKey: ['products', subCategoryId],
    queryFn: () => getProductsBySubCategoryApi(subCategoryId!),
    enabled: !!subCategoryId,
  });

  // Find the current subcategory
  const currentSubCategory = subCategories.find((sub: any) => sub._id === subCategoryId);

  // Only build slug/SEO URL if currentSubCategory exists
  const subCategorySlug = currentSubCategory ? slugify(currentSubCategory.name) : '';
  const subCategorySeoUrl = currentSubCategory ? `/subcategory/${subCategorySlug}-${currentSubCategory._id}` : '';

  // If current URL does not match SEO URL, redirect (only if subCategory exists)
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (currentSubCategory && location.pathname !== subCategorySeoUrl) {
      navigate(subCategorySeoUrl, { replace: true });
    }
  }, [location.pathname, subCategorySeoUrl, navigate, currentSubCategory]);

  if (isLoading || isLoadingProducts) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </div>
    );
  }

  if (!currentSubCategory) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-800 mb-4">SubCategory Not Found</h1>
          <p className="text-slate-600">The subcategory you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        {/* Subcategory Image and Title/Description - Side by side */}
        <div className="flex flex-col md:flex-row items-center md:justify-between gap-8 mb-16">
          <div className="relative w-full max-w-2xl md:w-1/2 h-64 md:h-80 lg:h-96 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-100/30 to-primary-50 rounded-2xl shadow-lg border border-primary-100/40 z-0"></div>
            <img
              src={currentSubCategory.image?.url || '/images/placeholder-category.jpg'}
              alt={currentSubCategory.name}
              className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-105 drop-shadow-xl relative z-10"
              style={{ maxHeight: '100%', maxWidth: '100%' }}
              onError={e => {
                const target = e.target as HTMLImageElement;
                target.src = '/images/placeholder-category.jpg';
              }}
            />
          </div>
          <div className="flex-1 text-left">
            {/* Breadcrumb */}
            <div className="text-sm text-slate-500 mb-4">
              {currentSubCategory.category && currentSubCategory.category.length > 0 && (
                <span>
                  {currentSubCategory.category.map((cat: any, index: number) => (
                    <span key={cat._id}>
                      {index > 0 && ' / '}
                      {cat.name}
                    </span>
                  ))}
                  {' / '}
                </span>
              )}
              <span className="text-primary-600">{currentSubCategory.name}</span>
            </div>
            <h1 className="text-4xl font-bold text-slate-800 mb-4">
              {currentSubCategory.name}
            </h1>
            <p className="text-slate-600 text-lg mb-8">
              {products.length > 0 ? `Found ${products.length} products in this subcategory.` : 'No products found in this subcategory.'}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product: any) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        {products.length === 0 && (
          <div className="bg-slate-50 rounded-xl p-8 max-w-md mx-auto mt-8">
            <div className="text-slate-400 mb-4">
              <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 2a6 6 0 100 12 6 6 0 000-12z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-slate-500">No products available in this subcategory.</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubCategoryPage;