import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getCategoriesApi } from '../api/categoryApi/categoryApi';
import { getSubCategoriesByCategoryApi } from '../api/subCategoryApi/subCategoryApi';

interface Category {
  _id: string;
  name: string;
  image?: {
    url: string;
    public_id: string;
  };
}

interface SubCategory {
  _id: string;
  name: string;
  image: {
    url: string;
    public_id: string;
  };
  category: Array<{
    _id: string;
    name: string;
  }>;
}

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [subCategories, setSubCategories] = useState<{ [key: string]: SubCategory[] }>({});
  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);

  // Fetch categories
  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategoriesApi,
  });

  // Handle mouse enter on category
  const handleMouseEnter = async (categoryId: string) => {
    if (dropdownTimeout.current) {
      clearTimeout(dropdownTimeout.current);
    }
    
    setActiveDropdown(categoryId);

    // Fetch subcategories if not already loaded
    if (!subCategories[categoryId]) {
      try {
        const subs = await getSubCategoriesByCategoryApi(categoryId);
        setSubCategories(prev => ({
          ...prev,
          [categoryId]: subs
        }));
      } catch (error) {
        console.error('Failed to fetch subcategories:', error);
      }
    }
  };

  // Handle mouse leave with delay
  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 300); // 300ms delay before closing
  };

  // Clear timeout on dropdown enter
  const handleDropdownEnter = () => {
    if (dropdownTimeout.current) {
      clearTimeout(dropdownTimeout.current);
    }
  };

  // Clean up timeout on component unmount
  useEffect(() => {
    return () => {
      if (dropdownTimeout.current) {
        clearTimeout(dropdownTimeout.current);
      }
    };
  }, []);

  if (categoriesLoading) {
    return (
      <nav className="bg-white border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center h-12">
            <div className="animate-pulse flex space-x-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-4 bg-slate-200 rounded w-20"></div>
              ))}
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white border-b border-slate-200 shadow-sm relative z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-12 overflow-x-auto scrollbar-hide">
          {/* Mobile Menu Icon */}
          <button className="lg:hidden flex items-center mr-4 p-1 hover:bg-slate-50 rounded">
            <Menu size={20} className="text-slate-600" />
          </button>

          {/* Categories */}
          <div className="flex items-center space-x-6 lg:space-x-8">
            {categories.map((category: Category) => (
              <div
                key={category._id}
                className="relative"
                onMouseEnter={() => handleMouseEnter(category._id)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  to={`/category/${category._id}`}
                  className="flex items-center space-x-1 py-3 px-2 text-sm font-medium text-slate-700 hover:text-primary-600 transition-colors whitespace-nowrap group"
                >
                  <span>{category.name}</span>
                  <ChevronDown 
                    size={14} 
                    className={`transition-transform duration-200 ${
                      activeDropdown === category._id ? 'rotate-180' : ''
                    } group-hover:text-primary-600`}
                  />
                </Link>

                {/* Dropdown Menu */}
                {activeDropdown === category._id && (
                  <div
                    className="absolute top-full left-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg min-w-[250px] py-2 z-50"
                    onMouseEnter={handleDropdownEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    {subCategories[category._id] ? (
                      subCategories[category._id].length > 0 ? (
                        <div className="max-h-96 overflow-y-auto">
                          {subCategories[category._id].map((subCategory: SubCategory) => (
                            <Link
                              key={subCategory._id}
                              to={`/subcategory/${subCategory._id}`}
                              className="flex items-center space-x-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-primary-600 transition-colors"
                            >
                              {subCategory.image?.url && (
                                <img
                                  src={subCategory.image.url}
                                  alt={subCategory.name}
                                  className="w-6 h-6 rounded object-cover flex-shrink-0"
                                />
                              )}
                              <span className="truncate">{subCategory.name}</span>
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <div className="px-4 py-3 text-sm text-slate-400 text-center">
                          No subcategories available
                        </div>
                      )
                    ) : (
                      <div className="px-4 py-3">
                        <div className="animate-pulse space-y-2">
                          {[...Array(3)].map((_, i) => (
                            <div key={i} className="flex items-center space-x-3">
                              <div className="w-6 h-6 bg-slate-200 rounded"></div>
                              <div className="h-4 bg-slate-200 rounded flex-1"></div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;