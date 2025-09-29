'use client';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft, Heart, Share2, Phone, Mail, MessageCircle, Shield, Award, MapPin, Clock, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ImageGallery from '@/components/ImageGallery';
import ContactForm from '@/components/ContactForm';
import BreederBadge from '@/components/BreederBadge';
import PriceTag from '@/components/PriceTag';
import { getCatById, getBreederByName } from '@/lib/mockData';

interface CatDetailPageProps {
  params: {
    id: string;
  };
}

export default function CatDetailPage({ params }: CatDetailPageProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const cat = getCatById(params.id);
  if (!cat) {
    notFound();
  }

  const breeder = getBreederByName(cat.breeder.name);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${cat.name} - ${cat.breed}`,
          text: `Check out this beautiful ${cat.breed} available from ${cat.breeder.name}`,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      } catch (error) {
        console.error('Error copying to clipboard:', error);
      }
    }
  };

  const getAvailabilityColor = (status: string) => {
    switch (status) {
      case 'Available':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Reserved':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Sold':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const renderCharacteristicBar = (level: number, max: number = 5) => (
    <div className="flex items-center space-x-2">
      <div className="flex space-x-1">
        {Array.from({ length: max }, (_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full ${
              i < level ? 'bg-warm-gold' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
      <span className="text-sm text-gray-600">{level}/{max}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-cream">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb and Actions */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-warm-gold">
              Browse
            </Link>
            <span>/</span>
            <Link href={`/?breed=${cat.breed}`} className="hover:text-warm-gold">
              {cat.breed}
            </Link>
            <span>/</span>
            <span className="text-forest-green">{cat.name}</span>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button
              variant={isFavorite ? 'default' : 'outline'}
              size="sm"
              onClick={() => setIsFavorite(!isFavorite)}
              className={isFavorite ? 'bg-red-500 hover:bg-red-600' : ''}
            >
              <Heart className={`w-4 h-4 mr-2 ${isFavorite ? 'fill-current' : ''}`} />
              {isFavorite ? 'Favorited' : 'Add to Favorites'}
            </Button>
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Gallery */}
          <div className="lg:col-span-2">
            <ImageGallery images={cat.images} />
          </div>

          {/* Right Column - Cat Info and Actions */}
          <div className="space-y-6">
            {/* Basic Info Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="font-heading text-3xl font-bold text-forest-green mb-2">
                    {cat.name}
                  </h1>
                  <p className="text-xl text-gray-700 mb-2">{cat.breed}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{cat.age}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span>♂♀</span>
                      <span>{cat.gender}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{cat.location}</span>
                    </div>
                  </div>
                </div>
                <Badge className={`${getAvailabilityColor(cat.availability)} border`}>
                  {cat.availability}
                </Badge>
              </div>

              {/* Price */}
              <div className="mb-6">
                <PriceTag
                  price={cat.price}
                  priceRange={cat.priceRange}
                  variant="large"
                  showNegotiable={true}
                  isNegotiable={true}
                />
              </div>

              {/* Features */}
              <div className="mb-6">
                <h3 className="font-semibold text-forest-green mb-3">Special Features</h3>
                <div className="flex flex-wrap gap-2">
                  {cat.features.map((feature, index) => (
                    <Badge key={index} variant="outline" className="border-forest-green/30 text-forest-green">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Contact Actions */}
              <div className="space-y-3">
                <Dialog open={isContactModalOpen} onOpenChange={setIsContactModalOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-forest-green hover:bg-forest-green-dark text-cream" size="lg">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Contact Breeder
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <ContactForm
                      catName={cat.name}
                      breederId={breeder?.id}
                      breederName={cat.breeder.name}
                      breederEmail={breeder?.email}
                      breederPhone={breeder?.phone}
                      variant="modal"
                      onClose={() => setIsContactModalOpen(false)}
                    />
                  </DialogContent>
                </Dialog>

                <div className="grid grid-cols-2 gap-2">
                  {breeder?.phone && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={`tel:${breeder.phone}`}>
                        <Phone className="w-4 h-4 mr-2" />
                        Call
                      </a>
                    </Button>
                  )}
                  {breeder?.email && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={`mailto:${breeder.email}`}>
                        <Mail className="w-4 h-4 mr-2" />
                        Email
                      </a>
                    </Button>
                  )}
                </div>
              </div>

              {/* Posted Date */}
              <div className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-500">
                Posted {cat.postedDate}
              </div>
            </div>

            {/* Breeder Info */}
            {breeder && (
              <BreederBadge
                {...breeder}
                variant="full"
              />
            )}
          </div>
        </div>

        {/* Detailed Information Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-4 h-auto">
              <TabsTrigger value="description" className="data-[state=active]:bg-warm-gold data-[state=active]:text-forest-green">
                Description
              </TabsTrigger>
              <TabsTrigger value="characteristics" className="data-[state=active]:bg-warm-gold data-[state=active]:text-forest-green">
                Characteristics
              </TabsTrigger>
              <TabsTrigger value="pedigree" className="data-[state=active]:bg-warm-gold data-[state=active]:text-forest-green">
                Pedigree
              </TabsTrigger>
              <TabsTrigger value="health" className="data-[state=active]:bg-warm-gold data-[state=active]:text-forest-green">
                Health
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-heading text-xl font-semibold text-forest-green mb-4">About {cat.name}</h3>
                <p className="text-gray-700 leading-relaxed mb-6">{cat.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-forest-green mb-3">Quick Facts</h4>
                    <dl className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Origin:</dt>
                        <dd className="font-medium">{cat.characteristics.origin}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Lifespan:</dt>
                        <dd className="font-medium">{cat.characteristics.lifespan}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Weight:</dt>
                        <dd className="font-medium">{cat.characteristics.weight}</dd>
                      </div>
                    </dl>
                  </div>

                  <div>
                    <h4 className="font-semibold text-forest-green mb-3">Temperament</h4>
                    <div className="flex flex-wrap gap-2">
                      {cat.characteristics.temperament.map((trait, index) => (
                        <Badge key={index} variant="outline" className="border-warm-gold/30 text-warm-gold">
                          {trait}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="characteristics" className="mt-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-heading text-xl font-semibold text-forest-green mb-6">Breed Characteristics</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-700">Energy Level</span>
                      </div>
                      {renderCharacteristicBar(cat.characteristics.energyLevel)}
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-700">Grooming Needs</span>
                      </div>
                      {renderCharacteristicBar(cat.characteristics.groomingNeeds)}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-forest-green mb-3">Health Considerations</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      {cat.characteristics.healthIssues.map((issue, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <Shield className="w-4 h-4 text-warm-gold mt-0.5 flex-shrink-0" />
                          <span>{issue}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="pedigree" className="mt-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-heading text-xl font-semibold text-forest-green mb-6">Pedigree Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {cat.parents.sire && (
                    <div>
                      <h4 className="font-semibold text-forest-green mb-4 flex items-center">
                        <Award className="w-5 h-5 mr-2 text-warm-gold" />
                        Sire (Father)
                      </h4>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h5 className="font-medium text-lg mb-2">{cat.parents.sire.name}</h5>
                        <p className="text-sm text-gray-600 mb-3">Registration: {cat.parents.sire.registration}</p>
                        <div className="space-y-2">
                          <h6 className="font-medium text-sm">Awards & Titles:</h6>
                          <div className="flex flex-wrap gap-1">
                            {cat.parents.sire.awards.map((award, index) => (
                              <Badge key={index} className="bg-warm-gold text-forest-green text-xs">
                                {award}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {cat.parents.dam && (
                    <div>
                      <h4 className="font-semibold text-forest-green mb-4 flex items-center">
                        <Award className="w-5 h-5 mr-2 text-warm-gold" />
                        Dam (Mother)
                      </h4>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h5 className="font-medium text-lg mb-2">{cat.parents.dam.name}</h5>
                        <p className="text-sm text-gray-600 mb-3">Registration: {cat.parents.dam.registration}</p>
                        <div className="space-y-2">
                          <h6 className="font-medium text-sm">Awards & Titles:</h6>
                          <div className="flex flex-wrap gap-1">
                            {cat.parents.dam.awards.map((award, index) => (
                              <Badge key={index} className="bg-warm-gold text-forest-green text-xs">
                                {award}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="health" className="mt-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-heading text-xl font-semibold text-forest-green mb-6">Health Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-forest-green mb-4 flex items-center">
                      <Shield className="w-5 h-5 mr-2 text-warm-gold" />
                      Vaccinations
                    </h4>
                    <ul className="space-y-2">
                      {cat.health.vaccinations.map((vaccination, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-gray-700">{vaccination}</span>
                        </li>
                      ))}
                    </ul>

                    <h4 className="font-semibold text-forest-green mb-4 mt-6 flex items-center">
                      <Award className="w-5 h-5 mr-2 text-warm-gold" />
                      Health Tests
                    </h4>
                    <ul className="space-y-2">
                      {cat.health.healthTests.map((test, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-gray-700">{test}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-forest-green mb-4">Health Guarantee</h4>
                    <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                      <p className="text-green-800 font-medium mb-2">✓ {cat.health.healthGuarantee}</p>
                      <p className="text-sm text-green-700">
                        This cat comes with our comprehensive health guarantee and complete veterinary records.
                      </p>
                    </div>

                    <div className="mt-6 flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>Veterinary records available: {cat.health.vetRecords ? 'Yes' : 'No'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
}