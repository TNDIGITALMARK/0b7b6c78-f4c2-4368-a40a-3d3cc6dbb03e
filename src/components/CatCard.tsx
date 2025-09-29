'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, Star, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

export interface CatCardProps {
  id: string;
  name: string;
  breed: string;
  price: number;
  priceRange?: {
    min: number;
    max: number;
  };
  image: string;
  age: string;
  gender: 'Male' | 'Female';
  location: string;
  breeder: {
    name: string;
    verified: boolean;
    rating: number;
  };
  features: string[];
  availability: 'Available' | 'Reserved' | 'Sold';
  postedDate: string;
  isFavorite?: boolean;
  onFavoriteToggle?: (id: string) => void;
}

export default function CatCard({
  id,
  name,
  breed,
  price,
  priceRange,
  image,
  age,
  gender,
  location,
  breeder,
  features,
  availability,
  postedDate,
  isFavorite = false,
  onFavoriteToggle
}: CatCardProps) {
  const [isImageLoading, setIsImageLoading] = useState(true);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getAvailabilityColor = (status: string) => {
    switch (status) {
      case 'Available':
        return 'bg-green-500';
      case 'Reserved':
        return 'bg-yellow-500';
      case 'Sold':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onFavoriteToggle?.(id);
  };

  return (
    <div className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Link href={`/cat/${id}`}>
          <div className="relative w-full h-full">
            {isImageLoading && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
              </div>
            )}
            <Image
              src={image}
              alt={`${name} - ${breed}`}
              fill
              className={`object-cover transition-all duration-300 group-hover:scale-105 ${
                isImageLoading ? 'opacity-0' : 'opacity-100'
              }`}
              onLoadingComplete={() => setIsImageLoading(false)}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </Link>

        {/* Overlay Elements */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Favorite Button */}
        <Button
          size="sm"
          variant="ghost"
          className={`absolute top-3 right-3 w-8 h-8 rounded-full p-0 ${
            isFavorite
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500'
          } backdrop-blur-sm transition-all duration-200`}
          onClick={handleFavoriteClick}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </Button>

        {/* Availability Badge */}
        <div className="absolute top-3 left-3">
          <Badge
            className={`${getAvailabilityColor(availability)} text-white text-xs px-2 py-1 font-medium`}
          >
            {availability}
          </Badge>
        </div>

        {/* Price Tag */}
        <div className="absolute bottom-3 left-3 bg-forest-green text-cream px-3 py-1 rounded-full font-semibold text-sm shadow-lg">
          {priceRange ? (
            `${formatPrice(priceRange.min)} - ${formatPrice(priceRange.max)}`
          ) : (
            formatPrice(price)
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 space-y-3">
        {/* Header */}
        <div>
          <Link href={`/cat/${id}`}>
            <h3 className="font-heading text-lg font-semibold text-forest-green group-hover:text-warm-gold transition-colors">
              {name}
            </h3>
          </Link>
          <p className="text-sm text-gray-600 font-medium">{breed}</p>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center text-gray-600">
            <Clock className="w-3 h-3 mr-1" />
            <span>{age}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <span className="w-3 h-3 mr-1 text-center">♂♀</span>
            <span>{gender}</span>
          </div>
        </div>

        {/* Location & Breeder */}
        <div className="space-y-2">
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="w-3 h-3 mr-1" />
            <span>{location}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700">{breeder.name}</span>
              {breeder.verified && (
                <Badge className="bg-warm-gold text-forest-green text-xs px-2 py-0.5 font-medium">
                  Verified
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs text-gray-600">{breeder.rating}</span>
            </div>
          </div>
        </div>

        {/* Features */}
        {features.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {features.slice(0, 3).map((feature, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-xs px-2 py-1 border-gray-200 text-gray-600"
              >
                {feature}
              </Badge>
            ))}
            {features.length > 3 && (
              <Badge
                variant="outline"
                className="text-xs px-2 py-1 border-gray-200 text-gray-600"
              >
                +{features.length - 3} more
              </Badge>
            )}
          </div>
        )}

        {/* Posted Date */}
        <div className="text-xs text-gray-500 pt-2 border-t border-gray-100">
          Posted {postedDate}
        </div>
      </div>

      {/* Hover Overlay Actions */}
      <div className="absolute inset-x-4 bottom-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
        <div className="bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg">
          <div className="flex space-x-2">
            <Button
              size="sm"
              className="flex-1 bg-forest-green hover:bg-forest-green-dark text-cream"
            >
              View Details
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="flex-1 border-warm-gold text-warm-gold hover:bg-warm-gold hover:text-forest-green"
            >
              Contact Breeder
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}