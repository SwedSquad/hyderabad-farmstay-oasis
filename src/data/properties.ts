export interface Property {
  id: string;
  name: string;
  type: string;
  description: string;
  images: string[];
  weekdayPrice: number;
  weekendPrice: number;
  rating: number;
  reviews: number;
  tags: string[];
  amenities: string[];
  maxGuests: number;
  location: string;
  mapEmbed: string;
  rooms: {
    bedrooms: number;
    bathrooms: number;
    hall: number;
    kitchen: number;
  };
  features: string[];
}

export const properties: Property[] = [
  {
    id: "farm-feast",
    name: "Farm Feast Farm House",
    type: "1BHK, 2BHK, 3BHK Options",
    description: "Experience the perfect blend of rustic charm and modern comfort at Farm Feast Farm House. Our property offers flexible accommodation options with 1BHK, 2BHK, and 3BHK configurations to suit your group size and budget.",
    images: [
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1024&h=768&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1024&h=768&fit=crop",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1024&h=768&fit=crop"
    ],
    weekdayPrice: 3500,
    weekendPrice: 5000,
    rating: 4.8,
    reviews: 124,
    tags: ["Top Rated", "Most Reviewed"],
    amenities: ["wifi", "parking", "kitchen", "pool", "garden", "bbq"],
    maxGuests: 12,
    location: "Shamirpet, Hyderabad",
    mapEmbed: "https://maps.app.goo.gl/NpifxhWJQwwQE1MZ8",
    rooms: {
      bedrooms: 3,
      bathrooms: 3,
      hall: 1,
      kitchen: 1
    },
    features: [
      "Multiple room configurations (1BHK to 3BHK)",
      "Private swimming pool",
      "Outdoor dining area",
      "Barbecue facilities",
      "Garden and lawn area",
      "Parking for 6 cars",
      "Wi-Fi connectivity",
      "Modern kitchen facilities"
    ]
  },
  {
    id: "farm-oxygen",
    name: "Farm Oxygen",
    type: "4BHK Luxury Villa",
    description: "Indulge in luxury at Farm Oxygen, our premium 4BHK villa designed for those who appreciate the finer things in life. This spacious property combines modern architecture with nature's tranquility.",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1024&h=768&fit=crop",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1024&h=768&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1024&h=768&fit=crop"
    ],
    weekdayPrice: 8000,
    weekendPrice: 12000,
    rating: 4.9,
    reviews: 89,
    tags: ["Top Rated", "Trending", "Verified"],
    amenities: ["wifi", "parking", "kitchen", "pool", "garden", "bbq", "gym", "spa"],
    maxGuests: 16,
    location: "Kompally, Hyderabad",
    mapEmbed: "https://maps.app.goo.gl/NpifxhWJQwwQE1MZ8",
    rooms: {
      bedrooms: 4,
      bathrooms: 4,
      hall: 2,
      kitchen: 1
    },
    features: [
      "Luxurious 4BHK villa",
      "Large swimming pool with jacuzzi",
      "Home gym and spa facilities",
      "Entertainment room with gaming",
      "Spacious outdoor entertainment area",
      "Professional barbecue setup",
      "Landscaped gardens",
      "Parking for 8 cars",
      "High-speed Wi-Fi",
      "Modern designer kitchen"
    ]
  },
  {
    id: "farm-classy-nature",
    name: "Farm Classy Nature",
    type: "1BHK Villa + 4 Container Rooms",
    description: "Experience unique accommodation at Farm Classy Nature, featuring an innovative design with a comfortable 1BHK villa complemented by 4 modern container rooms. Perfect for large groups seeking a distinctive stay.",
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1024&h=768&fit=crop",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1024&h=768&fit=crop",
      "https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=1024&h=768&fit=crop"
    ],
    weekdayPrice: 6000,
    weekendPrice: 9000,
    rating: 4.7,
    reviews: 76,
    tags: ["Most Responsive", "Trending"],
    amenities: ["wifi", "parking", "kitchen", "pool", "garden", "bbq", "unique"],
    maxGuests: 20,
    location: "Medchal, Hyderabad",
    mapEmbed: "https://maps.app.goo.gl/NpifxhWJQwwQE1MZ8",
    rooms: {
      bedrooms: 5,
      bathrooms: 6,
      hall: 1,
      kitchen: 1
    },
    features: [
      "Unique 1BHK villa + 4 container rooms design",
      "Modern container accommodation",
      "Swimming pool and recreational area",
      "Creative architectural design",
      "Perfect for large groups",
      "Outdoor adventure activities",
      "Nature integration design",
      "Parking for 10 cars",
      "Wi-Fi throughout property",
      "Shared kitchen and dining facilities"
    ]
  }
];