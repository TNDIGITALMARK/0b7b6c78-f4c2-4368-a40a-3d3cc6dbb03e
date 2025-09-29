'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

export interface FilterOptions {
  breeds: string[];
  priceRange: [number, number];
  age: string[];
  gender: string[];
  location: string[];
  features: string[];
  availability: string[];
  sortBy: string;
}

interface FilterSidebarProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function FilterSidebar({
  filters,
  onFiltersChange,
  isOpen,
  onClose
}: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['breeds', 'price', 'availability'])
  );

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const updateFilter = <K extends keyof FilterOptions>(
    key: K,
    value: FilterOptions[K]
  ) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const toggleArrayFilter = (key: keyof FilterOptions, value: string) => {
    const currentArray = filters[key] as string[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    updateFilter(key, newArray as FilterOptions[keyof FilterOptions]);
  };

  const clearAllFilters = () => {
    onFiltersChange({
      breeds: [],
      priceRange: [0, 50000],
      age: [],
      gender: [],
      location: [],
      features: [],
      availability: [],
      sortBy: 'newest'
    });
  };

  const getActiveFilterCount = () => {
    return (
      filters.breeds.length +
      filters.age.length +
      filters.gender.length +
      filters.location.length +
      filters.features.length +
      filters.availability.length +
      (filters.priceRange[0] > 0 || filters.priceRange[1] < 50000 ? 1 : 0)
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const breedOptions = [
    'Bengal Cat',
    'Savannah Cat',
    'Maine Coon',
    'Persian',
    'Ragdoll',
    'British Shorthair',
    'Russian Blue',
    'Siamese'
  ];

  const ageOptions = [
    'Kitten (0-6 months)',
    'Young (6-18 months)',
    'Adult (1-7 years)',
    'Senior (7+ years)'
  ];

  const genderOptions = ['Male', 'Female'];

  const locationOptions = [
    'California',
    'New York',
    'Texas',
    'Florida',
    'Illinois',
    'Pennsylvania',
    'Ohio',
    'Georgia'
  ];

  const featureOptions = [
    'Champion Bloodline',
    'Show Quality',
    'Breeding Rights',
    'Health Tested',
    'Vaccinated',
    'Microchipped',
    'Spayed/Neutered',
    'Rare Color'
  ];

  const availabilityOptions = [
    'Available',
    'Reserved',
    'Sold'
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'name-az', label: 'Name: A to Z' },
    { value: 'name-za', label: 'Name: Z to A' }
  ];

  const FilterSection = ({
    title,
    sectionKey,
    children
  }: {
    title: string;
    sectionKey: string;
    children: React.ReactNode;
  }) => {
    const isExpanded = expandedSections.has(sectionKey);

    return (
      <div className="border-b border-gray-200 pb-4 mb-4 last:border-b-0 last:mb-0">
        <button
          onClick={() => toggleSection(sectionKey)}
          className="flex items-center justify-between w-full text-left font-semibold text-forest-green hover:text-warm-gold transition-colors"
        >
          <span>{title}</span>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
        {isExpanded && <div className="mt-3 space-y-2">{children}</div>}
      </div>
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:sticky top-0 left-0 h-screen lg:h-auto w-80 bg-white shadow-lg lg:shadow-none border-r border-gray-200 z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } overflow-y-auto`}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-forest-green" />
              <h2 className="font-heading text-xl font-semibold text-forest-green">Filters</h2>
              {getActiveFilterCount() > 0 && (
                <Badge className="bg-warm-gold text-forest-green">
                  {getActiveFilterCount()}
                </Badge>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Clear All Filters */}
          {getActiveFilterCount() > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearAllFilters}
              className="w-full mb-6 border-warm-gold text-warm-gold hover:bg-warm-gold hover:text-forest-green"
            >
              Clear All Filters
            </Button>
          )}

          {/* Sort By */}
          <FilterSection title="Sort By" sectionKey="sort">
            <RadioGroup
              value={filters.sortBy}
              onValueChange={(value) => updateFilter('sortBy', value)}
            >
              {sortOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="text-sm">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </FilterSection>

          {/* Breed Filter */}
          <FilterSection title="Breed" sectionKey="breeds">
            {breedOptions.map((breed) => (
              <div key={breed} className="flex items-center space-x-2">
                <Checkbox
                  id={`breed-${breed}`}
                  checked={filters.breeds.includes(breed)}
                  onCheckedChange={() => toggleArrayFilter('breeds', breed)}
                />
                <Label htmlFor={`breed-${breed}`} className="text-sm">
                  {breed}
                </Label>
              </div>
            ))}
          </FilterSection>

          {/* Price Range */}
          <FilterSection title="Price Range" sectionKey="price">
            <div className="space-y-4">
              <Slider
                value={filters.priceRange}
                onValueChange={(value) => updateFilter('priceRange', value as [number, number])}
                min={0}
                max={50000}
                step={500}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>{formatPrice(filters.priceRange[0])}</span>
                <span>{formatPrice(filters.priceRange[1])}</span>
              </div>
            </div>
          </FilterSection>

          {/* Availability */}
          <FilterSection title="Availability" sectionKey="availability">
            {availabilityOptions.map((status) => (
              <div key={status} className="flex items-center space-x-2">
                <Checkbox
                  id={`availability-${status}`}
                  checked={filters.availability.includes(status)}
                  onCheckedChange={() => toggleArrayFilter('availability', status)}
                />
                <Label htmlFor={`availability-${status}`} className="text-sm">
                  {status}
                </Label>
              </div>
            ))}
          </FilterSection>

          {/* Age Filter */}
          <FilterSection title="Age" sectionKey="age">
            {ageOptions.map((age) => (
              <div key={age} className="flex items-center space-x-2">
                <Checkbox
                  id={`age-${age}`}
                  checked={filters.age.includes(age)}
                  onCheckedChange={() => toggleArrayFilter('age', age)}
                />
                <Label htmlFor={`age-${age}`} className="text-sm">
                  {age}
                </Label>
              </div>
            ))}
          </FilterSection>

          {/* Gender Filter */}
          <FilterSection title="Gender" sectionKey="gender">
            {genderOptions.map((gender) => (
              <div key={gender} className="flex items-center space-x-2">
                <Checkbox
                  id={`gender-${gender}`}
                  checked={filters.gender.includes(gender)}
                  onCheckedChange={() => toggleArrayFilter('gender', gender)}
                />
                <Label htmlFor={`gender-${gender}`} className="text-sm">
                  {gender}
                </Label>
              </div>
            ))}
          </FilterSection>

          {/* Location Filter */}
          <FilterSection title="Location" sectionKey="location">
            {locationOptions.map((location) => (
              <div key={location} className="flex items-center space-x-2">
                <Checkbox
                  id={`location-${location}`}
                  checked={filters.location.includes(location)}
                  onCheckedChange={() => toggleArrayFilter('location', location)}
                />
                <Label htmlFor={`location-${location}`} className="text-sm">
                  {location}
                </Label>
              </div>
            ))}
          </FilterSection>

          {/* Features Filter */}
          <FilterSection title="Features" sectionKey="features">
            {featureOptions.map((feature) => (
              <div key={feature} className="flex items-center space-x-2">
                <Checkbox
                  id={`feature-${feature}`}
                  checked={filters.features.includes(feature)}
                  onCheckedChange={() => toggleArrayFilter('features', feature)}
                />
                <Label htmlFor={`feature-${feature}`} className="text-sm">
                  {feature}
                </Label>
              </div>
            ))}
          </FilterSection>
        </div>
      </div>
    </>
  );
}