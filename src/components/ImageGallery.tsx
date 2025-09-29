'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X, ZoomIn, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface ImageGalleryProps {
  images: {
    id: string;
    url: string;
    alt: string;
    title?: string;
  }[];
  className?: string;
}

export default function ImageGallery({ images, className = '' }: ImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);

  const handlePrevious = () => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setSelectedImageIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const openFullscreen = (index?: number) => {
    if (index !== undefined) {
      setSelectedImageIndex(index);
    }
    setIsFullscreenOpen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreenOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      handlePrevious();
    } else if (e.key === 'ArrowRight') {
      handleNext();
    } else if (e.key === 'Escape') {
      closeFullscreen();
    }
  };

  const downloadImage = async (imageUrl: string, filename: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename || 'image.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  if (!images || images.length === 0) {
    return (
      <div className={`aspect-square bg-gray-200 rounded-lg flex items-center justify-center ${className}`}>
        <div className="text-gray-500">No images available</div>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Main Image */}
      <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 group">
        {isImageLoading && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
          </div>
        )}
        <Image
          src={images[selectedImageIndex].url}
          alt={images[selectedImageIndex].alt}
          fill
          className={`object-cover transition-all duration-300 ${
            isImageLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoadingComplete={() => setIsImageLoading(false)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="sm"
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full w-8 h-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={handlePrevious}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full w-8 h-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={handleNext}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </>
        )}

        {/* Action Buttons */}
        <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="sm"
            className="bg-white/80 hover:bg-white text-gray-800 rounded-full w-8 h-8 p-0"
            onClick={() => openFullscreen()}
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="bg-white/80 hover:bg-white text-gray-800 rounded-full w-8 h-8 p-0"
            onClick={() => downloadImage(
              images[selectedImageIndex].url,
              `${images[selectedImageIndex].title || 'image'}.jpg`
            )}
          >
            <Download className="w-4 h-4" />
          </Button>
        </div>

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
            {selectedImageIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={image.id}
              className={`relative flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                index === selectedImageIndex
                  ? 'border-warm-gold shadow-md'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedImageIndex(index)}
            >
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Modal */}
      {isFullscreenOpen && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeFullscreen}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="dialog"
          aria-modal="true"
        >
          {/* Close Button */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full w-10 h-10 p-0 z-10"
            onClick={closeFullscreen}
          >
            <X className="w-5 h-5" />
          </Button>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 rounded-full w-10 h-10 p-0 z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevious();
                }}
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 rounded-full w-10 h-10 p-0 z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </>
          )}

          {/* Download Button */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-4 right-16 text-white hover:bg-white/20 rounded-full w-10 h-10 p-0 z-10"
            onClick={(e) => {
              e.stopPropagation();
              downloadImage(
                images[selectedImageIndex].url,
                `${images[selectedImageIndex].title || 'image'}.jpg`
              );
            }}
          >
            <Download className="w-5 h-5" />
          </Button>

          {/* Main Image */}
          <div
            className="relative max-w-full max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[selectedImageIndex].url}
              alt={images[selectedImageIndex].alt}
              width={1200}
              height={800}
              className="max-w-full max-h-full object-contain"
              priority
            />
          </div>

          {/* Image Info */}
          <div className="absolute bottom-4 left-4 right-4 text-white text-center">
            <div className="bg-black/50 rounded-lg p-4 backdrop-blur-sm">
              {images[selectedImageIndex].title && (
                <h3 className="font-semibold text-lg mb-1">
                  {images[selectedImageIndex].title}
                </h3>
              )}
              <p className="text-sm text-white/80">
                {selectedImageIndex + 1} of {images.length}
              </p>
            </div>
          </div>

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-2 bg-black/50 rounded-lg p-2 backdrop-blur-sm">
              {images.map((image, index) => (
                <button
                  key={image.id}
                  className={`relative w-12 h-12 rounded-md overflow-hidden border-2 transition-all ${
                    index === selectedImageIndex
                      ? 'border-warm-gold'
                      : 'border-white/30 hover:border-white/60'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImageIndex(index);
                  }}
                >
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}