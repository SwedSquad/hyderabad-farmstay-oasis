import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { MapPin, Star, Users, Wifi, Car, Utensils } from "lucide-react";
import { Link } from "react-router-dom";

interface PropertyCardProps {
  id: string;
  name: string;
  type: string;
  images: string[];
  weekdayPrice: number;
  weekendPrice: number;
  rating: number;
  reviews: number;
  tags: string[];
  amenities: string[];
  maxGuests: number;
  location: string;
}

const PropertyCard = ({ 
  id, 
  name, 
  type, 
  images, 
  weekdayPrice, 
  weekendPrice, 
  rating, 
  reviews, 
  tags, 
  amenities, 
  maxGuests,
  location 
}: PropertyCardProps) => {
  const amenityIcons = {
    wifi: Wifi,
    parking: Car,
    kitchen: Utensils,
  };

  return (
    <Card className="group hover:shadow-nature transition-all duration-300 hover:scale-[1.02] overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative">
          <img 
            src={images[0]} 
            alt={name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 flex flex-wrap gap-1">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-white/90 text-primary">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="absolute top-3 right-3 bg-white/90 rounded-lg px-2 py-1 flex items-center space-x-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{rating}</span>
            <span className="text-xs text-muted-foreground">({reviews})</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {name}
            </h3>
            <p className="text-sm text-muted-foreground">{type}</p>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 mr-1" />
            {location}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>Up to {maxGuests} guests</span>
            </div>
            <div className="flex items-center space-x-2">
              {amenities.slice(0, 3).map((amenity) => {
                const IconComponent = amenityIcons[amenity as keyof typeof amenityIcons];
                return IconComponent ? (
                  <IconComponent key={amenity} className="w-4 h-4 text-muted-foreground" />
                ) : null;
              })}
            </div>
          </div>
          
          <div className="border-t pt-3">
            <div className="flex justify-between items-center">
              <div>
                <div className="flex items-baseline space-x-2">
                  <span className="text-lg font-bold text-primary">₹{weekdayPrice}</span>
                  <span className="text-sm text-muted-foreground">weekday</span>
                </div>
                <div className="flex items-baseline space-x-2">
                  <span className="text-lg font-bold text-primary">₹{weekendPrice}</span>
                  <span className="text-sm text-muted-foreground">weekend</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button variant="nature" className="w-full" asChild>
          <Link to={`/property/${id}`}>
            View Details & Book
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;