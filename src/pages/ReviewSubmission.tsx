import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Star, Send, CheckCircle, Upload } from "lucide-react";
import { properties } from "@/data/properties";

const ReviewSubmission = () => {
  const { propertyId } = useParams();
  const property = properties.find(p => p.id === propertyId);
  const [submitted, setSubmitted] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    name: "",
    rating: 0,
    comment: "",
    image: null as File | null
  });

  if (!property) {
    return (
      <div className="min-h-screen bg-gradient-nature flex items-center justify-center p-4">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center">
            <h1 className="text-2xl font-bold mb-4">Property Not Found</h1>
            <p className="text-muted-foreground">The review link you're trying to access is invalid.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In real app, send review to backend
  };

  const handleRatingClick = (rating: number) => {
    setReviewForm(prev => ({ ...prev, rating }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setReviewForm(prev => ({ ...prev, image: file }));
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-nature flex items-center justify-center p-4">
        <Card className="max-w-md shadow-nature">
          <CardContent className="p-6 text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-4">Thank You!</h1>
            <p className="text-muted-foreground mb-6">
              Your review has been submitted and is pending admin approval. 
              It will be published once reviewed.
            </p>
            <Button onClick={() => window.close()}>
              Close
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-nature p-4">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-nature">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Write a Review</CardTitle>
            <p className="text-muted-foreground">Share your experience at {property.name}</p>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <img
                src={property.images[0]}
                alt={property.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold">{property.name}</h3>
              <p className="text-muted-foreground">{property.type} • {property.location}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label>Your Name</Label>
                <Input
                  value={reviewForm.name}
                  onChange={(e) => setReviewForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <Label className="block mb-3">Rating</Label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRatingClick(star)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= reviewForm.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300 hover:text-yellow-400'
                        } transition-colors`}
                      />
                    </button>
                  ))}
                </div>
                {reviewForm.rating === 0 && (
                  <p className="text-sm text-red-500 mt-1">Please select a rating</p>
                )}
              </div>

              <div>
                <Label htmlFor="comment">Your Review</Label>
                <Textarea
                  id="comment"
                  value={reviewForm.comment}
                  onChange={(e) => setReviewForm(prev => ({ ...prev, comment: e.target.value }))}
                  placeholder="Tell us about your experience at this property..."
                  rows={5}
                  required
                />
              </div>

              <div>
                <Label htmlFor="image">Upload Photo (Optional)</Label>
                <div className="mt-2">
                  <label htmlFor="image" className="cursor-pointer">
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                      {reviewForm.image ? (
                        <div>
                          <Upload className="w-8 h-8 mx-auto mb-2 text-green-600" />
                          <p className="text-sm">Photo selected: {reviewForm.image.name}</p>
                        </div>
                      ) : (
                        <div>
                          <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">
                            Click to upload a photo from your stay
                          </p>
                        </div>
                      )}
                    </div>
                  </label>
                  <input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              </div>

              <Alert>
                <AlertDescription>
                  Your review will be submitted for admin approval before being published on the website.
                </AlertDescription>
              </Alert>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={reviewForm.rating === 0}
              >
                <Send className="w-4 h-4 mr-2" />
                Submit Review
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReviewSubmission;