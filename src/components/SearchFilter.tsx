import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  MapPin, 
  Users, 
  IndianRupee, 
  Calendar,
  Filter,
  X
} from "lucide-react";

interface SearchFilterProps {
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  searchTerm: string;
  location: string;
  maxGuests: string;
  priceRange: {
    min: string;
    max: string;
  };
  checkIn: string;
  checkOut: string;
  amenities: string[];
}

const SearchFilter = ({ onFilterChange }: SearchFilterProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: "",
    location: "",
    maxGuests: "",
    priceRange: { min: "", max: "" },
    checkIn: "",
    checkOut: "",
    amenities: []
  });

  const availableAmenities = [
    "wifi", "parking", "kitchen", "pool", "garden", "bbq", "gym", "spa"
  ];

  const locations = [
    "Shamirpet, Hyderabad",
    "Kompally, Hyderabad", 
    "Medchal, Hyderabad",
    "All Locations"
  ];

  const updateFilters = (newFilters: Partial<FilterState>) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);
    onFilterChange(updated);
  };

  const toggleAmenity = (amenity: string) => {
    const newAmenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter(a => a !== amenity)
      : [...filters.amenities, amenity];
    
    updateFilters({ amenities: newAmenities });
  };

  const clearFilters = () => {
    const emptyFilters: FilterState = {
      searchTerm: "",
      location: "",
      maxGuests: "",
      priceRange: { min: "", max: "" },
      checkIn: "",
      checkOut: "",
      amenities: []
    };
    setFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  return (
    <Card className="p-6 shadow-card">
      {/* Quick Search Bar */}
      <div className="flex items-center space-x-4 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search properties..."
            value={filters.searchTerm}
            onChange={(e) => updateFilters({ searchTerm: e.target.value })}
            className="pl-10"
          />
        </div>
        <Button 
          variant="outline" 
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center space-x-2"
        >
          <Filter className="w-4 h-4" />
          <span>Filters</span>
        </Button>
        {(filters.searchTerm || filters.location || filters.amenities.length > 0) && (
          <Button 
            variant="ghost" 
            onClick={clearFilters}
            className="flex items-center space-x-2"
          >
            <X className="w-4 h-4" />
            <span>Clear</span>
          </Button>
        )}
      </div>

      {/* Expanded Filters */}
      {isExpanded && (
        <div className="space-y-6 border-t pt-6">
          {/* Location and Guests */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Location</span>
              </Label>
              <select 
                value={filters.location}
                onChange={(e) => updateFilters({ location: e.target.value })}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Any Location</option>
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2">
              <Label className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>Max Guests</span>
              </Label>
              <Input
                type="number"
                placeholder="Number of guests"
                value={filters.maxGuests}
                onChange={(e) => updateFilters({ maxGuests: e.target.value })}
              />
            </div>
          </div>

          {/* Price Range */}
          <div className="space-y-2">
            <Label className="flex items-center space-x-2">
              <IndianRupee className="w-4 h-4" />
              <span>Price Range (per night)</span>
            </Label>
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="Min price"
                value={filters.priceRange.min}
                onChange={(e) => updateFilters({ 
                  priceRange: { ...filters.priceRange, min: e.target.value }
                })}
              />
              <Input
                placeholder="Max price"
                value={filters.priceRange.max}
                onChange={(e) => updateFilters({ 
                  priceRange: { ...filters.priceRange, max: e.target.value }
                })}
              />
            </div>
          </div>

          {/* Dates */}
          <div className="space-y-2">
            <Label className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Dates</span>
            </Label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="check-in" className="text-sm">Check In</Label>
                <Input
                  id="check-in"
                  type="date"
                  value={filters.checkIn}
                  onChange={(e) => updateFilters({ checkIn: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="check-out" className="text-sm">Check Out</Label>
                <Input
                  id="check-out"
                  type="date"
                  value={filters.checkOut}
                  onChange={(e) => updateFilters({ checkOut: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="space-y-2">
            <Label>Amenities</Label>
            <div className="flex flex-wrap gap-2">
              {availableAmenities.map(amenity => (
                <Badge
                  key={amenity}
                  variant={filters.amenities.includes(amenity) ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/20"
                  onClick={() => toggleAmenity(amenity)}
                >
                  {amenity}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default SearchFilter;