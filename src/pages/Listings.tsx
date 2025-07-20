import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import PropertyCard from "@/components/PropertyCard";
import { properties } from "@/data/properties";
import { Search, Filter, SlidersHorizontal, MapPin, Star } from "lucide-react";

const Listings = () => {
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [filters, setFilters] = useState({
    search: "",
    priceRange: "all",
    guests: "",
    amenities: [] as string[],
    rating: "all"
  });
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (searchTerm: string) => {
    setFilters(prev => ({ ...prev, search: searchTerm }));
    filterProperties({ ...filters, search: searchTerm });
  };

  const filterProperties = (currentFilters: typeof filters) => {
    let filtered = [...properties];

    // Search filter
    if (currentFilters.search) {
      const searchLower = currentFilters.search.toLowerCase();
      filtered = filtered.filter(property =>
        property.name.toLowerCase().includes(searchLower) ||
        property.location.toLowerCase().includes(searchLower) ||
        property.type.toLowerCase().includes(searchLower) ||
        property.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Price range filter
    if (currentFilters.priceRange !== "all") {
      filtered = filtered.filter(property => {
        const price = property.weekendPrice;
        switch (currentFilters.priceRange) {
          case "budget":
            return price <= 5000;
          case "mid":
            return price > 5000 && price <= 10000;
          case "luxury":
            return price > 10000;
          default:
            return true;
        }
      });
    }

    // Guests filter
    if (currentFilters.guests) {
      const guestCount = parseInt(currentFilters.guests);
      filtered = filtered.filter(property => property.maxGuests >= guestCount);
    }

    // Rating filter
    if (currentFilters.rating !== "all") {
      const minRating = parseFloat(currentFilters.rating);
      filtered = filtered.filter(property => property.rating >= minRating);
    }

    // Amenities filter
    if (currentFilters.amenities.length > 0) {
      filtered = filtered.filter(property =>
        currentFilters.amenities.every(amenity =>
          property.amenities.includes(amenity)
        )
      );
    }

    setFilteredProperties(filtered);
  };

  const handleFilterChange = (key: string, value: string | string[]) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    filterProperties(newFilters);
  };

  const toggleAmenity = (amenity: string) => {
    const newAmenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter(a => a !== amenity)
      : [...filters.amenities, amenity];
    handleFilterChange("amenities", newAmenities);
  };

  const clearFilters = () => {
    const clearedFilters = {
      search: "",
      priceRange: "all",
      guests: "",
      amenities: [],
      rating: "all"
    };
    setFilters(clearedFilters);
    setFilteredProperties(properties);
  };

  const availableAmenities = [
    "wifi", "parking", "kitchen", "pool", "garden", "bbq", "gym", "spa"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">All Farm House Properties</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Discover our complete collection of luxury farm houses in and around Hyderabad. 
            Perfect for family getaways, corporate retreats, and special celebrations.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter Bar */}
        <Card className="p-6 mb-8 shadow-card">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by name, location, or type..."
                value={filters.search}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-2 items-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
                {(filters.priceRange !== "all" || filters.guests || filters.amenities.length > 0 || filters.rating !== "all") && (
                  <Badge variant="secondary" className="ml-1">
                    {[
                      filters.priceRange !== "all" ? 1 : 0,
                      filters.guests ? 1 : 0,
                      filters.amenities.length > 0 ? 1 : 0,
                      filters.rating !== "all" ? 1 : 0
                    ].reduce((sum, count) => sum + count, 0)}
                  </Badge>
                )}
              </Button>
              
              {(filters.search || filters.priceRange !== "all" || filters.guests || filters.amenities.length > 0 || filters.rating !== "all") && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear All
                </Button>
              )}
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t space-y-4">
              <div className="grid md:grid-cols-4 gap-4">
                {/* Price Range */}
                <div>
                  <Label className="text-sm font-medium">Price Range</Label>
                  <select
                    value={filters.priceRange}
                    onChange={(e) => handleFilterChange("priceRange", e.target.value)}
                    className="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background text-sm"
                  >
                    <option value="all">All Prices</option>
                    <option value="budget">Budget (Up to ₹5,000)</option>
                    <option value="mid">Mid-range (₹5,000 - ₹10,000)</option>
                    <option value="luxury">Luxury (₹10,000+)</option>
                  </select>
                </div>

                {/* Guests */}
                <div>
                  <Label className="text-sm font-medium">Min Guests</Label>
                  <Input
                    type="number"
                    min="1"
                    max="20"
                    value={filters.guests}
                    onChange={(e) => handleFilterChange("guests", e.target.value)}
                    placeholder="Any"
                    className="mt-1"
                  />
                </div>

                {/* Rating */}
                <div>
                  <Label className="text-sm font-medium">Min Rating</Label>
                  <select
                    value={filters.rating}
                    onChange={(e) => handleFilterChange("rating", e.target.value)}
                    className="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background text-sm"
                  >
                    <option value="all">Any Rating</option>
                    <option value="4.5">4.5+ Stars</option>
                    <option value="4.0">4.0+ Stars</option>
                    <option value="3.5">3.5+ Stars</option>
                  </select>
                </div>

                {/* Location quick filter */}
                <div>
                  <Label className="text-sm font-medium">Location</Label>
                  <select
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background text-sm"
                  >
                    <option value="">All Locations</option>
                    <option value="Shamirpet">Shamirpet</option>
                    <option value="Kompally">Kompally</option>
                    <option value="Medchal">Medchal</option>
                  </select>
                </div>
              </div>

              {/* Amenities */}
              <div>
                <Label className="text-sm font-medium mb-2 block">Amenities</Label>
                <div className="flex flex-wrap gap-2">
                  {availableAmenities.map((amenity) => (
                    <button
                      key={amenity}
                      onClick={() => toggleAmenity(amenity)}
                      className={`px-3 py-1 rounded-full text-sm capitalize transition-colors ${
                        filters.amenities.includes(amenity)
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted hover:bg-muted/80'
                      }`}
                    >
                      {amenity}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">
              {filteredProperties.length} Properties Found
            </h2>
            {filters.search && (
              <p className="text-muted-foreground mt-1">
                Showing results for "{filters.search}"
              </p>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <Label className="text-sm">Sort by:</Label>
            <select className="px-3 py-1 border border-input rounded-md bg-background text-sm">
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Rating: High to Low</option>
              <option>Most Popular</option>
            </select>
          </div>
        </div>

        {/* Active Filters */}
        {(filters.search || filters.priceRange !== "all" || filters.guests || filters.amenities.length > 0 || filters.rating !== "all") && (
          <div className="flex flex-wrap gap-2 mb-6">
            {filters.search && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Search: "{filters.search}"
                <button onClick={() => handleSearch("")} className="ml-1 hover:text-destructive">×</button>
              </Badge>
            )}
            {filters.priceRange !== "all" && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Price: {filters.priceRange}
                <button onClick={() => handleFilterChange("priceRange", "all")} className="ml-1 hover:text-destructive">×</button>
              </Badge>
            )}
            {filters.guests && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Min {filters.guests} guests
                <button onClick={() => handleFilterChange("guests", "")} className="ml-1 hover:text-destructive">×</button>
              </Badge>
            )}
            {filters.rating !== "all" && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {filters.rating}+ stars
                <button onClick={() => handleFilterChange("rating", "all")} className="ml-1 hover:text-destructive">×</button>
              </Badge>
            )}
            {filters.amenities.map((amenity) => (
              <Badge key={amenity} variant="secondary" className="flex items-center gap-1 capitalize">
                {amenity}
                <button onClick={() => toggleAmenity(amenity)} className="ml-1 hover:text-destructive">×</button>
              </Badge>
            ))}
          </div>
        )}

        {/* Properties Grid */}
        {filteredProperties.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No Properties Found</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              We couldn't find any properties matching your criteria. 
              Try adjusting your filters or search terms.
            </p>
            <Button onClick={clearFilters} variant="outline">
              Clear All Filters
            </Button>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-hero text-white p-8">
            <h2 className="text-3xl font-bold mb-4">Can't Find What You're Looking For?</h2>
            <p className="text-xl text-white/90 mb-6 max-w-2xl mx-auto">
              Contact us directly and we'll help you find the perfect farm house 
              that meets all your requirements.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                Call: +91 99999 88888
              </Button>
              <Button variant="secondary">
                Send WhatsApp Message
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Listings;