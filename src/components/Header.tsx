'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Search, Menu, X, Heart, ShoppingCart, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="bg-forest-green shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-warm-gold rounded-full flex items-center justify-center">
              <span className="text-forest-green font-bold text-sm">EP</span>
            </div>
            <span className="font-heading text-xl font-bold text-white">
              EXOTIC PAWS
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/browse"
              className="text-cream hover:text-warm-gold transition-colors font-medium"
            >
              BROWSE CATS
            </Link>
            <Link
              href="/breeds"
              className="text-cream hover:text-warm-gold transition-colors font-medium"
            >
              LUXURY CATS
            </Link>
            <Link
              href="/breeders"
              className="text-cream hover:text-warm-gold transition-colors font-medium"
            >
              OUR BREEDERS
            </Link>
            <Link
              href="/about"
              className="text-cream hover:text-warm-gold transition-colors font-medium"
            >
              ABOUT US
            </Link>
            <Link
              href="/contact"
              className="text-cream hover:text-warm-gold transition-colors font-medium"
            >
              CONTACT
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center bg-white/10 rounded-full px-4 py-2 min-w-[300px]">
            <Search className="w-4 h-4 text-cream mr-2" />
            <Input
              type="text"
              placeholder="Search exotic cats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none text-cream placeholder:text-cream/70 focus:ring-0 focus:outline-none"
            />
          </div>

          {/* Action Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-cream hover:text-warm-gold hover:bg-white/10">
              <Heart className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="text-cream hover:text-warm-gold hover:bg-white/10">
              <ShoppingCart className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="text-cream hover:text-warm-gold hover:bg-white/10">
              <User className="w-5 h-5" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-cream"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-forest-green-light border-t border-white/20">
            <div className="px-4 py-6 space-y-4">
              {/* Mobile Search */}
              <div className="flex items-center bg-white/10 rounded-full px-4 py-2">
                <Search className="w-4 h-4 text-cream mr-2" />
                <Input
                  type="text"
                  placeholder="Search exotic cats..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none text-cream placeholder:text-cream/70 focus:ring-0 focus:outline-none"
                />
              </div>

              {/* Mobile Navigation Links */}
              <nav className="space-y-3">
                <Link
                  href="/browse"
                  className="block text-cream hover:text-warm-gold transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  BROWSE CATS
                </Link>
                <Link
                  href="/breeds"
                  className="block text-cream hover:text-warm-gold transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  LUXURY CATS
                </Link>
                <Link
                  href="/breeders"
                  className="block text-cream hover:text-warm-gold transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  OUR BREEDERS
                </Link>
                <Link
                  href="/about"
                  className="block text-cream hover:text-warm-gold transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  ABOUT US
                </Link>
                <Link
                  href="/contact"
                  className="block text-cream hover:text-warm-gold transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  CONTACT
                </Link>
              </nav>

              {/* Mobile Action Buttons */}
              <div className="flex items-center space-x-4 pt-4 border-t border-white/20">
                <Button variant="ghost" size="sm" className="text-cream hover:text-warm-gold hover:bg-white/10">
                  <Heart className="w-5 h-5 mr-2" />
                  Favorites
                </Button>
                <Button variant="ghost" size="sm" className="text-cream hover:text-warm-gold hover:bg-white/10">
                  <User className="w-5 h-5 mr-2" />
                  Account
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}