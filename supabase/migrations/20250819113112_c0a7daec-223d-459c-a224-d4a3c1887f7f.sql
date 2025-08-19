-- Create tables for the admin and seller dashboard workflow system

-- Global settings table for admin-managed configurations
CREATE TABLE public.global_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  setting_key TEXT NOT NULL UNIQUE,
  setting_value TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Properties table to store property listings
CREATE TABLE public.properties (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  seller_id UUID NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  description TEXT NOT NULL,
  images TEXT[] NOT NULL,
  weekday_price NUMERIC NOT NULL,
  weekend_price NUMERIC NOT NULL,
  rating NUMERIC DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  tags TEXT[] DEFAULT '{}',
  amenities TEXT[] NOT NULL,
  max_guests INTEGER NOT NULL,
  location TEXT NOT NULL,
  map_embed TEXT,
  bedrooms INTEGER NOT NULL,
  bathrooms INTEGER NOT NULL,
  hall INTEGER NOT NULL,
  kitchen INTEGER NOT NULL,
  features TEXT[] DEFAULT '{}',
  contact_approved BOOLEAN DEFAULT false,
  active_tags TEXT[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Contact requests table for seller contact approval workflow
CREATE TABLE public.contact_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  seller_id UUID NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  location TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  admin_notes TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewed_by UUID
);

-- Tag requests table for promotional tag purchase workflow
CREATE TABLE public.tag_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  seller_id UUID NOT NULL,
  tag_name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  payment_screenshot TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  admin_notes TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewed_by UUID
);

-- Reviews table for customer review management
CREATE TABLE public.reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  customer_email TEXT,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  admin_notes TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewed_by UUID
);

-- Inquiries table for customer inquiries to sellers
CREATE TABLE public.inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  seller_id UUID NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  message TEXT NOT NULL,
  check_in DATE,
  check_out DATE,
  guests INTEGER,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'responded', 'closed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.global_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tag_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- RLS Policies for global_settings (admin only)
CREATE POLICY "Admins can manage global settings" 
ON public.global_settings 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Everyone can view global settings" 
ON public.global_settings 
FOR SELECT 
USING (true);

-- RLS Policies for properties
CREATE POLICY "Everyone can view active properties" 
ON public.properties 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Sellers can manage their own properties" 
ON public.properties 
FOR ALL 
USING (auth.uid() = seller_id);

CREATE POLICY "Admins can manage all properties" 
ON public.properties 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for contact_requests
CREATE POLICY "Sellers can view their own contact requests" 
ON public.contact_requests 
FOR SELECT 
USING (auth.uid() = seller_id);

CREATE POLICY "Sellers can create their own contact requests" 
ON public.contact_requests 
FOR INSERT 
WITH CHECK (auth.uid() = seller_id);

CREATE POLICY "Admins can manage all contact requests" 
ON public.contact_requests 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for tag_requests
CREATE POLICY "Sellers can view their own tag requests" 
ON public.tag_requests 
FOR SELECT 
USING (auth.uid() = seller_id);

CREATE POLICY "Sellers can create their own tag requests" 
ON public.tag_requests 
FOR INSERT 
WITH CHECK (auth.uid() = seller_id);

CREATE POLICY "Admins can manage all tag requests" 
ON public.tag_requests 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for reviews
CREATE POLICY "Everyone can view approved reviews" 
ON public.reviews 
FOR SELECT 
USING (status = 'approved');

CREATE POLICY "Anyone can create reviews" 
ON public.reviews 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admins can manage all reviews" 
ON public.reviews 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for inquiries
CREATE POLICY "Sellers can view their own inquiries" 
ON public.inquiries 
FOR SELECT 
USING (auth.uid() = seller_id);

CREATE POLICY "Anyone can create inquiries" 
ON public.inquiries 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Sellers can update their own inquiries" 
ON public.inquiries 
FOR UPDATE 
USING (auth.uid() = seller_id);

CREATE POLICY "Admins can manage all inquiries" 
ON public.inquiries 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create triggers for updated_at columns
CREATE TRIGGER update_global_settings_updated_at
BEFORE UPDATE ON public.global_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_properties_updated_at
BEFORE UPDATE ON public.properties
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_inquiries_updated_at
BEFORE UPDATE ON public.inquiries
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default global settings
INSERT INTO public.global_settings (setting_key, setting_value) VALUES
('upi_id', 'admin@example.com'),
('featured_tag_price', '500'),
('premium_tag_price', '300'),
('trending_tag_price', '200'),
('admin_email', 'admin@farmstay.com'),
('platform_name', 'FarmStay Platform');

-- Insert sample property data from existing properties.ts
INSERT INTO public.properties (id, seller_id, name, type, description, images, weekday_price, weekend_price, rating, review_count, tags, amenities, max_guests, location, map_embed, bedrooms, bathrooms, hall, kitchen, features) VALUES
('1', '00000000-0000-0000-0000-000000000001', 'Rustic Farm House Retreat', 'Farm House', 'Experience authentic farm life in our beautifully restored 19th-century farmhouse. Surrounded by rolling hills and organic gardens, this peaceful retreat offers the perfect escape from city life. Wake up to the sound of roosters and enjoy fresh farm-to-table meals.', ARRAY['/src/assets/hero-farmhouse.jpg'], 2500, 3500, 4.8, 24, ARRAY['Farm-to-Table', 'Organic'], ARRAY['WiFi', 'Kitchen', 'Garden', 'Parking', 'Pet Friendly'], 8, 'Lonavala, Maharashtra', '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.8!2d73.4!3d18.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDQyJzAwLjAiTiA3M8KwMjQnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890" width="100%" height="200" style="border:0;" allowfullscreen="" loading="lazy"></iframe>', 3, 2, 1, 1, ARRAY['Fireplace', 'Mountain View', 'Organic Garden', 'Farm Animals']);