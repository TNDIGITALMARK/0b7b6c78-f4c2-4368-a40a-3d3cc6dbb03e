import { CatCardProps } from '@/components/CatCard';

export interface ExoticCat extends Omit<CatCardProps, 'onFavoriteToggle'> {
  description: string;
  characteristics: {
    temperament: string[];
    energyLevel: number; // 1-5
    groomingNeeds: number; // 1-5
    healthIssues: string[];
    lifespan: string;
    weight: string;
    origin: string;
  };
  parents: {
    sire?: {
      name: string;
      registration: string;
      awards: string[];
    };
    dam?: {
      name: string;
      registration: string;
      awards: string[];
    };
  };
  health: {
    vaccinations: string[];
    healthTests: string[];
    healthGuarantee: string;
    vetRecords: boolean;
  };
  images: {
    id: string;
    url: string;
    alt: string;
    title?: string;
  }[];
}

export const mockCats: ExoticCat[] = [
  {
    id: 'bengal-001',
    name: 'Zara',
    breed: 'Bengal Cat',
    price: 3500,
    image: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=800',
    age: '4 months',
    gender: 'Female',
    location: 'Los Angeles, CA',
    breeder: {
      name: 'Golden Bengal Cattery',
      verified: true,
      rating: 4.9
    },
    features: ['Show Quality', 'Champion Bloodline', 'Health Tested', 'Vaccinated'],
    availability: 'Available',
    postedDate: '2 days ago',
    description: 'Zara is a stunning Bengal kitten with exceptional rosette patterns and a loving temperament. She comes from champion bloodlines and has been health tested for all common Bengal health issues. Her beautiful golden coat with distinct black rosettes makes her perfect for both showing and as a beloved family pet.',
    characteristics: {
      temperament: ['Active', 'Playful', 'Intelligent', 'Affectionate'],
      energyLevel: 5,
      groomingNeeds: 2,
      healthIssues: ['Hip Dysplasia (rare)', 'PRA (tested clear)'],
      lifespan: '12-16 years',
      weight: '8-15 lbs',
      origin: 'United States'
    },
    parents: {
      sire: {
        name: 'GoldenPaws Thunder',
        registration: 'TICA-012345',
        awards: ['Best Bengal 2023', 'Regional Winner']
      },
      dam: {
        name: 'Spotted Dreams Luna',
        registration: 'TICA-067890',
        awards: ['Champion Status', 'Best Female 2022']
      }
    },
    health: {
      vaccinations: ['FVRCP', 'Rabies', 'FeLV'],
      healthTests: ['PRA Clear', 'HCM Clear', 'PKD Clear'],
      healthGuarantee: '2 year genetic health guarantee',
      vetRecords: true
    },
    images: [
      {
        id: '1',
        url: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=800',
        alt: 'Zara - Bengal Cat',
        title: 'Zara Portrait'
      },
      {
        id: '2',
        url: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=800',
        alt: 'Zara Playing',
        title: 'Zara at Play'
      },
      {
        id: '3',
        url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800',
        alt: 'Zara Close-up',
        title: 'Beautiful Rosette Pattern'
      }
    ]
  },
  {
    id: 'savannah-001',
    name: 'Aspen',
    breed: 'Savannah Cat',
    price: 8500,
    image: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=800',
    age: '6 months',
    gender: 'Male',
    location: 'Phoenix, AZ',
    breeder: {
      name: 'Desert Savannah Ranch',
      verified: true,
      rating: 4.8
    },
    features: ['F2 Generation', 'Large Size', 'Exotic Markings', 'Health Certified'],
    availability: 'Available',
    postedDate: '1 week ago',
    description: 'Aspen is a magnificent F2 Savannah cat with incredible size and wild appearance. His spotted coat and tall, lean build showcase the perfect blend of domestic cat and African Serval heritage. He has a dog-like personality and forms strong bonds with his family.',
    characteristics: {
      temperament: ['Loyal', 'Intelligent', 'Active', 'Social'],
      energyLevel: 5,
      groomingNeeds: 2,
      healthIssues: ['Generally Healthy', 'Regular vet checkups recommended'],
      lifespan: '12-20 years',
      weight: '15-25 lbs',
      origin: 'United States/Africa'
    },
    parents: {
      sire: {
        name: 'Serengeti Storm',
        registration: 'TICA-F1-789',
        awards: ['F1 Excellence Award', 'Best Savannah 2023']
      },
      dam: {
        name: 'Desert Rose Nala',
        registration: 'TICA-SAV-456',
        awards: ['Breeding Excellence', 'Top Producer']
      }
    },
    health: {
      vaccinations: ['Core Vaccines', 'FVRCP', 'Rabies'],
      healthTests: ['Heart Screening', 'Genetic Panel'],
      healthGuarantee: '3 year comprehensive health guarantee',
      vetRecords: true
    },
    images: [
      {
        id: '1',
        url: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=800',
        alt: 'Aspen - Savannah Cat',
        title: 'Aspen Portrait'
      },
      {
        id: '2',
        url: 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=800',
        alt: 'Aspen Standing',
        title: 'Full Body View'
      },
      {
        id: '3',
        url: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800',
        alt: 'Aspen Profile',
        title: 'Side Profile'
      }
    ]
  },
  {
    id: 'mainecoon-001',
    name: 'Magnus',
    breed: 'Maine Coon',
    price: 2800,
    image: 'https://images.unsplash.com/photo-1571566882372-1598d88abd90?w=800',
    age: '8 months',
    gender: 'Male',
    location: 'Portland, ME',
    breeder: {
      name: 'Pine State Maine Coons',
      verified: true,
      rating: 4.9
    },
    features: ['Giant Size', 'Champion Bloodline', 'Show Potential', 'Polydactyl'],
    availability: 'Available',
    postedDate: '3 days ago',
    description: 'Magnus is an exceptional Maine Coon with the classic "gentle giant" personality. His impressive size, beautiful tabby markings, and polydactyl feet make him truly special. He comes from a long line of champions and has incredible show potential.',
    characteristics: {
      temperament: ['Gentle', 'Friendly', 'Intelligent', 'Laid-back'],
      energyLevel: 3,
      groomingNeeds: 4,
      healthIssues: ['HCM (tested clear)', 'Hip Dysplasia (rare)'],
      lifespan: '12-15 years',
      weight: '18-25 lbs (male)',
      origin: 'Maine, United States'
    },
    parents: {
      sire: {
        name: 'PineTree Titan',
        registration: 'CFA-MC-12345',
        awards: ['Grand Champion', 'Best Maine Coon 2022']
      },
      dam: {
        name: 'Moonlight Duchess',
        registration: 'CFA-MC-67890',
        awards: ['Champion Status', 'Distinguished Merit']
      }
    },
    health: {
      vaccinations: ['All Core Vaccines', 'FVRCP', 'FeLV', 'Rabies'],
      healthTests: ['HCM Clear', 'PKD Clear', 'SMA Clear'],
      healthGuarantee: '2 year genetic health guarantee',
      vetRecords: true
    },
    images: [
      {
        id: '1',
        url: 'https://images.unsplash.com/photo-1571566882372-1598d88abd90?w=800',
        alt: 'Magnus - Maine Coon',
        title: 'Magnus Portrait'
      },
      {
        id: '2',
        url: 'https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=800',
        alt: 'Magnus Full Size',
        title: 'Showing His Size'
      },
      {
        id: '3',
        url: 'https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?w=800',
        alt: 'Magnus Polydactyl Paws',
        title: 'Special Polydactyl Feet'
      }
    ]
  },
  {
    id: 'bengal-002',
    name: 'Copper',
    breed: 'Bengal Cat',
    priceRange: { min: 2500, max: 3200 },
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800',
    age: '3 months',
    gender: 'Male',
    location: 'Miami, FL',
    breeder: {
      name: 'Tropical Bengal Paradise',
      verified: true,
      rating: 4.7
    },
    features: ['Marbled Pattern', 'Rare Coloring', 'Health Tested', 'Early Socialization'],
    availability: 'Reserved',
    postedDate: '5 days ago',
    description: 'Copper is a rare marbled Bengal with stunning copper-colored markings. His unique pattern and gentle personality make him stand out from typical rosette Bengals. He has been extensively socialized and will make a wonderful companion.',
    characteristics: {
      temperament: ['Calm', 'Affectionate', 'Intelligent', 'Curious'],
      energyLevel: 4,
      groomingNeeds: 2,
      healthIssues: ['PRA (tested clear)', 'Generally healthy'],
      lifespan: '12-16 years',
      weight: '8-15 lbs',
      origin: 'United States'
    },
    parents: {
      sire: {
        name: 'Marble Master Zeus',
        registration: 'TICA-BEN-321',
        awards: ['Marbled Excellence', 'Regional Champion']
      },
      dam: {
        name: 'Copper Dream Bella',
        registration: 'TICA-BEN-654',
        awards: ['Best Marbled Female', 'Show Winner']
      }
    },
    health: {
      vaccinations: ['FVRCP Series', 'First Rabies'],
      healthTests: ['PRA Clear', 'PKD Clear'],
      healthGuarantee: '2 year genetic health guarantee',
      vetRecords: true
    },
    images: [
      {
        id: '1',
        url: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800',
        alt: 'Copper - Bengal Cat',
        title: 'Copper Portrait'
      },
      {
        id: '2',
        url: 'https://images.unsplash.com/photo-1577023311996-b64a6a0ac3be?w=800',
        alt: 'Copper Marbled Pattern',
        title: 'Beautiful Marbled Markings'
      }
    ]
  },
  {
    id: 'savannah-002',
    name: 'Safari',
    breed: 'Savannah Cat',
    price: 12000,
    image: 'https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?w=800',
    age: '1 year',
    gender: 'Female',
    location: 'Austin, TX',
    breeder: {
      name: 'Lone Star Savannahs',
      verified: true,
      rating: 5.0
    },
    features: ['F1 Generation', 'Breeding Rights', 'Exceptional Size', 'Wild Type'],
    availability: 'Available',
    postedDate: '1 day ago',
    description: 'Safari is a rare F1 Savannah female with incredible wild characteristics and size. Her long legs, large ears, and spotted coat perfectly showcase her Serval heritage. She comes with breeding rights and is perfect for an experienced Savannah enthusiast.',
    characteristics: {
      temperament: ['Independent', 'Intelligent', 'Active', 'Loyal'],
      energyLevel: 5,
      groomingNeeds: 2,
      healthIssues: ['Requires experienced owner', 'High maintenance'],
      lifespan: '15-20 years',
      weight: '12-18 lbs (female F1)',
      origin: 'United States/Africa'
    },
    parents: {
      sire: {
        name: 'African Thunder (Serval)',
        registration: 'Wild Serval',
        awards: ['Pure African Serval']
      },
      dam: {
        name: 'Spotted Star Princess',
        registration: 'TICA-SAV-999',
        awards: ['Foundation Female', 'Breeding Excellence']
      }
    },
    health: {
      vaccinations: ['Core Vaccines Complete'],
      healthTests: ['Full Health Panel', 'Fertility Testing'],
      healthGuarantee: '5 year comprehensive guarantee',
      vetRecords: true
    },
    images: [
      {
        id: '1',
        url: 'https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?w=800',
        alt: 'Safari - F1 Savannah',
        title: 'Safari Portrait'
      },
      {
        id: '2',
        url: 'https://images.unsplash.com/photo-1611003229186-80e40cd54966?w=800',
        alt: 'Safari Full Body',
        title: 'Showing Wild Heritage'
      }
    ]
  },
  {
    id: 'mainecoon-002',
    name: 'Aurora',
    breed: 'Maine Coon',
    price: 3200,
    image: 'https://images.unsplash.com/photo-1606214174585-fe31582cd838?w=800',
    age: '5 months',
    gender: 'Female',
    location: 'Bangor, ME',
    breeder: {
      name: 'Northern Lights Maine Coons',
      verified: true,
      rating: 4.8
    },
    features: ['Rare Silver', 'Show Quality', 'Championship Lineage', 'Excellent Health'],
    availability: 'Available',
    postedDate: '6 days ago',
    description: 'Aurora is a breathtaking silver Maine Coon with exceptional conformation and temperament. Her rare silver coloring and perfect ear tufts make her show ring ready. She has the classic Maine Coon personality - gentle, intelligent, and loving.',
    characteristics: {
      temperament: ['Gentle', 'Intelligent', 'Playful', 'Social'],
      energyLevel: 3,
      groomingNeeds: 4,
      healthIssues: ['HCM (parents tested clear)', 'Generally healthy'],
      lifespan: '12-15 years',
      weight: '12-18 lbs (female)',
      origin: 'Maine, United States'
    },
    parents: {
      sire: {
        name: 'Silver Storm King',
        registration: 'CFA-MC-777',
        awards: ['Grand Champion', 'Best Silver Maine Coon']
      },
      dam: {
        name: 'Aurora Borealis Queen',
        registration: 'CFA-MC-888',
        awards: ['Champion', 'Regional Winner']
      }
    },
    health: {
      vaccinations: ['All Age-Appropriate Vaccines'],
      healthTests: ['HCM Clear (parents)', 'PKD Clear', 'SMA Clear'],
      healthGuarantee: '2 year genetic health guarantee',
      vetRecords: true
    },
    images: [
      {
        id: '1',
        url: 'https://images.unsplash.com/photo-1606214174585-fe31582cd838?w=800',
        alt: 'Aurora - Silver Maine Coon',
        title: 'Aurora Portrait'
      },
      {
        id: '2',
        url: 'https://images.unsplash.com/photo-1609001815351-da80fa1c3e97?w=800',
        alt: 'Aurora Silver Coat',
        title: 'Beautiful Silver Coloring'
      }
    ]
  }
];

