'use client';

import { Star, Shield, Award, MapPin, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export interface BreederBadgeProps {
  name: string;
  rating: number;
  reviewCount?: number;
  verified: boolean;
  yearsExperience?: number;
  location: string;
  specialties?: string[];
  certifications?: string[];
  memberSince?: string;
  variant?: 'full' | 'compact' | 'minimal';
}

export default function BreederBadge({
  name,
  rating,
  reviewCount = 0,
  verified,
  yearsExperience,
  location,
  specialties = [],
  certifications = [],
  memberSince,
  variant = 'full'
}: BreederBadgeProps) {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative w-3 h-3">
          <Star className="w-3 h-3 text-gray-300" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-3 h-3 text-gray-300" />
      );
    }

    return stars;
  };

  if (variant === 'minimal') {
    return (
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-gray-700">{name}</span>
        {verified && (
          <Badge className="bg-warm-gold text-forest-green text-xs px-2 py-0.5">
            Verified
          </Badge>
        )}
        <div className="flex items-center space-x-1">
          {renderStars(rating)}
          <span className="text-xs text-gray-500">({rating})</span>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-3 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h4 className="font-semibold text-forest-green">{name}</h4>
            {verified && (
              <div className="flex items-center space-x-1">
                <Shield className="w-3 h-3 text-warm-gold" />
                <Badge className="bg-warm-gold text-forest-green text-xs px-2 py-0.5">
                  Verified
                </Badge>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-1">
            {renderStars(rating)}
            <span className="text-gray-600">
              {rating} {reviewCount > 0 && `(${reviewCount} reviews)`}
            </span>
          </div>
          <div className="flex items-center text-gray-500">
            <MapPin className="w-3 h-3 mr-1" />
            <span>{location}</span>
          </div>
        </div>

        {specialties.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {specialties.slice(0, 2).map((specialty, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-xs px-2 py-0.5 border-gray-300 text-gray-600"
              >
                {specialty}
              </Badge>
            ))}
            {specialties.length > 2 && (
              <Badge
                variant="outline"
                className="text-xs px-2 py-0.5 border-gray-300 text-gray-600"
              >
                +{specialties.length - 2} more
              </Badge>
            )}
          </div>
        )}
      </div>
    );
  }

  // Full variant
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="font-heading text-lg font-semibold text-forest-green">
              {name}
            </h3>
            {verified && (
              <div className="flex items-center space-x-1">
                <Shield className="w-4 h-4 text-warm-gold" />
                <Badge className="bg-warm-gold text-forest-green text-sm px-2 py-0.5">
                  Verified Breeder
                </Badge>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2 mt-1">
            <div className="flex items-center space-x-1">
              {renderStars(rating)}
              <span className="text-sm font-medium text-gray-700">{rating}</span>
            </div>
            {reviewCount > 0 && (
              <span className="text-sm text-gray-500">({reviewCount} reviews)</span>
            )}
          </div>
        </div>

        {yearsExperience && yearsExperience > 0 && (
          <div className="text-right">
            <div className="text-2xl font-bold text-warm-gold">{yearsExperience}</div>
            <div className="text-xs text-gray-500">Years Experience</div>
          </div>
        )}
      </div>

      {/* Location and Member Since */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center space-x-1">
          <MapPin className="w-4 h-4" />
          <span>{location}</span>
        </div>
        {memberSince && (
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>Member since {memberSince}</span>
          </div>
        )}
      </div>

      {/* Specialties */}
      {specialties.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Specializes in:</h4>
          <div className="flex flex-wrap gap-2">
            {specialties.map((specialty, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-xs px-2 py-1 border-forest-green/30 text-forest-green"
              >
                {specialty}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
            <Award className="w-4 h-4 mr-1 text-warm-gold" />
            Certifications:
          </h4>
          <div className="flex flex-wrap gap-2">
            {certifications.map((cert, index) => (
              <Badge
                key={index}
                className="bg-warm-gold/10 text-warm-gold text-xs px-2 py-1"
              >
                {cert}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Trust Indicators */}
      <div className="grid grid-cols-3 gap-3 pt-3 border-t border-gray-100">
        <div className="text-center">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-1">
            <Shield className="w-4 h-4 text-green-600" />
          </div>
          <div className="text-xs text-gray-600">Verified</div>
        </div>
        <div className="text-center">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-1">
            <Award className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-xs text-gray-600">Certified</div>
        </div>
        <div className="text-center">
          <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-1">
            <Star className="w-4 h-4 text-yellow-600" />
          </div>
          <div className="text-xs text-gray-600">Top Rated</div>
        </div>
      </div>
    </div>
  );
}