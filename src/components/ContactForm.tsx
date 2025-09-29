'use client';

import { useState } from 'react';
import { Send, Phone, Mail, MessageCircle, User, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';

export interface ContactFormProps {
  catName?: string;
  breederId?: string;
  breederName?: string;
  breederEmail?: string;
  breederPhone?: string;
  variant?: 'full' | 'compact' | 'modal';
  onSubmit?: (data: ContactFormData) => void;
  onClose?: () => void;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  location?: string;
  inquiryType: string;
  message: string;
  preferredContact: string;
  agreedToTerms: boolean;
  catName?: string;
  breederId?: string;
}

export default function ContactForm({
  catName,
  breederId,
  breederName,
  breederEmail,
  breederPhone,
  variant = 'full',
  onSubmit,
  onClose
}: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    location: '',
    inquiryType: 'general',
    message: '',
    preferredContact: 'email',
    agreedToTerms: false,
    catName,
    breederId
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'availability', label: 'Cat Availability' },
    { value: 'pricing', label: 'Pricing Information' },
    { value: 'visit', label: 'Schedule Visit' },
    { value: 'health', label: 'Health & Genetics' },
    { value: 'shipping', label: 'Shipping & Delivery' },
    { value: 'care', label: 'Care Instructions' }
  ];

  const contactPreferences = [
    { value: 'email', label: 'Email', icon: Mail },
    { value: 'phone', label: 'Phone Call', icon: Phone },
    { value: 'text', label: 'Text Message', icon: MessageCircle }
  ];

  const handleInputChange = (
    field: keyof ContactFormData,
    value: string | boolean
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (onSubmit) {
        onSubmit(formData);
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    return (
      formData.name.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.message.trim() !== '' &&
      formData.agreedToTerms
    );
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-8 space-y-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <Send className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="font-heading text-xl font-semibold text-forest-green">
          Message Sent Successfully!
        </h3>
        <p className="text-gray-600">
          {breederName} will get back to you within 24 hours.
        </p>
        {variant === 'modal' && (
          <Button onClick={onClose} className="bg-forest-green hover:bg-forest-green-dark text-cream">
            Close
          </Button>
        )}
      </div>
    );
  }

  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      {variant !== 'compact' && (
        <div className="space-y-2">
          <h3 className="font-heading text-xl font-semibold text-forest-green">
            Contact {breederName || 'Breeder'}
          </h3>
          {catName && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Inquiring about:</span>
              <Badge className="bg-warm-gold text-forest-green">{catName}</Badge>
            </div>
          )}
        </div>
      )}

      {/* Breeder Contact Info */}
      {variant === 'full' && (breederEmail || breederPhone) && (
        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
          <h4 className="font-medium text-gray-700">Direct Contact:</h4>
          <div className="flex flex-wrap gap-4 text-sm">
            {breederEmail && (
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-500" />
                <a href={`mailto:${breederEmail}`} className="text-warm-gold hover:underline">
                  {breederEmail}
                </a>
              </div>
            )}
            {breederPhone && (
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gray-500" />
                <a href={`tel:${breederPhone}`} className="text-warm-gold hover:underline">
                  {breederPhone}
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Personal Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-forest-green">
            Full Name *
          </Label>
          <div className="relative">
            <User className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="pl-10"
              placeholder="Your full name"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-forest-green">
            Email Address *
          </Label>
          <div className="relative">
            <Mail className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="pl-10"
              placeholder="your.email@example.com"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-forest-green">
            Phone Number
          </Label>
          <div className="relative">
            <Phone className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="pl-10"
              placeholder="(555) 123-4567"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location" className="text-forest-green">
            Location
          </Label>
          <div className="relative">
            <MapPin className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <Input
              id="location"
              type="text"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="pl-10"
              placeholder="City, State"
            />
          </div>
        </div>
      </div>

      {/* Inquiry Type */}
      <div className="space-y-2">
        <Label htmlFor="inquiryType" className="text-forest-green">
          Inquiry Type
        </Label>
        <Select
          value={formData.inquiryType}
          onValueChange={(value) => handleInputChange('inquiryType', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select inquiry type" />
          </SelectTrigger>
          <SelectContent>
            {inquiryTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Preferred Contact Method */}
      <div className="space-y-2">
        <Label className="text-forest-green">Preferred Contact Method</Label>
        <div className="flex flex-wrap gap-3">
          {contactPreferences.map((pref) => {
            const IconComponent = pref.icon;
            return (
              <button
                key={pref.value}
                type="button"
                onClick={() => handleInputChange('preferredContact', pref.value)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md border transition-colors ${
                  formData.preferredContact === pref.value
                    ? 'bg-warm-gold border-warm-gold text-forest-green'
                    : 'bg-white border-gray-300 text-gray-700 hover:border-warm-gold'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span className="text-sm">{pref.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <Label htmlFor="message" className="text-forest-green">
          Message *
        </Label>
        <Textarea
          id="message"
          value={formData.message}
          onChange={(e) => handleInputChange('message', e.target.value)}
          placeholder={
            catName
              ? `Hi ${breederName || 'there'}, I'm interested in ${catName}. Could you please provide more information about availability, pricing, and any additional details?`
              : `Hi ${breederName || 'there'}, I'm interested in learning more about your available cats. Could you please provide information about current availability and pricing?`
          }
          rows={4}
          className="resize-none"
          required
        />
      </div>

      {/* Terms Agreement */}
      <div className="flex items-start space-x-2">
        <Checkbox
          id="terms"
          checked={formData.agreedToTerms}
          onCheckedChange={(checked) => handleInputChange('agreedToTerms', checked as boolean)}
        />
        <Label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
          I agree to the terms and conditions and consent to having my contact information
          shared with the breeder for the purpose of this inquiry.
        </Label>
      </div>

      {/* Submit Button */}
      <div className="flex space-x-3">
        <Button
          type="submit"
          disabled={!isFormValid() || isSubmitting}
          className="flex-1 bg-forest-green hover:bg-forest-green-dark text-cream"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-cream border-t-transparent rounded-full animate-spin mr-2" />
              Sending...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </>
          )}
        </Button>
        {variant === 'modal' && (
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );

  if (variant === 'compact') {
    return <div className="max-w-md">{formContent}</div>;
  }

  if (variant === 'modal') {
    return (
      <div className="max-w-2xl mx-auto">
        {formContent}
      </div>
    );
  }

  return (
    <div className="max-w-2xl bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {formContent}
    </div>
  );
}