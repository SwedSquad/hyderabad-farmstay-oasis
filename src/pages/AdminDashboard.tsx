import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Home, 
  Users, 
  Star, 
  MessageSquare, 
  Phone, 
  Mail, 
  MapPin, 
  Settings,
  LogOut,
  CheckCircle,
  XCircle,
  Clock,
  IndianRupee
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [upiId, setUpiId] = useState("swedsquad@ybl");

  // Check authentication
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("adminLoggedIn");
    if (!isLoggedIn) {
      navigate("/admin");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    navigate("/admin");
  };

  // Mock data for demo
  const [contactRequests] = useState([
    {
      id: 1,
      propertyId: "farm-feast",
      propertyName: "Farm Feast Farm House",
      sellerName: "Rajesh Kumar",
      phone: "+91 99999 88888",
      email: "rajesh@example.com",
      location: "Shamirpet, Hyderabad",
      status: "pending",
      submittedAt: "2024-01-15"
    },
    {
      id: 2,
      propertyId: "farm-oxygen",
      propertyName: "Farm Oxygen",
      sellerName: "Priya Sharma",
      phone: "+91 88888 77777",
      email: "priya@example.com",
      location: "Kompally, Hyderabad",
      status: "approved",
      submittedAt: "2024-01-14"
    }
  ]);

  const [tagRequests] = useState([
    {
      id: 1,
      propertyId: "farm-classy-nature",
      propertyName: "Farm Classy Nature",
      tagName: "Top Rated",
      price: 1000,
      paymentScreenshot: "screenshot1.jpg",
      status: "pending",
      submittedAt: "2024-01-15"
    }
  ]);

  const [reviews] = useState([
    {
      id: 1,
      propertyId: "farm-feast",
      propertyName: "Farm Feast Farm House",
      customerName: "Amit Patel",
      rating: 5,
      comment: "Amazing place for family vacation. Highly recommended!",
      status: "pending",
      submittedAt: "2024-01-15"
    }
  ]);

  const stats = [
    { title: "Total Properties", value: "3", icon: Home, color: "text-blue-600" },
    { title: "Active Bookings", value: "12", icon: Users, color: "text-green-600" },
    { title: "Pending Reviews", value: "8", icon: MessageSquare, color: "text-orange-600" },
    { title: "Total Revenue", value: "₹2,45,000", icon: IndianRupee, color: "text-purple-600" },
  ];

  return (
    <div className="min-h-screen bg-gradient-nature">
      {/* Header */}
      <header className="bg-white border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center">
                <Home className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary">Admin Dashboard</h1>
                <p className="text-sm text-muted-foreground">Farm House Rentals</p>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="shadow-card">
              <CardContent className="flex items-center p-6">
                <div className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center mr-4`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="contact-requests" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="contact-requests">Contact Requests</TabsTrigger>
            <TabsTrigger value="tag-requests">Tag Requests</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Contact Requests */}
          <TabsContent value="contact-requests">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="w-5 h-5 mr-2" />
                  Contact Information Approval Requests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contactRequests.map((request) => (
                    <div key={request.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{request.propertyName}</h3>
                          <p className="text-sm text-muted-foreground">Seller: {request.sellerName}</p>
                        </div>
                        <Badge variant={request.status === 'approved' ? 'default' : 'secondary'}>
                          {request.status === 'approved' ? (
                            <>
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Approved
                            </>
                          ) : (
                            <>
                              <Clock className="w-3 h-3 mr-1" />
                              Pending
                            </>
                          )}
                        </Badge>
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 mr-2 text-muted-foreground" />
                          {request.phone}
                        </div>
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
                          {request.email}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                          {request.location}
                        </div>
                      </div>
                      
                      {request.status === 'pending' && (
                        <div className="flex space-x-2">
                          <Button variant="nature" size="sm">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button variant="destructive" size="sm">
                            <XCircle className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tag Requests */}
          <TabsContent value="tag-requests">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="w-5 h-5 mr-2" />
                  Promotional Tag Requests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tagRequests.map((request) => (
                    <div key={request.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{request.propertyName}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="outline">{request.tagName}</Badge>
                            <span className="text-sm text-muted-foreground">₹{request.price}</span>
                          </div>
                        </div>
                        <Badge variant="secondary">
                          <Clock className="w-3 h-3 mr-1" />
                          Pending
                        </Badge>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <span>Payment Screenshot: {request.paymentScreenshot}</span>
                        <Button variant="link" size="sm" className="h-auto p-0">
                          View
                        </Button>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button variant="nature" size="sm">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Approve & Apply Tag
                        </Button>
                        <Button variant="destructive" size="sm">
                          <XCircle className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reviews */}
          <TabsContent value="reviews">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Customer Reviews Approval
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{review.propertyName}</h3>
                          <p className="text-sm text-muted-foreground">By: {review.customerName}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <Badge variant="secondary">
                            <Clock className="w-3 h-3 mr-1" />
                            Pending
                          </Badge>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground bg-muted p-3 rounded">
                        "{review.comment}"
                      </p>
                      
                      <div className="flex space-x-2">
                        <Button variant="nature" size="sm">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Approve Review
                        </Button>
                        <Button variant="destructive" size="sm">
                          <XCircle className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  Global Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="upi-id">Global UPI ID for Tag Payments</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="upi-id"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="Enter UPI ID"
                    />
                    <Button variant="nature">Save</Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    This UPI ID will be used for all promotional tag payment requests.
                  </p>
                </div>
                
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Tag Pricing</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-muted rounded">
                      <span>⭐ Top Rated</span>
                      <span className="font-semibold">₹1,000</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted rounded">
                      <span>⭐⭐ Most Reviewed</span>
                      <span className="font-semibold">₹2,000</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted rounded">
                      <span>⭐⭐⭐ Most Responsive</span>
                      <span className="font-semibold">₹3,000</span>
                    </div>
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

export default AdminDashboard;