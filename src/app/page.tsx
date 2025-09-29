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
    <div className="min-h-screen bg-cream">
      <Header />

      {/* Hero Section */}
      <section className="exotic-gradient text-cream py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6">
            DISCOVER YOUR<br />
            <span className="text-warm-gold">EXOTIC COMPANION</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-cream/90">
            Ethical Breeding. Verified Luxury.
          </p>
          <Button
            size="lg"
            className="bg-warm-gold text-forest-green hover:bg-warm-gold-light font-semibold px-8 py-4 text-lg"
          >
            VIEW LISTINGS
          </Button>
        </div>
      </section>

      {/* Search and Filter Bar */}
      <section className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search by name, breed, or breeder..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setIsFilterOpen(true)}
                className="md:hidden"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">
                {filteredCats.length} cats found
              </span>
              <div className="flex items-center border rounded-md">
                <Button
                  size="sm"
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
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
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-forest-green mb-4">
              TESTIMONIALS
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
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
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-warm-gold rounded-full flex items-center justify-center text-forest-green font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <h4 className="font-semibold text-forest-green">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm mb-3 italic">"{testimonial.text}"</p>
                <div className="flex items-center">
                  {Array.from({ length: testimonial.rating }, (_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
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