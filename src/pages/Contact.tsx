import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { properties } from "@/data/properties";
import { MapPin, Phone, Mail, Clock, TreePine, Send } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Ready to book your perfect farm house getaway? Get in touch with us for 
            availability, pricing, and any questions you might have.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                We're here to help you find the perfect farm house for your next getaway. 
                Whether it's a family vacation, corporate retreat, or special celebration, 
                our team is ready to assist you.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p className="text-muted-foreground">+91 99999 88888</p>
                  <p className="text-sm text-muted-foreground">Available 24/7 for bookings</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-muted-foreground">bookings@farmhouserentals.com</p>
                  <p className="text-sm text-muted-foreground">We'll respond within 2 hours</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Service Area</h3>
                  <p className="text-muted-foreground">Hyderabad & surrounding areas</p>
                  <p className="text-sm text-muted-foreground">Within 40 miles radius</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Office Hours</h3>
                  <p className="text-muted-foreground">Mon - Sun: 9:00 AM - 9:00 PM</p>
                  <p className="text-sm text-muted-foreground">Emergency support available 24/7</p>
                </div>
              </div>
            </div>

            {/* WhatsApp Quick Contact */}
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-2xl">📱</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-green-800">Quick WhatsApp Booking</h3>
                    <p className="text-green-700 text-sm">Get instant responses on WhatsApp</p>
                  </div>
                  <Button className="bg-green-500 hover:bg-green-600">
                    Chat Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div>
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Send className="w-5 h-5 mr-2" />
                  Send us a Message
                </CardTitle>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" required />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" required />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="john@example.com" required />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" placeholder="+91 99999 88888" required />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="checkIn">Preferred Check-in</Label>
                      <Input id="checkIn" type="date" />
                    </div>
                    <div>
                      <Label htmlFor="guests">Number of Guests</Label>
                      <Input id="guests" type="number" placeholder="4" min="1" max="20" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="property">Interested Property</Label>
                    <select id="property" className="w-full px-3 py-2 border border-input rounded-md bg-background">
                      <option value="">Select a property (optional)</option>
                      {properties.map(property => (
                        <option key={property.id} value={property.id}>
                          {property.name} - {property.type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      rows={5}
                      placeholder="Tell us about your requirements, special requests, or any questions you have..."
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Our Service Area</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We serve farm house properties within 40 miles of Hyderabad, including 
              popular locations like Shamirpet, Kompally, and Medchal.
            </p>
          </div>
          
          <Card className="overflow-hidden">
            <div className="aspect-video bg-muted flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Service Area Map</h3>
                <p className="text-muted-foreground mb-4">
                  Interactive map showing all our farm house locations
                </p>
                <Button variant="outline">
                  View Full Map
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How far in advance should I book?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We recommend booking at least 1-2 weeks in advance, especially for weekends 
                  and holiday periods. However, we often have last-minute availability.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What's included in the rental?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  All properties include basic amenities like Wi-Fi, parking, and kitchen access. 
                  Specific amenities vary by property - check individual listings for details.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Do you provide catering services?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We can arrange catering services through our partner restaurants. 
                  Contact us for menu options and pricing based on your group size.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What's your cancellation policy?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Cancellations made 48+ hours before check-in receive full refund. 
                  Within 48 hours, 50% refund applies. No refund for same-day cancellations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Featured Properties */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Popular Properties</h2>
            <p className="text-muted-foreground">
              Take a look at our most popular farm house rentals
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {properties.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Contact;