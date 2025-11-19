import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getCategoriesApi } from '../api/categoryApi/categoryApi';

const CategoryPage = () => {
  const { categoryId } = useParams();
  
  // Fetch all categories to get the specific one
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategoriesApi,
  });

  // Find the current category
  const currentCategory = categories.find((cat: any) => cat._id === categoryId);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </div>
    );
  }

  if (!currentCategory) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-800 mb-4">Category Not Found</h1>
          <p className="text-slate-600">The category you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">
          {currentCategory.name}
        </h1>
        <p className="text-slate-600 text-lg mb-8">
          Category Page - Details coming soon
        </p>
        
        <div className="bg-slate-50 rounded-xl p-8 max-w-md mx-auto">
          <div className="text-slate-400 mb-4">
            <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="font-semibold text-slate-700 mb-2">Content Under Development</h3>
          <p className="text-sm text-slate-500">
            Products and detailed information for this category will be added soon.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;