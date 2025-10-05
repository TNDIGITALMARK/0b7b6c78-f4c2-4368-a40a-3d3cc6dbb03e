'use client';

import Link from 'next/link';
import { ArrowRight, Shield, Heart, Award, Star, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden red-gradient text-white pt-24 pb-24 md:pt-32 md:pb-32 lg:pt-40 lg:pb-40">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute top-0 -left-4 w-96 h-96 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 -right-4 w-96 h-96 bg-red-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/20">
              <Sparkles className="w-4 h-4 text-warm-gold" />
              <span className="text-sm font-semibold text-white">Premium Exotic Cats Marketplace</span>
            </div>

            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              DISCOVER YOUR<br />
              <span className="bg-gradient-to-r from-yellow-300 via-orange-200 to-pink-200 bg-clip-text text-transparent">
                EXOTIC COMPANION
              </span>
            </h1>

            <p className="text-xl md:text-2xl mb-10 text-white/90 font-light max-w-2xl mx-auto leading-relaxed">
              Connect with verified luxury breeders and find your perfect exotic cat. Ethical breeding, premium quality, lifelong joy.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/browse">
                <Button
                  size="lg"
                  className="bg-white text-vibrant-red hover:bg-cream font-bold px-10 py-7 text-lg rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 group"
                >
                  BROWSE EXOTIC CATS
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/breeds">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm font-semibold px-10 py-7 text-lg rounded-full transition-all duration-300"
                >
                  EXPLORE BREEDS
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-16 flex flex-wrap justify-center gap-8 text-white/80">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-warm-gold" />
                <span className="text-sm font-medium">Verified Breeders</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-warm-gold" />
                <span className="text-sm font-medium">Health Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-warm-gold" />
                <span className="text-sm font-medium">Ethical Breeding</span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-16 md:h-24 fill-current text-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-2 bg-red-50 rounded-full">
              <span className="text-vibrant-red text-sm font-bold">WHY EXOTIC PAWS</span>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              The Premium Choice for<br />Exotic Cat Enthusiasts
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We connect you with the world's most reputable exotic cat breeders, ensuring quality, health, and ethical practices every step of the way.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Shield,
                title: 'Verified Breeders',
                description: 'Every breeder in our network is thoroughly vetted and certified. We ensure they meet the highest standards of care and ethical breeding practices.',
                color: 'red'
              },
              {
                icon: Award,
                title: 'Health Guarantee',
                description: 'All cats come with comprehensive health certifications and genetic testing. Your peace of mind is our priority.',
                color: 'orange'
              },
              {
                icon: Heart,
                title: 'Lifelong Support',
                description: 'From selection to bringing your cat home and beyond, our team provides ongoing guidance and support for your exotic companion.',
                color: 'pink'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-red-100"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color === 'red' ? 'from-red-500 to-red-600' : feature.color === 'orange' ? 'from-orange-500 to-orange-600' : 'from-pink-500 to-pink-600'} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Breeds Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-2 bg-white rounded-full shadow-sm">
              <span className="text-vibrant-red text-sm font-bold">POPULAR BREEDS</span>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Explore Exotic Breeds
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              From majestic Savannahs to striking Bengals, discover the perfect exotic cat breed for your lifestyle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {[
              { name: 'Savannah', price: '$10,000 - $25,000', trait: 'Energetic & Loyal' },
              { name: 'Bengal', price: '$2,000 - $10,000', trait: 'Playful & Athletic' },
              { name: 'Maine Coon', price: '$1,500 - $4,000', trait: 'Gentle Giant' },
              { name: 'Sphynx', price: '$3,000 - $6,000', trait: 'Affectionate & Unique' }
            ].map((breed, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <div className="h-48 bg-gradient-to-br from-red-400 to-orange-400 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-xs font-bold text-vibrant-red">{breed.trait}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-2xl font-bold text-gray-900 mb-2">{breed.name}</h3>
                  <p className="text-vibrant-red font-semibold mb-4">{breed.price}</p>
                  <Link href="/breeds">
                    <Button
                      variant="outline"
                      className="w-full border-red-300 text-vibrant-red hover:bg-red-50 group-hover:bg-vibrant-red group-hover:text-white transition-all"
                    >
                      Learn More
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/breeds">
              <Button
                size="lg"
                className="red-gradient text-white font-bold px-8 py-6 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
              >
                VIEW ALL BREEDS
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-2 bg-red-50 rounded-full">
              <span className="text-vibrant-red text-sm font-bold">SIMPLE PROCESS</span>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How It Works
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Finding your perfect exotic companion is easy with our streamlined process.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: '01', title: 'Browse', description: 'Explore our collection of exotic cats from verified breeders' },
                { step: '02', title: 'Connect', description: 'Reach out to breeders and ask questions about your chosen cat' },
                { step: '03', title: 'Visit', description: 'Arrange a visit to meet your potential new companion' },
                { step: '04', title: 'Adopt', description: 'Complete the adoption and bring your exotic cat home' }
              ].map((step, index) => (
                <div key={index} className="relative">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 text-white rounded-full font-bold text-xl mb-4 shadow-lg">
                      {step.step}
                    </div>
                    <h3 className="font-heading text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </div>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-8 -right-4 w-8 h-0.5 bg-gradient-to-r from-red-300 to-orange-300"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-red-50 via-orange-50 to-pink-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-2 bg-white rounded-full shadow-sm">
              <span className="text-vibrant-red text-sm font-bold">TESTIMONIALS</span>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Our Customers Say
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Hear from happy owners who found their perfect exotic companions through Exotic Paws.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: 'Sarah Mitchell',
                location: 'California',
                text: 'Found my perfect Bengal through Exotic Paws. The breeder was amazing and the whole process was seamless. Could not be happier!',
                rating: 5
              },
              {
                name: 'Michael Rodriguez',
                location: 'Texas',
                text: 'My Savannah cat is absolutely incredible. The health guarantee and ongoing support gave me complete peace of mind throughout the process.',
                rating: 5
              },
              {
                name: 'Jennifer Kim',
                location: 'New York',
                text: 'The verification process ensures you get quality cats from reputable breeders. Best decision I ever made was using Exotic Paws.',
                rating: 5
              }
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center mb-2">
                  {Array.from({ length: testimonial.rating }, (_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="red-gradient rounded-3xl p-12 md:p-16 text-center text-white shadow-2xl max-w-4xl mx-auto">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              Ready to Find Your<br />Perfect Companion?
            </h2>
            <p className="text-xl mb-10 text-white/90 max-w-2xl mx-auto">
              Join thousands of satisfied exotic cat owners who found their perfect match through our verified breeder network.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/browse">
                <Button
                  size="lg"
                  className="bg-white text-vibrant-red hover:bg-cream font-bold px-10 py-7 text-lg rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all group"
                >
                  START BROWSING
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm font-semibold px-10 py-7 text-lg rounded-full"
                >
                  CONTACT US
                </Button>
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mt-12 pt-8 border-t border-white/20 flex flex-wrap justify-center gap-8 text-white/80">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-sm">100+ Verified Breeders</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-sm">1000+ Happy Families</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-sm">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
