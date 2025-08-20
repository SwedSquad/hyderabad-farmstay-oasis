import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Eye, 
  EyeOff, 
  Home, 
  MessageSquare, 
  Star, 
  Tag, 
  Phone, 
  Mail, 
  MapPin, 
  Copy,
  ExternalLink,
  Edit,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useSellerData } from "@/hooks/useSellerData";
import { supabase } from "@/integrations/supabase/client";

const SellerDashboard = () => {
  const { toast } = useToast();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<string>("");
  const [contactForm, setContactForm] = useState({ phone: "", email: "", location: "" });
  
  const {
    properties,
    inquiries,
    contactRequests,
    tagRequests,
    reviews,
    loading,
    submitContactRequest,
    purchaseTag,
    updateInquiryStatus,
    generateReviewLink
  } = useSellerData();

  useEffect(() => {
    if (properties.length > 0 && !selectedProperty) {
      setSelectedProperty(properties[0].id);
    }
  }, [properties, selectedProperty]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Try to sign in with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) {
        // Fallback to mock login for demo
        if (credentials.email === "seller@example.com" && credentials.password === "seller123") {
          setIsLoggedIn(true);
          toast({
            title: "Login Successful (Demo Mode)",
            description: "Welcome to your seller dashboard!",
          });
          return;
        }
        throw error;
      }

      if (data.user) {
        setIsLoggedIn(true);
        toast({
          title: "Login Successful",
          description: "Welcome to your seller dashboard!",
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Try seller@example.com / seller123 for demo",
        variant: "destructive"
      });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    setCredentials({ email: "", password: "" });
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const handleContactSubmission = () => {
    if (!selectedProperty || !contactForm.phone || !contactForm.email || !contactForm.location) {
      toast({
        title: "Error",
        description: "Please fill all contact information fields",
        variant: "destructive"
      });
      return;
    }

    submitContactRequest(selectedProperty, contactForm);
    setContactForm({ phone: "", email: "", location: "" });
  };

  const handleTagPurchase = (tagName: string, price: number) => {
    if (!selectedProperty) {
      toast({
        title: "Error",
        description: "Please select a property first",
        variant: "destructive"
      });
      return;
    }

    purchaseTag(selectedProperty, tagName, price);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-nature flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-nature">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center mb-4">
              <Home className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-primary">Seller Login</CardTitle>
            <p className="text-muted-foreground">Manage your farm house listings</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={credentials.email}
                  onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={credentials.password}
                    onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="Enter your password"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              
              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Demo: seller@example.com / seller123
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  const stats = [
    {
      title: "Total Properties",
      value: properties.length.toString(),
      description: "Active listings",
      icon: Home
    },
    {
      title: "Total Inquiries",
      value: inquiries.length.toString(),
      description: "Customer inquiries",
      icon: MessageSquare
    },
    {
      title: "Total Reviews",
      value: reviews.filter(r => r.status === 'approved').length.toString(),
      description: "Approved reviews",
      icon: Star
    },
    {
      title: "Avg. Rate",
      value: properties.length > 0 ? `₹${Math.round(properties.reduce((sum, p) => sum + p.weekday_price, 0) / properties.length)}` : "₹0",
      description: "Average price",
      icon: Tag
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-nature">
      <header className="bg-white border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center">
                <Home className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary">Seller Dashboard</h1>
                <p className="text-sm text-muted-foreground">Manage your properties</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="shadow-card">
              <CardContent className="flex items-center p-6">
                <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center mr-4">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="properties" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="tags">Promotional Tags</TabsTrigger>
            <TabsTrigger value="contact">Contact Approval</TabsTrigger>
          </TabsList>

          <TabsContent value="properties">
            <Card>
              <CardHeader>
                <CardTitle>Your Properties</CardTitle>
                <CardDescription>Manage your property listings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {properties.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">No properties yet. Add your first property to get started!</p>
                ) : (
                  properties.map((property) => (
                    <div key={property.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">{property.name}</h4>
                          <p className="text-sm text-muted-foreground">{property.type} • {property.location}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant={property.is_active ? "default" : "secondary"}>
                              {property.is_active ? "Active" : "Inactive"}
                            </Badge>
                            {property.contact_approved && (
                              <Badge variant="default">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Contact Approved
                              </Badge>
                            )}
                            {property.active_tags.map(tag => (
                              <Badge key={tag} variant="outline">{tag}</Badge>
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Weekday</p>
                          <p className="font-bold">₹{property.weekday_price}</p>
                          <p className="text-sm text-muted-foreground">Weekend</p>
                          <p className="font-bold">₹{property.weekend_price}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm mt-3">
                        <div>
                          <span className="text-muted-foreground">Rating:</span>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                            <span className="font-medium">{property.rating}</span>
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Reviews:</span>
                          <div className="font-medium">{property.review_count}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Max Guests:</span>
                          <div className="font-medium">{property.max_guests}</div>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-4">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => generateReviewLink(property.id)}
                        >
                          <Copy className="w-4 h-4 mr-1" />
                          Copy Review Link
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4 mr-1" />
                          Edit Property
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inquiries">
            <Card>
              <CardHeader>
                <CardTitle>Customer Inquiries</CardTitle>
                <CardDescription>Manage customer inquiries and bookings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {inquiries.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">No inquiries yet</p>
                ) : (
                  inquiries.map((inquiry) => (
                    <div key={inquiry.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">{inquiry.customer_name}</h4>
                          <p className="text-sm text-muted-foreground">{inquiry.customer_email}</p>
                          <p className="text-sm text-muted-foreground">{inquiry.customer_phone}</p>
                        </div>
                        <Badge variant={
                          inquiry.status === "new" ? "secondary" :
                          inquiry.status === "responded" ? "default" : "outline"
                        }>
                          {inquiry.status}
                        </Badge>
                      </div>
                      
                      <div className="bg-muted p-3 rounded mb-3">
                        <p>{inquiry.message}</p>
                      </div>
                      
                      {inquiry.check_in && inquiry.check_out && (
                        <div className="flex gap-4 text-sm text-muted-foreground mb-3">
                          <div>Check-in: {inquiry.check_in}</div>
                          <div>Check-out: {inquiry.check_out}</div>
                          {inquiry.guests && <div>Guests: {inquiry.guests}</div>}
                        </div>
                      )}
                      
                      {inquiry.status === "new" && (
                        <div className="flex gap-2">
                          <Button 
                            size="sm"
                            onClick={() => updateInquiryStatus(inquiry.id, 'responded')}
                          >
                            Mark as Responded
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => updateInquiryStatus(inquiry.id, 'closed')}
                          >
                            Close Inquiry
                          </Button>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews">
            <Card>
              <CardHeader>
                <CardTitle>Customer Reviews</CardTitle>
                <CardDescription>View approved customer reviews</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {reviews.filter(r => r.status === 'approved').length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">No approved reviews yet</p>
                ) : (
                  reviews.filter(r => r.status === 'approved').map((review) => (
                    <div key={review.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">{review.customer_name}</h4>
                          <div className="flex items-center gap-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${
                                  i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                                }`} 
                              />
                            ))}
                            <span className="text-sm ml-1">({review.rating}/5)</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {new Date(review.submitted_at).toLocaleDateString()}
                        </p>
                      </div>
                      <p className="text-muted-foreground">{review.comment}</p>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tags">
            <Card>
              <CardHeader>
                <CardTitle>Promotional Tags</CardTitle>
                <CardDescription>Purchase promotional tags to boost visibility</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="property-select">Select Property</Label>
                  <select 
                    id="property-select"
                    className="w-full mt-1 p-2 border rounded-md"
                    value={selectedProperty}
                    onChange={(e) => setSelectedProperty(e.target.value)}
                  >
                    <option value="">Select a property</option>
                    {properties.map(property => (
                      <option key={property.id} value={property.id}>
                        {property.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="border-2 border-dashed">
                    <CardContent className="p-4 text-center">
                      <Tag className="w-8 h-8 mx-auto mb-2 text-primary" />
                      <h4 className="font-semibold">Featured</h4>
                      <p className="text-2xl font-bold text-primary my-2">₹500</p>
                      <Button 
                        size="sm" 
                        className="w-full"
                        onClick={() => handleTagPurchase('Featured', 500)}
                        disabled={!selectedProperty}
                      >
                        Purchase
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-2 border-dashed">
                    <CardContent className="p-4 text-center">
                      <Star className="w-8 h-8 mx-auto mb-2 text-primary" />
                      <h4 className="font-semibold">Premium</h4>
                      <p className="text-2xl font-bold text-primary my-2">₹300</p>
                      <Button 
                        size="sm" 
                        className="w-full"
                        onClick={() => handleTagPurchase('Premium', 300)}
                        disabled={!selectedProperty}
                      >
                        Purchase
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-2 border-dashed">
                    <CardContent className="p-4 text-center">
                      <Clock className="w-8 h-8 mx-auto mb-2 text-primary" />
                      <h4 className="font-semibold">Trending</h4>
                      <p className="text-2xl font-bold text-primary my-2">₹200</p>
                      <Button 
                        size="sm" 
                        className="w-full"
                        onClick={() => handleTagPurchase('Trending', 200)}
                        disabled={!selectedProperty}
                      >
                        Purchase
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {tagRequests.length > 0 && (
                  <div className="border-t pt-6">
                    <h3 className="font-medium mb-4">Your Tag Requests</h3>
                    <div className="space-y-3">
                      {tagRequests.map((request) => (
                        <div key={request.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-medium">{request.tag_name}</h4>
                              <p className="text-sm text-muted-foreground">₹{request.price}</p>
                              <p className="text-sm text-muted-foreground">
                                Submitted: {new Date(request.submitted_at).toLocaleDateString()}
                              </p>
                            </div>
                            <Badge variant={
                              request.status === "pending" ? "secondary" :
                              request.status === "approved" ? "default" : "destructive"
                            }>
                              {request.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information Approval</CardTitle>
                <CardDescription>Submit your contact information for admin approval</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="property-select-contact">Select Property</Label>
                  <select 
                    id="property-select-contact"
                    className="w-full mt-1 p-2 border rounded-md"
                    value={selectedProperty}
                    onChange={(e) => setSelectedProperty(e.target.value)}
                  >
                    <option value="">Select a property</option>
                    {properties.map(property => (
                      <option key={property.id} value={property.id}>
                        {property.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="Enter email address"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location Details</Label>
                    <Input
                      id="location"
                      value={contactForm.location}
                      onChange={(e) => setContactForm(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="Enter location details"
                    />
                  </div>
                </div>

                <Button onClick={handleContactSubmission} disabled={!selectedProperty}>
                  Submit for Approval
                </Button>

                {contactRequests.length > 0 && (
                  <div className="border-t pt-6">
                    <h3 className="font-medium mb-4">Your Contact Requests</h3>
                    <div className="space-y-3">
                      {contactRequests.map((request) => (
                        <div key={request.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">Property ID: {request.property_id}</h4>
                              <p className="text-sm text-muted-foreground">
                                Phone: {request.phone} • Email: {request.email}
                              </p>
                              <p className="text-sm text-muted-foreground">Location: {request.location}</p>
                              <p className="text-sm text-muted-foreground">
                                Submitted: {new Date(request.submitted_at).toLocaleDateString()}
                              </p>
                            </div>
                            <Badge variant={
                              request.status === "pending" ? "secondary" :
                              request.status === "approved" ? "default" : "destructive"
                            }>
                              {request.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SellerDashboard;