import React, { useState, useMemo } from 'react';
import { useParams, useSearchParams, useLocation } from 'react-router-dom';
import { ChevronDown, X } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { PRODUCTS } from '../data/mockData';

export default function CategoryPage() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Extract the category path from the location
  const categoryPath = location.pathname.replace('/category/', '');
  const pathSegments = categoryPath.split('/');
  
  // Use the first segment as the main category for filtering products
  const mainCategory = pathSegments[0];
  
  // Create a display name from the full path
  const displayName = pathSegments.join(' / ').replace(/-/g, ' ');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [sortBy, setSortBy] = useState('latest');

  // Get products for category
  const categoryProducts = useMemo(() => {
    let filtered = PRODUCTS.filter(p => p.category === mainCategory);

    // Apply price filter
    filtered = filtered.filter(
      p => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Apply color filter
    if (selectedColors.length > 0) {
      filtered = filtered.filter(p =>
        p.colors.some(c => selectedColors.includes(c))
      );
    }

    // Apply size filter
    if (selectedSizes.length > 0) {
      filtered = filtered.filter(p =>
        p.sizes.some(s => selectedSizes.includes(s))
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        return filtered.sort((a, b) => a.price - b.price);
      case 'price-high':
        return filtered.sort((a, b) => b.price - a.price);
      case 'newest':
        return filtered.reverse();
      default:
        return filtered;
    }
  }, [mainCategory, priceRange, selectedColors, selectedSizes, sortBy]);

  const allColors = [...new Set(PRODUCTS.filter(p => p.category === mainCategory).flatMap(p => p.colors))];
  const allSizes = [...new Set(PRODUCTS.filter(p => p.category === mainCategory).flatMap(p => p.sizes))];

  const toggleColor = (color) => {
    setSelectedColors(prev =>
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  const toggleSize = (size) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const clearFilters = () => {
    setPriceRange([0, 10000]);
    setSelectedColors([]);
    setSelectedSizes([]);
    setSortBy('latest');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="container py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary capitalize">
            {displayName}
          </h1>
          <span className="text-gray-600">
            {categoryProducts.length} Products
          </span>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg">Filters</h3>
                {(selectedColors.length > 0 || selectedSizes.length > 0 || priceRange[0] !== 0 || priceRange[1] !== 10000) && (
                  <button
                    onClick={clearFilters}
                    className="text-secondary hover:text-red-700 text-sm font-semibold"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Price Filter */}
              <div className="mb-6">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  Price <ChevronDown size={16} />
                </h4>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="w-full"
                  />
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full"
                  />
                  <p className="text-sm text-gray-600">
                    Rs. {priceRange[0]} - Rs. {priceRange[1]}
                  </p>
                </div>
              </div>

              {/* Color Filter */}
              {allColors.length > 0 && (
                <div className="mb-6 pb-6 border-b">
                  <h4 className="font-semibold mb-4">Colors</h4>
                  <div className="space-y-2">
                    {allColors.map(color => (
                      <label key={color} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedColors.includes(color)}
                          onChange={() => toggleColor(color)}
                          className="w-4 h-4 rounded"
                        />
                        <span className="text-sm">{color}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Filter */}
              {allSizes.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold mb-4">Sizes</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {allSizes.map(size => (
                      <button
                        key={size}
                        onClick={() => toggleSize(size)}
                        className={`py-2 px-3 border rounded text-sm font-medium transition ${
                          selectedSizes.includes(size)
                            ? 'bg-primary text-white border-primary'
                            : 'border-gray-300 text-primary hover:border-primary'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filter Button & Sorting */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8 items-start sm:items-center justify-between">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden px-4 py-2 border border-primary text-primary rounded hover:bg-primary hover:text-white transition"
              >
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded text-primary"
              >
                <option value="latest">Latest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <div className="lg:hidden bg-gray-50 p-4 rounded-lg mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold">Filters</h3>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Price Filter Mobile */}
                <div className="mb-4">
                  <h4 className="font-semibold mb-2 text-sm">Price Range</h4>
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-600 mt-2">Rs. {priceRange[0]} - Rs. {priceRange[1]}</p>
                </div>

                {/* Colors Mobile */}
                {allColors.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2 text-sm">Colors</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {allColors.map(color => (
                        <label key={color} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedColors.includes(color)}
                            onChange={() => toggleColor(color)}
                            className="w-3 h-3 rounded"
                          />
                          <span className="text-xs">{color}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sizes Mobile */}
                {allSizes.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Sizes</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {allSizes.map(size => (
                        <button
                          key={size}
                          onClick={() => toggleSize(size)}
                          className={`py-1 px-2 border rounded text-xs font-medium transition ${
                            selectedSizes.includes(size)
                              ? 'bg-primary text-white border-primary'
                              : 'border-gray-300 text-primary'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Products Grid */}
            {categoryProducts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found matching your filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
