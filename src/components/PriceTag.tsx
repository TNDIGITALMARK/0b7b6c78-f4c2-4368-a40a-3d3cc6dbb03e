'use client';

import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export interface PriceTagProps {
  price?: number;
  priceRange?: {
    min: number;
    max: number;
  };
  originalPrice?: number;
  currency?: string;
  variant?: 'default' | 'large' | 'compact' | 'overlay';
  showTrend?: boolean;
  trend?: 'up' | 'down' | 'stable';
  trendPercentage?: number;
  showNegotiable?: boolean;
  isNegotiable?: boolean;
  className?: string;
}

export default function PriceTag({
  price,
  priceRange,
  originalPrice,
  currency = 'USD',
  variant = 'default',
  showTrend = false,
  trend,
  trendPercentage,
  showNegotiable = false,
  isNegotiable = false,
  className = ''
}: PriceTagProps) {
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getDiscountPercentage = () => {
    if (!originalPrice || !price) return null;
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-3 h-3 text-green-600" />;
      case 'down':
        return <TrendingDown className="w-3 h-3 text-red-600" />;
      case 'stable':
        return <Minus className="w-3 h-3 text-gray-600" />;
      default:
        return null;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      case 'stable':
        return 'text-gray-600';
      default:
        return 'text-gray-600';
    }
  };

  const renderPriceContent = () => {
    if (priceRange) {
      return (
        <div className="flex flex-col">
          <span className={`font-bold ${variant === 'large' ? 'text-2xl' : variant === 'compact' ? 'text-sm' : 'text-lg'} text-forest-green`}>
            {formatPrice(priceRange.min)} - {formatPrice(priceRange.max)}
          </span>
          {isNegotiable && showNegotiable && (
            <span className="text-xs text-warm-gold">Price negotiable</span>
          )}
        </div>
      );
    }

    if (price !== undefined) {
      return (
        <div className="flex flex-col">
          <div className="flex items-center space-x-2">
            <span className={`font-bold ${variant === 'large' ? 'text-2xl' : variant === 'compact' ? 'text-sm' : 'text-lg'} text-forest-green`}>
              {formatPrice(price)}
            </span>
            {originalPrice && originalPrice > price && (
              <span className={`text-gray-500 line-through ${variant === 'large' ? 'text-lg' : variant === 'compact' ? 'text-xs' : 'text-sm'}`}>
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>

          <div className="flex items-center space-x-2 mt-1">
            {originalPrice && originalPrice > price && (
              <Badge className="bg-red-500 text-white text-xs px-1 py-0.5">
                {getDiscountPercentage()}% OFF
              </Badge>
            )}

            {showTrend && trend && trendPercentage && (
              <div className={`flex items-center space-x-1 text-xs ${getTrendColor()}`}>
                {getTrendIcon()}
                <span>{trendPercentage}%</span>
              </div>
            )}

            {isNegotiable && showNegotiable && (
              <Badge variant="outline" className="text-xs px-2 py-0.5 border-warm-gold text-warm-gold">
                Negotiable
              </Badge>
            )}
          </div>
        </div>
      );
    }

    return (
      <span className={`font-semibold ${variant === 'large' ? 'text-xl' : 'text-base'} text-gray-500`}>
        Price on request
      </span>
    );
  };

  const baseClasses = {
    default: 'inline-flex flex-col bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200',
    large: 'inline-flex flex-col bg-white px-6 py-4 rounded-xl shadow-md border border-gray-200',
    compact: 'inline-flex flex-col bg-white px-2 py-1 rounded-md text-sm',
    overlay: 'inline-flex flex-col bg-forest-green text-cream px-3 py-2 rounded-full shadow-lg backdrop-blur-sm'
  };

  return (
    <div className={`${baseClasses[variant]} ${className}`}>
      {renderPriceContent()}
    </div>
  );
}