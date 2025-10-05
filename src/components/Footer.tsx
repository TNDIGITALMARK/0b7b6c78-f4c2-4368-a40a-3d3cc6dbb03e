'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-forest-green text-cream">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-warm-gold rounded-full flex items-center justify-center">
                <span className="text-forest-green font-bold text-sm">EP</span>
              </div>
              <span className="font-heading text-xl font-bold">EXOTIC PAWS</span>
            </div>
            <p className="text-cream/80 text-sm leading-relaxed">
              Discover your exotic companion through our network of verified luxury breeders.
              Premium breeding, unmatched quality.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-cream/60 hover:text-warm-gold transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-cream/60 hover:text-warm-gold transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-cream/60 hover:text-warm-gold transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-cream/60 hover:text-warm-gold transition-colors">
                <Youtube className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-heading text-lg font-semibold text-warm-gold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/browse" className="text-cream/80 hover:text-warm-gold transition-colors text-sm">
                  Browse Exotic Cats
                </Link>
              </li>
              <li>
                <Link href="/breeds" className="text-cream/80 hover:text-warm-gold transition-colors text-sm">
                  Luxury Breeds
                </Link>
              </li>
              <li>
                <Link href="/breeders" className="text-cream/80 hover:text-warm-gold transition-colors text-sm">
                  Our Breeders
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-cream/80 hover:text-warm-gold transition-colors text-sm">
                  Breeder Dashboard
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-cream/80 hover:text-warm-gold transition-colors text-sm">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div className="space-y-4">
            <h3 className="font-heading text-lg font-semibold text-warm-gold">Customer Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-cream/80 hover:text-warm-gold transition-colors text-sm">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-cream/80 hover:text-warm-gold transition-colors text-sm">
                  Shipping Information
                </Link>
              </li>
              <li>
                <Link href="/care-guide" className="text-cream/80 hover:text-warm-gold transition-colors text-sm">
                  Cat Care Guide
                </Link>
              </li>
              <li>
                <Link href="/health-guarantee" className="text-cream/80 hover:text-warm-gold transition-colors text-sm">
                  Health Guarantee
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-cream/80 hover:text-warm-gold transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="font-heading text-lg font-semibold text-warm-gold">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-warm-gold" />
                <span className="text-cream/80 text-sm">hello@exoticpaws.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-warm-gold" />
                <span className="text-cream/80 text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-warm-gold mt-0.5" />
                <span className="text-cream/80 text-sm leading-relaxed">
                  123 Luxury Lane<br />
                  Premium District, CA 90210
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            {/* Copyright */}
            <div className="text-cream/60 text-sm">
              © {new Date().getFullYear()} Exotic Paws. All rights reserved.
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center lg:justify-end space-x-6">
              <Link href="/privacy" className="text-cream/60 hover:text-warm-gold transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-cream/60 hover:text-warm-gold transition-colors text-sm">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-cream/60 hover:text-warm-gold transition-colors text-sm">
                Cookie Policy
              </Link>
            </div>
          </div>

          {/* Ready to Find Yours Section */}
          <div className="text-center mt-8 pt-6 border-t border-white/20">
            <h2 className="font-heading text-2xl font-bold text-warm-gold mb-2">
              READY TO FIND YOURS?
            </h2>
            <p className="text-cream/80 text-sm mb-4">
              Discover your perfect exotic companion through our exclusive breeder network
            </p>
            <div className="flex justify-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-warm-gold flex items-center justify-center">
                  <span className="text-forest-green text-xs font-bold">✓</span>
                </div>
                <span className="text-cream/80 text-sm">Verified Breeders</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-warm-gold flex items-center justify-center">
                  <span className="text-forest-green text-xs font-bold">✓</span>
                </div>
                <span className="text-cream/80 text-sm">Health Guarantee</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-warm-gold flex items-center justify-center">
                  <span className="text-forest-green text-xs font-bold">✓</span>
                </div>
                <span className="text-cream/80 text-sm">Premium Quality</span>
              </div>
            </div>
          </div>

          {/* Simple Copyright Footer */}
          <div className="text-center mt-6 pt-6 border-t border-white/20">
            <p className="text-warm-gold text-xs">
              © 2024 Exotic Paws Boutique. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}