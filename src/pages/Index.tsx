import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { properties } from "@/data/properties";
import { MapPin, Star, Users, TreePine, Sparkles, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-farmhouse.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gradient-hero flex items-center justify-center text-white overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${heroImage})`,
            backgroundBlendMode: 'overlay'
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-white/20 text-white border-white/30">
            <Sparkles className="w-4 h-4 mr-1" />
            Premium Farm House Rentals
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Farm House for Rent in <br />
            <span className="text-gold">Hyderabad & Nearby</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white/90">
            Escape to luxury farm houses within 40 miles of Hyderabad. Perfect for family getaways, 
            corporate retreats, and special celebrations.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero" size="xl" asChild className="bg-white text-primary hover:bg-white/90">
              <Link to="#properties">
                <TreePine className="w-5 h-5" />
                Explore Properties
              </Link>
            </Button>
            <Button variant="outline" size="xl" className="border-white bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-primary">
              <Phone className="w-5 h-5" />
              Call Now: +91 99999 88888
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section id="properties" className="py-16 bg-gradient-nature">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-nature/10 text-nature border-nature/20">
              <Star className="w-4 h-4 mr-1" />
              Featured Properties
            </Badge>
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Our Premium Farm Houses
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose from our carefully curated selection of luxury farm houses, 
              each offering unique experiences and modern amenities.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-foreground">
              Why Choose Our Farm House Rentals in Hyderabad?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-nature/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-nature" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Prime Locations</h3>
                    <p className="text-muted-foreground">
                      Strategically located within 40 miles of Hyderabad, offering easy accessibility 
                      while maintaining the peaceful countryside experience.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-nature/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-nature" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Perfect for Groups</h3>
                    <p className="text-muted-foreground">
                      Accommodating 12-20 guests with flexible room configurations, 
                      ideal for family reunions, corporate events, and celebrations.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-nature/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Star className="w-5 h-5 text-nature" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Luxury Amenities</h3>
                    <p className="text-muted-foreground">
                      Swimming pools, modern kitchens, barbecue areas, and landscaped gardens 
                      ensure a comfortable and memorable stay.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-nature/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TreePine className="w-5 h-5 text-nature" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Nature Experience</h3>
                    <p className="text-muted-foreground">
                      Escape the city hustle with authentic farm experiences, 
                      fresh air, and beautiful natural surroundings.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="prose max-w-none text-muted-foreground">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Farm House Rentals Near Hyderabad - Your Perfect Weekend Getaway
              </h3>
              <p className="mb-4">
                Looking for <strong>farm house for rent in Hyderabad</strong>? Our premium collection 
                of farm houses offers the perfect escape from city life. Located within 40 miles of 
                Hyderabad, our properties in Shamirpet, Kompally, and Medchal provide easy accessibility 
                while ensuring a peaceful countryside experience.
              </p>
              <p className="mb-4">
                Whether you're planning a family vacation, corporate retreat, or special celebration, 
                our <strong>farm houses near Hyderabad</strong> offer luxury accommodations with 
                modern amenities. From cozy 1BHK options to spacious 4BHK luxury villas, we cater 
                to groups of all sizes.
              </p>
              <p>
                Each property features swimming pools, landscaped gardens, barbecue facilities, 
                and ample parking. Book your <strong>weekend farm house rental in Hyderabad</strong> 
                today and create unforgettable memories in nature's lap.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Book Your Farm House?</h2>
          <p className="text-xl mb-8 text-white/90">
            Contact us today to check availability and make your reservation
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
              <Phone className="w-5 h-5" />
              Call: +91 99999 88888
            </Button>
            <Button variant="premium" size="lg">
              WhatsApp: +91 99999 88888
            </Button>
          </div>
        </div>
      </section>
      
      
      <Footer />
    </div>
  );
};

export default Index;
