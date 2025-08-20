import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, XCircle, Clock, Users, Star, DollarSign, FileText } from "lucide-react";
import { useAdminData } from "@/hooks/useAdminData";
import { supabase } from "@/integrations/supabase/client";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const {
    contactRequests,
    tagRequests,
    reviewRequests,
    loading,
    updateContactRequestStatus,
    updateTagRequestStatus,
    updateReviewStatus,
    updateGlobalSetting,
    getSettingValue
  } = useAdminData();
  
  const [newUpiId, setNewUpiId] = useState("");

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("adminLoggedIn");
    navigate("/admin");
  };

  useEffect(() => {
    const checkAuth = async () => {
      const isLoggedIn = localStorage.getItem("adminLoggedIn");
      if (!isLoggedIn) {
        navigate("/admin");
        return;
      }

      // Check if user has admin role
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: roles } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id);
          
        const isAdmin = roles?.some(r => r.role === 'admin');
        if (!isAdmin) {
          localStorage.removeItem("adminLoggedIn");
          navigate("/admin");
        }
      }
    };
    
    checkAuth();
    setNewUpiId(getSettingValue('upi_id'));
  }, [navigate, getSettingValue]);

  const handleApproveContact = (id: string) => {
    updateContactRequestStatus(id, 'approved');
  };

  const handleRejectContact = (id: string, notes?: string) => {
    updateContactRequestStatus(id, 'rejected', notes);
  };

  const handleApproveTag = (id: string) => {
    updateTagRequestStatus(id, 'approved');
  };

  const handleRejectTag = (id: string, notes?: string) => {
    updateTagRequestStatus(id, 'rejected', notes);
  };

  const handleApproveReview = (id: string) => {
    updateReviewStatus(id, 'approved');
  };

  const handleRejectReview = (id: string, notes?: string) => {
    updateReviewStatus(id, 'rejected', notes);
  };

  const handleUpdateUpiId = () => {
    updateGlobalSetting('upi_id', newUpiId);
  };

  const stats = [
    {
      title: "Contact Requests",
      value: contactRequests.filter(r => r.status === 'pending').length.toString(),
      description: "Awaiting approval",
      icon: FileText
    },
    {
      title: "Tag Requests",
      value: tagRequests.filter(r => r.status === 'pending').length.toString(),
      description: "Payment verification needed",
      icon: Users
    },
    {
      title: "Pending Reviews",
      value: reviewRequests.filter(r => r.status === 'pending').length.toString(),
      description: "Awaiting moderation",
      icon: Star
    },
    {
      title: "Total Revenue",
      value: `₹${tagRequests.filter(r => r.status === 'approved').reduce((acc, curr) => acc + curr.price, 0).toLocaleString()}`,
      description: "From approved tags",
      icon: DollarSign
    }
  ];

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-nature">
      <header className="bg-white border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary">Admin Dashboard</h1>
                <p className="text-sm text-muted-foreground">Farm House Rentals Platform</p>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
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

        <Tabs defaultValue="contact" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="contact">Contact Requests</TabsTrigger>
            <TabsTrigger value="tags">Tag Requests</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information Requests</CardTitle>
                <CardDescription>
                  Approve or reject seller contact information for display on listings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactRequests.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">No contact requests yet</p>
                ) : (
                  contactRequests.map((request) => (
                    <div key={request.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">Property ID: {request.property_id}</h4>
                          <p className="text-sm text-muted-foreground">
                            Seller ID: {request.seller_id}
                          </p>
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
                      <div className="bg-muted p-3 rounded">
                        <p><strong>Phone:</strong> {request.phone}</p>
                        <p><strong>Email:</strong> {request.email}</p>
                        <p><strong>Location:</strong> {request.location}</p>
                      </div>
                      {request.admin_notes && (
                        <div className="mt-2 p-2 bg-amber-50 border border-amber-200 rounded">
                          <p className="text-sm"><strong>Admin Notes:</strong> {request.admin_notes}</p>
                        </div>
                      )}
                      {request.status === "pending" && (
                        <div className="flex gap-2 mt-3">
                          <Button 
                            size="sm" 
                            onClick={() => handleApproveContact(request.id)}
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleRejectContact(request.id, "Contact information rejected by admin")}
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tags">
            <Card>
              <CardHeader>
                <CardTitle>Tag Purchase Requests</CardTitle>
                <CardDescription>
                  Review payment screenshots and approve promotional tags
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {tagRequests.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">No tag requests yet</p>
                ) : (
                  tagRequests.map((request) => (
                    <div key={request.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">Property ID: {request.property_id}</h4>
                          <p className="text-sm text-muted-foreground">
                            Tag: {request.tag_name} - ₹{request.price}
                          </p>
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
                      {request.payment_screenshot && (
                        <div className="bg-muted p-3 rounded mb-3">
                          <p><strong>Payment Screenshot:</strong></p>
                          <img 
                            src={request.payment_screenshot} 
                            alt="Payment screenshot" 
                            className="mt-2 max-w-xs border rounded"
                          />
                        </div>
                      )}
                      {request.admin_notes && (
                        <div className="mt-2 p-2 bg-amber-50 border border-amber-200 rounded">
                          <p className="text-sm"><strong>Admin Notes:</strong> {request.admin_notes}</p>
                        </div>
                      )}
                      {request.status === "pending" && (
                        <div className="flex gap-2">
                          <Button 
                            size="sm"
                            onClick={() => handleApproveTag(request.id)}
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleRejectTag(request.id, "Payment verification failed")}
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Reject
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
                <CardTitle>Review Moderation</CardTitle>
                <CardDescription>
                  Moderate customer reviews before they appear on listings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {reviewRequests.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">No reviews to moderate</p>
                ) : (
                  reviewRequests.map((review) => (
                    <div key={review.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">Property ID: {review.property_id}</h4>
                          <p className="text-sm text-muted-foreground">
                            By: {review.customer_name}
                          </p>
                          {review.customer_email && (
                            <p className="text-sm text-muted-foreground">
                              Email: {review.customer_email}
                            </p>
                          )}
                          <div className="flex items-center gap-1">
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
                          <p className="text-sm text-muted-foreground">
                            Submitted: {new Date(review.submitted_at).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge variant={
                          review.status === "pending" ? "secondary" :
                          review.status === "approved" ? "default" : "destructive"
                        }>
                          {review.status}
                        </Badge>
                      </div>
                      <div className="bg-muted p-3 rounded mb-3">
                        <p>{review.comment}</p>
                      </div>
                      {review.admin_notes && (
                        <div className="mt-2 p-2 bg-amber-50 border border-amber-200 rounded">
                          <p className="text-sm"><strong>Admin Notes:</strong> {review.admin_notes}</p>
                        </div>
                      )}
                      {review.status === "pending" && (
                        <div className="flex gap-2">
                          <Button 
                            size="sm"
                            onClick={() => handleApproveReview(review.id)}
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleRejectReview(review.id, "Review contains inappropriate content")}
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Global Settings</CardTitle>
                <CardDescription>
                  Manage platform-wide settings and configurations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="upi-id">UPI ID for Payments</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      id="upi-id"
                      value={newUpiId}
                      onChange={(e) => setNewUpiId(e.target.value)}
                      placeholder="Enter UPI ID"
                    />
                    <Button onClick={handleUpdateUpiId}>Update</Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    This UPI ID will be shown to sellers for tag payments
                  </p>
                </div>
                
                <div className="border-t pt-6">
                  <h3 className="font-medium mb-4">Current Tag Prices</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-muted rounded">
                      <div className="font-medium">Featured</div>
                      <div className="text-2xl font-bold text-primary">₹{getSettingValue('featured_tag_price') || '500'}</div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded">
                      <div className="font-medium">Premium</div>
                      <div className="text-2xl font-bold text-primary">₹{getSettingValue('premium_tag_price') || '300'}</div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded">
                      <div className="font-medium">Trending</div>
                      <div className="text-2xl font-bold text-primary">₹{getSettingValue('trending_tag_price') || '200'}</div>
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