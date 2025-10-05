'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Search, Filter, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CatCard from '@/components/CatCard';
import FilterSidebar, { FilterOptions } from '@/components/FilterSidebar';
import { mockCats } from '@/lib/mockData';

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [filters, setFilters] = useState<FilterOptions>({
    breeds: [],
    priceRange: [0, 50000],
    age: [],
    gender: [],
    location: [],
    features: [],
    availability: [],
    sortBy: 'newest'
  });

  const handleFavoriteToggle = (catId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(catId)) {
        newFavorites.delete(catId);
      } else {
        newFavorites.add(catId);
      }
      return newFavorites;
    });
  };

  const filteredCats = mockCats.filter(cat => {
    // Search filter
    const matchesSearch = searchQuery === '' ||
      cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.breeder.name.toLowerCase().includes(searchQuery.toLowerCase());

    // Breed filter
    const matchesBreed = filters.breeds.length === 0 ||
      filters.breeds.includes(cat.breed);

    // Price filter
    const catPrice = cat.price || (cat.priceRange?.min || 0);
    const matchesPrice = catPrice >= filters.priceRange[0] && catPrice <= filters.priceRange[1];

    // Availability filter
    const matchesAvailability = filters.availability.length === 0 ||
      filters.availability.includes(cat.availability);

    // Gender filter
    const matchesGender = filters.gender.length === 0 ||
      filters.gender.includes(cat.gender);

    // Features filter
    const matchesFeatures = filters.features.length === 0 ||
      filters.features.some(feature => cat.features.includes(feature));

    return matchesSearch && matchesBreed && matchesPrice && matchesAvailability &&
           matchesGender && matchesFeatures;
  }).sort((a, b) => {
    switch (filters.sortBy) {
      case 'price-low':
        return (a.price || 0) - (b.price || 0);
      case 'price-high':
        return (b.price || 0) - (a.price || 0);
      case 'name-az':
        return a.name.localeCompare(b.name);
      case 'name-za':
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-24 md:py-32">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="inline-block mb-4 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <span className="text-blue-200 text-sm font-medium">Premium Exotic Cats Marketplace</span>
            </div>
            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              DISCOVER YOUR<br />
              <span className="bg-gradient-to-r from-cyan-300 via-blue-200 to-indigo-300 bg-clip-text text-transparent">
                EXOTIC COMPANION
              </span>
            </h1>
            <p className="text-xl md:text-3xl mb-10 text-blue-100 font-light max-w-3xl mx-auto leading-relaxed">
              Ethical Breeding. Verified Luxury. Lifelong Joy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-white text-blue-700 hover:bg-blue-50 font-bold px-10 py-6 text-lg rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
              >
                VIEW LISTINGS
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm font-semibold px-10 py-6 text-lg rounded-full transition-all duration-200"
              >
                LEARN MORE
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-16 md:h-24 fill-current text-blue-50" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
      </section>

      {/* Search and Filter Bar */}
      <section className="bg-white shadow-sm border-b border-blue-100 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" />
                <Input
                  type="text"
                  placeholder="Search by name, breed, or breeder..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-blue-200 focus:border-blue-400 focus:ring-blue-400 rounded-lg"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setIsFilterOpen(true)}
                className="md:hidden border-blue-200 text-blue-700 hover:bg-blue-50"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>

            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
                {filteredCats.length} cats found
              </span>
              <div className="flex items-center border border-blue-200 rounded-lg overflow-hidden">
                <Button
                  size="sm"
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  onClick={() => setViewMode('grid')}
                  className={`rounded-none ${viewMode === 'grid' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'text-blue-600 hover:bg-blue-50'}`}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  onClick={() => setViewMode('list')}
                  className={`rounded-none ${viewMode === 'list' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'text-blue-600 hover:bg-blue-50'}`}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            {/* Sidebar Filters - Desktop */}
            <div className="hidden lg:block w-80 flex-shrink-0">
              <FilterSidebar
                filters={filters}
                onFiltersChange={setFilters}
                isOpen={true}
                onClose={() => {}}
              />
            </div>

            {/* Mobile Filter Sidebar */}
            <FilterSidebar
              filters={filters}
              onFiltersChange={setFilters}
              isOpen={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
            />

            {/* Cat Listings */}
            <div className="flex-1">
              {filteredCats.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No cats found</h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your search criteria or filters
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery('');
                      setFilters({
                        breeds: [],
                        priceRange: [0, 50000],
                        age: [],
                        gender: [],
                        location: [],
                        features: [],
                        availability: [],
                        sortBy: 'newest'
                      });
                    }}
                  >
                    Clear all filters
                  </Button>
                </div>
              ) : (
                <div
                  className={
                    viewMode === 'grid'
                      ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                      : 'space-y-4'
                  }
                >
                  {filteredCats.map((cat) => (
                    <CatCard
                      key={cat.id}
                      {...cat}
                      isFavorite={favorites.has(cat.id)}
                      onFavoriteToggle={handleFavoriteToggle}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-2 bg-blue-100 rounded-full">
              <span className="text-blue-700 text-sm font-semibold">CUSTOMER STORIES</span>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-blue-900 mb-6">
              TESTIMONIALS
            </h2>
            <p className="text-blue-700 text-lg max-w-2xl mx-auto leading-relaxed">
              Hear from our satisfied customers who found their perfect exotic companions through our verified breeder network.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: 'Sarah M.',
                location: 'California',
                text: 'Found my perfect Bengal through Exotic Paws. The breeder was amazing and the whole process was seamless.',
                rating: 5
              },
              {
                name: 'Michael R.',
                location: 'Texas',
                text: 'My Savannah cat is absolutely incredible. The health guarantee gave me peace of mind.',
                rating: 5
              },
              {
                name: 'Jennifer K.',
                location: 'Florida',
                text: 'The Maine Coon I adopted is gentle giant perfection. Couldn\'t be happier with my choice.',
                rating: 5
              },
              {
                name: 'David L.',
                location: 'New York',
                text: 'Excellent service and support. The verification process ensures you get quality cats from reputable breeders.',
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-blue-100">
                <div className="flex items-center mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <h4 className="font-semibold text-blue-900 text-lg">{testimonial.name}</h4>
                    <p className="text-sm text-blue-600">{testimonial.location}</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm mb-4 italic leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center">
                  {Array.from({ length: testimonial.rating }, (_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">★</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}