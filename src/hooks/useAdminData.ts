import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export interface ContactRequest {
  id: string;
  property_id: string;
  seller_id: string;
  phone: string;
  email: string;
  location: string;
  status: 'pending' | 'approved' | 'rejected';
  admin_notes?: string;
  submitted_at: string;
  reviewed_at?: string;
  reviewed_by?: string;
}

export interface TagRequest {
  id: string;
  property_id: string;
  seller_id: string;
  tag_name: string;
  price: number;
  payment_screenshot?: string;
  status: 'pending' | 'approved' | 'rejected';
  admin_notes?: string;
  submitted_at: string;
  reviewed_at?: string;
  reviewed_by?: string;
}

export interface ReviewRequest {
  id: string;
  property_id: string;
  customer_name: string;
  customer_email?: string;
  rating: number;
  comment: string;
  status: 'pending' | 'approved' | 'rejected';
  admin_notes?: string;
  submitted_at: string;
  reviewed_at?: string;
  reviewed_by?: string;
}

export interface GlobalSettings {
  setting_key: string;
  setting_value: string;
}

export const useAdminData = () => {
  const [contactRequests, setContactRequests] = useState<ContactRequest[]>([]);
  const [tagRequests, setTagRequests] = useState<TagRequest[]>([]);
  const [reviewRequests, setReviewRequests] = useState<ReviewRequest[]>([]);
  const [globalSettings, setGlobalSettings] = useState<GlobalSettings[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      
      // Fetch all requests and settings
      const [contactRes, tagRes, reviewRes, settingsRes] = await Promise.all([
        supabase.from('contact_requests').select('*').order('submitted_at', { ascending: false }),
        supabase.from('tag_requests').select('*').order('submitted_at', { ascending: false }),
        supabase.from('reviews').select('*').order('submitted_at', { ascending: false }),
        supabase.from('global_settings').select('*')
      ]);

      if (contactRes.error) throw contactRes.error;
      if (tagRes.error) throw tagRes.error;
      if (reviewRes.error) throw reviewRes.error;
      if (settingsRes.error) throw settingsRes.error;

      setContactRequests(contactRes.data as ContactRequest[] || []);
      setTagRequests(tagRes.data as TagRequest[] || []);
      setReviewRequests(reviewRes.data as ReviewRequest[] || []);
      setGlobalSettings(settingsRes.data || []);
    } catch (error) {
      console.error('Error fetching admin data:', error);
      toast({
        title: "Error",
        description: "Failed to fetch admin data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateContactRequestStatus = async (id: string, status: 'approved' | 'rejected', notes?: string) => {
    try {
      const { error } = await supabase
        .from('contact_requests')
        .update({
          status,
          admin_notes: notes,
          reviewed_at: new Date().toISOString(),
          reviewed_by: (await supabase.auth.getUser()).data.user?.id
        })
        .eq('id', id);

      if (error) throw error;

      // Update property if approved
      if (status === 'approved') {
        const request = contactRequests.find(r => r.id === id);
        if (request) {
          await supabase
            .from('properties')
            .update({ contact_approved: true })
            .eq('id', request.property_id);
        }
      }

      await fetchAdminData();
      toast({
        title: "Success",
        description: `Contact request ${status}`,
      });
    } catch (error) {
      console.error('Error updating contact request:', error);
      toast({
        title: "Error",
        description: "Failed to update contact request",
        variant: "destructive"
      });
    }
  };

  const updateTagRequestStatus = async (id: string, status: 'approved' | 'rejected', notes?: string) => {
    try {
      const { error } = await supabase
        .from('tag_requests')
        .update({
          status,
          admin_notes: notes,
          reviewed_at: new Date().toISOString(),
          reviewed_by: (await supabase.auth.getUser()).data.user?.id
        })
        .eq('id', id);

      if (error) throw error;

      // Update property with tag if approved
      if (status === 'approved') {
        const request = tagRequests.find(r => r.id === id);
        if (request) {
          const { data: property } = await supabase
            .from('properties')
            .select('active_tags')
            .eq('id', request.property_id)
            .single();

          if (property) {
            const newTags = [...(property.active_tags || []), request.tag_name];
            await supabase
              .from('properties')
              .update({ active_tags: newTags })
              .eq('id', request.property_id);
          }
        }
      }

      await fetchAdminData();
      toast({
        title: "Success",
        description: `Tag request ${status}`,
      });
    } catch (error) {
      console.error('Error updating tag request:', error);
      toast({
        title: "Error",
        description: "Failed to update tag request",
        variant: "destructive"
      });
    }
  };

  const updateReviewStatus = async (id: string, status: 'approved' | 'rejected', notes?: string) => {
    try {
      const { error } = await supabase
        .from('reviews')
        .update({
          status,
          admin_notes: notes,
          reviewed_at: new Date().toISOString(),
          reviewed_by: (await supabase.auth.getUser()).data.user?.id
        })
        .eq('id', id);

      if (error) throw error;

      await fetchAdminData();
      toast({
        title: "Success",
        description: `Review ${status}`,
      });
    } catch (error) {
      console.error('Error updating review:', error);
      toast({
        title: "Error",
        description: "Failed to update review",
        variant: "destructive"
      });
    }
  };

  const updateGlobalSetting = async (key: string, value: string) => {
    try {
      const { error } = await supabase
        .from('global_settings')
        .upsert({ setting_key: key, setting_value: value })
        .eq('setting_key', key);

      if (error) throw error;

      await fetchAdminData();
      toast({
        title: "Success",
        description: "Setting updated successfully",
      });
    } catch (error) {
      console.error('Error updating setting:', error);
      toast({
        title: "Error",
        description: "Failed to update setting",
        variant: "destructive"
      });
    }
  };

  const getSettingValue = (key: string) => {
    const setting = globalSettings.find(s => s.setting_key === key);
    return setting?.setting_value || '';
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  return {
    contactRequests,
    tagRequests,
    reviewRequests,
    globalSettings,
    loading,
    updateContactRequestStatus,
    updateTagRequestStatus,
    updateReviewStatus,
    updateGlobalSetting,
    getSettingValue,
    refetch: fetchAdminData
  };
};