import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getCategoriesApi } from '../api/categoryApi/categoryApi';
import CategorySlideshow from '../components/CategorySlideshow';

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-200 mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading category...</p>
        </div>
      </div>
    );
  }

  if (!currentCategory) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-lg mx-auto">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-slate-800 mb-4">Category Not Found</h1>
            <p className="text-slate-600 text-lg">The category you're looking for doesn't exist or has been moved.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <CategorySlideshow category={currentCategory} />
      </div>
    </div>
  );
};

export default CategoryPage;