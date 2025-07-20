import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { 
  Building, 
  Eye, 
  EyeOff, 
  Plus,
  Edit,
  MessageSquare,
  Star,
  Upload,
  Link as LinkIcon,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle,
  XCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const SellerDashboard = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);

  // Mock data for seller properties
  const [properties] = useState([
    {
      id: "farm-feast",
      name: "Farm Feast Farm House",
      type: "1BHK, 2BHK, 3BHK",
      weekdayPrice: 3500,
      weekendPrice: 5000,
      status: "active",
      inquiries: 8,
      reviews: 12
    }
  ]);

  const [contactRequests] = useState([
    {
      id: 1,
      propertyId: "farm-feast",
      phone: "+91 99999 88888",
      email: "seller@example.com", 
      location: "Shamirpet, Hyderabad",
      status: "pending",
      submittedAt: "2024-01-15"
    }
  ]);

  const [tagRequests] = useState([
    {
      id: 1,
      propertyId: "farm-feast", 
      tagName: "Top Rated",
      price: 1000,
      status: "pending",
      submittedAt: "2024-01-15"
    }
  ]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - in real app, validate credentials
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCredentials({ email: "", password: "" });
  };

  const generateReviewLink = (propertyId: string) => {
    const baseUrl = window.location.origin;
    const reviewLink = `${baseUrl}/review/${propertyId}`;
    navigator.clipboard.writeText(reviewLink);
    alert("Review link copied to clipboard!");
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-nature flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-nature">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center mb-4">
              <Building className="w-6 h-6 text-white" />
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
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              
              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Demo: Use any email/password to login
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-nature">
      {/* Header */}
      <header className="bg-white border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center">
                <Building className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary">Seller Dashboard</h1>
                <p className="text-sm text-muted-foreground">Manage your properties</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" onClick={() => navigate("/")}>
                View Website
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Properties</p>
                  <p className="text-2xl font-bold">{properties.length}</p>
                </div>
                <Building className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Inquiries</p>
                  <p className="text-2xl font-bold">
                    {properties.reduce((sum, p) => sum + p.inquiries, 0)}
                  </p>
                </div>
                <MessageSquare className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Reviews</p>
                  <p className="text-2xl font-bold">
                    {properties.reduce((sum, p) => sum + p.reviews, 0)}
                  </p>
                </div>
                <Star className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Rate</p>
                  <p className="text-2xl font-bold">₹4,500</p>
                </div>
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-bold">₹</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="properties" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="tags">Promotional Tags</TabsTrigger>
            <TabsTrigger value="contact">Contact Approval</TabsTrigger>
          </TabsList>

          {/* Properties Management */}
          <TabsContent value="properties">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Your Properties</CardTitle>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Property
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {properties.map((property) => (
                    <div key={property.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-semibold">{property.name}</h3>
                          <p className="text-sm text-muted-foreground">{property.type}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={property.status === 'active' ? 'default' : 'secondary'}>
                            {property.status}
                          </Badge>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Weekday:</span>
                          <div className="font-semibold">₹{property.weekdayPrice}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Weekend:</span>
                          <div className="font-semibold">₹{property.weekendPrice}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Inquiries:</span>
                          <div className="font-semibold">{property.inquiries}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Reviews:</span>
                          <div className="font-semibold">{property.reviews}</div>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => generateReviewLink(property.id)}
                        >
                          <LinkIcon className="w-4 h-4 mr-1" />
                          Generate Review Link
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Inquiries */}
          <TabsContent value="inquiries">
            <Card>
              <CardHeader>
                <CardTitle>Customer Inquiries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Alert>
                    <MessageSquare className="w-4 h-4" />
                    <AlertDescription>
                      You have 8 new inquiries. Respond quickly to improve your response rate!
                    </AlertDescription>
                  </Alert>
                  
                  <div className="text-center py-12 text-muted-foreground">
                    <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Inquiry management feature coming soon!</p>
                    <p className="text-sm">You'll be able to view and respond to customer inquiries here.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reviews */}
          <TabsContent value="reviews">
            <Card>
              <CardHeader>
                <CardTitle>Customer Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <Star className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No reviews yet</p>
                  <p className="text-sm">Customer reviews will appear here after admin approval.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Promotional Tags */}
          <TabsContent value="tags">
            <Card>
              <CardHeader>
                <CardTitle>Promotional Tags</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Purchase promotional tags to boost your property visibility
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Available Tags */}
                  <div>
                    <h3 className="font-semibold mb-4">Available Tags</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <Card className="border-2 border-dashed">
                        <CardContent className="p-4 text-center">
                          <Star className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
                          <h4 className="font-semibold">Top Rated</h4>
                          <p className="text-2xl font-bold text-primary my-2">₹1,000</p>
                          <Button size="sm" className="w-full">
                            Purchase
                          </Button>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-2 border-dashed">
                        <CardContent className="p-4 text-center">
                          <MessageSquare className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                          <h4 className="font-semibold">Most Reviewed</h4>
                          <p className="text-2xl font-bold text-primary my-2">₹2,000</p>
                          <Button size="sm" className="w-full">
                            Purchase
                          </Button>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-2 border-dashed">
                        <CardContent className="p-4 text-center">
                          <Clock className="w-8 h-8 mx-auto mb-2 text-green-500" />
                          <h4 className="font-semibold">Most Responsive</h4>
                          <p className="text-2xl font-bold text-primary my-2">₹3,000</p>
                          <Button size="sm" className="w-full">
                            Purchase
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Payment Instructions */}
                  <div className="border-t pt-6">
                    <h3 className="font-semibold mb-4">Payment Instructions</h3>
                    <div className="bg-muted p-4 rounded-lg space-y-2">
                      <p className="font-medium">UPI ID: <span className="text-primary">swedsquad@ybl</span></p>
                      <p className="text-sm text-muted-foreground">
                        1. Make payment to the UPI ID above<br />
                        2. Take a screenshot of the payment<br />
                        3. Upload the screenshot here<br />
                        4. Wait for admin approval
                      </p>
                    </div>
                  </div>

                  {/* Pending Requests */}
                  {tagRequests.length > 0 && (
                    <div className="border-t pt-6">
                      <h3 className="font-semibold mb-4">Your Tag Requests</h3>
                      <div className="space-y-3">
                        {tagRequests.map((request) => (
                          <div key={request.id} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium">{request.tagName}</h4>
                                <p className="text-sm text-muted-foreground">₹{request.price}</p>
                              </div>
                              <Badge variant="secondary">
                                <Clock className="w-3 h-3 mr-1" />
                                {request.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Approval */}
          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information Approval</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Submit your contact information for admin approval to display on your listings
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Current Status */}
                  {contactRequests.map((request) => (
                    <div key={request.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold">Contact Information Status</h3>
                        <Badge variant={request.status === 'approved' ? 'default' : 'secondary'}>
                          {request.status === 'approved' ? (
                            <>
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Approved
                            </>
                          ) : request.status === 'rejected' ? (
                            <>
                              <XCircle className="w-3 h-3 mr-1" />
                              Rejected
                            </>
                          ) : (
                            <>
                              <Clock className="w-3 h-3 mr-1" />
                              Pending Approval
                            </>
                          )}
                        </Badge>
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          <span>{request.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          <span>{request.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span>{request.location}</span>
                        </div>
                      </div>
                      
                      {request.status === 'pending' && (
                        <Alert className="mt-4">
                          <Clock className="w-4 h-4" />
                          <AlertDescription>
                            Your contact information is under review. It will be displayed on your listing once approved by admin.
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                  ))}

                  {/* Submit New Request */}
                  <div className="border-t pt-6">
                    <h3 className="font-semibold mb-4">Update Contact Information</h3>
                    <form className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+91 99999 88888"
                            defaultValue="+91 99999 88888"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="your.email@example.com"
                            defaultValue="seller@example.com"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="location">Business Location Name</Label>
                        <Input
                          id="location"
                          placeholder="e.g., Shamirpet, Hyderabad"
                          defaultValue="Shamirpet, Hyderabad"
                        />
                      </div>
                      
                      <Button type="submit">
                        Submit for Approval
                      </Button>
                    </form>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SellerDashboard;