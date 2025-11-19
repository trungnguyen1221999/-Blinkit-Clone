import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getSubCategoriesApi } from '../api/subCategoryApi/subCategoryApi';

const SubCategoryPage = () => {
  const { subCategoryId } = useParams();
  
  // Fetch all subcategories to get the specific one
  const { data: subCategories = [], isLoading } = useQuery({
    queryKey: ['subcategories'],
    queryFn: getSubCategoriesApi,
  });

  // Find the current subcategory
  const currentSubCategory = subCategories.find((sub: any) => sub._id === subCategoryId);

  if (isLoading) {
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
          SubCategory Page - Details coming soon
        </p>
        
        <div className="bg-slate-50 rounded-xl p-8 max-w-md mx-auto">
          <div className="text-slate-400 mb-4">
            <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="font-semibold text-slate-700 mb-2">Content Under Development</h3>
          <p className="text-sm text-slate-500">
            Products and detailed information for this subcategory will be added soon.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubCategoryPage;