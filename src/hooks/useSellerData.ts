import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export interface Property {
  id: string;
  name: string;
  type: string;
  description: string;
  images: string[];
  weekday_price: number;
  weekend_price: number;
  rating: number;
  review_count: number;
  tags: string[];
  amenities: string[];
  max_guests: number;
  location: string;
  map_embed?: string;
  bedrooms: number;
  bathrooms: number;
  hall: number;
  kitchen: number;
  features: string[];
  contact_approved: boolean;
  active_tags: string[];
  is_active: boolean;
  created_at: string;
}

export interface Inquiry {
  id: string;
  property_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  message: string;
  check_in?: string;
  check_out?: string;
  guests?: number;
  status: 'new' | 'responded' | 'closed';
  created_at: string;
}

export const useSellerData = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [contactRequests, setContactRequests] = useState<any[]>([]);
  const [tagRequests, setTagRequests] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchSellerData = async () => {
    try {
      setLoading(true);
      const user = await supabase.auth.getUser();
      
      if (!user.data.user) {
        throw new Error('Not authenticated');
      }

      const sellerId = user.data.user.id;

      // Fetch all seller-related data
      const [propertiesRes, inquiriesRes, contactRes, tagRes, reviewsRes] = await Promise.all([
        supabase.from('properties').select('*').eq('seller_id', sellerId).order('created_at', { ascending: false }),
        supabase.from('inquiries').select('*').eq('seller_id', sellerId).order('created_at', { ascending: false }),
        supabase.from('contact_requests').select('*').eq('seller_id', sellerId).order('submitted_at', { ascending: false }),
        supabase.from('tag_requests').select('*').eq('seller_id', sellerId).order('submitted_at', { ascending: false }),
        supabase.from('reviews').select('*').order('submitted_at', { ascending: false })
      ]);

      if (propertiesRes.error) throw propertiesRes.error;
      if (inquiriesRes.error) throw inquiriesRes.error;
      if (contactRes.error) throw contactRes.error;
      if (tagRes.error) throw tagRes.error;

      setProperties(propertiesRes.data || []);
      setInquiries(inquiriesRes.data as Inquiry[] || []);
      setContactRequests(contactRes.data || []);
      setTagRequests(tagRes.data || []);
      setReviews(reviewsRes.data || []);
    } catch (error) {
      console.error('Error fetching seller data:', error);
      toast({
        title: "Error",
        description: "Failed to fetch seller data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const submitContactRequest = async (propertyId: string, contactInfo: { phone: string; email: string; location: string }) => {
    try {
      const user = await supabase.auth.getUser();
      if (!user.data.user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('contact_requests')
        .insert({
          property_id: propertyId,
          seller_id: user.data.user.id,
          ...contactInfo
        });

      if (error) throw error;

      await fetchSellerData();
      toast({
        title: "Success",
        description: "Contact request submitted for approval",
      });
    } catch (error) {
      console.error('Error submitting contact request:', error);
      toast({
        title: "Error",
        description: "Failed to submit contact request",
        variant: "destructive"
      });
    }
  };

  const purchaseTag = async (propertyId: string, tagName: string, price: number, paymentScreenshot?: string) => {
    try {
      const user = await supabase.auth.getUser();
      if (!user.data.user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('tag_requests')
        .insert({
          property_id: propertyId,
          seller_id: user.data.user.id,
          tag_name: tagName,
          price,
          payment_screenshot: paymentScreenshot
        });

      if (error) throw error;

      await fetchSellerData();
      toast({
        title: "Success",
        description: "Tag purchase request submitted",
      });
    } catch (error) {
      console.error('Error purchasing tag:', error);
      toast({
        title: "Error",
        description: "Failed to submit tag purchase",
        variant: "destructive"
      });
    }
  };

  const updateInquiryStatus = async (inquiryId: string, status: 'new' | 'responded' | 'closed') => {
    try {
      const { error } = await supabase
        .from('inquiries')
        .update({ status })
        .eq('id', inquiryId);

      if (error) throw error;

      await fetchSellerData();
      toast({
        title: "Success",
        description: "Inquiry status updated",
      });
    } catch (error) {
      console.error('Error updating inquiry:', error);
      toast({
        title: "Error",
        description: "Failed to update inquiry",
        variant: "destructive"
      });
    }
  };

  const generateReviewLink = (propertyId: string) => {
    const link = `${window.location.origin}/review/${propertyId}`;
    navigator.clipboard.writeText(link);
    toast({
      title: "Success",
      description: "Review link copied to clipboard",
    });
  };

  useEffect(() => {
    fetchSellerData();
  }, []);

  return {
    properties,
    inquiries,
    contactRequests,
    tagRequests,
    reviews,
    loading,
    submitContactRequest,
    purchaseTag,
    updateInquiryStatus,
    generateReviewLink,
    refetch: fetchSellerData
  };
};