export const mockBreeders = [
  {
    id: 'breeder-001',
    name: 'Golden Bengal Cattery',
    email: 'info@goldenbengals.com',
    phone: '(555) 123-4567',
    location: 'Los Angeles, CA',
    verified: true,
    rating: 4.9,
    reviewCount: 127,
    yearsExperience: 12,
    memberSince: '2012',
    specialties: ['Bengal Cats', 'Show Quality', 'Champion Bloodlines'],
    certifications: ['TICA Registered', 'CFA Member', 'Health Testing Certified'],
    description: 'Premier Bengal cattery specializing in show quality cats with exceptional temperaments.',
    totalCats: 24,
    availableCats: 8
  },
  {
    id: 'breeder-002',
    name: 'Desert Savannah Ranch',
    email: 'contact@desertsavannahs.com',
    phone: '(555) 234-5678',
    location: 'Phoenix, AZ',
    verified: true,
    rating: 4.8,
    reviewCount: 89,
    yearsExperience: 8,
    memberSince: '2016',
    specialties: ['Savannah Cats', 'F1-F3 Generations', 'Large Size'],
    certifications: ['TICA Registered', 'Savannah Specialist', 'USDA Licensed'],
    description: 'Specializing in early generation Savannahs with exceptional size and wild characteristics.',
    totalCats: 12,
    availableCats: 3
  },
  {
    id: 'breeder-003',
    name: 'Pine State Maine Coons',
    email: 'hello@pinestatemainecoons.com',
    phone: '(555) 345-6789',
    location: 'Portland, ME',
    verified: true,
    rating: 4.9,
    reviewCount: 156,
    yearsExperience: 15,
    memberSince: '2009',
    specialties: ['Maine Coon Cats', 'Giant Size', 'Champion Lines', 'Polydactyl'],
    certifications: ['CFA All Breed Judge', 'Master Breeder', 'Health Testing Advocate'],
    description: 'Dedicated to preserving the Maine Coon breed with emphasis on size, health, and temperament.',
    totalCats: 18,
    availableCats: 6
  }
];

// Helper functions
export const getCatById = (id: string): ExoticCat | undefined => {
  return mockCats.find(cat => cat.id === id);
};

export const getCatsByBreeder = (breederId: string): ExoticCat[] => {
  return mockCats.filter(cat => {
    const breeder = mockBreeders.find(b => b.name === cat.breeder.name);
    return breeder?.id === breederId;
  });
};

export const getBreederById = (id: string) => {
  return mockBreeders.find(breeder => breeder.id === id);
};

export const getBreederByName = (name: string) => {
  return mockBreeders.find(breeder => breeder.name === name);
};