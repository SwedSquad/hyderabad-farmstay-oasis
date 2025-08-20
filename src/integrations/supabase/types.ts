export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      contact_requests: {
        Row: {
          admin_notes: string | null
          email: string
          id: string
          location: string
          phone: string
          property_id: string
          reviewed_at: string | null
          reviewed_by: string | null
          seller_id: string
          status: string
          submitted_at: string
        }
        Insert: {
          admin_notes?: string | null
          email: string
          id?: string
          location: string
          phone: string
          property_id: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          seller_id: string
          status?: string
          submitted_at?: string
        }
        Update: {
          admin_notes?: string | null
          email?: string
          id?: string
          location?: string
          phone?: string
          property_id?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          seller_id?: string
          status?: string
          submitted_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "contact_requests_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      global_settings: {
        Row: {
          created_at: string
          id: string
          setting_key: string
          setting_value: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          setting_key: string
          setting_value: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          setting_key?: string
          setting_value?: string
          updated_at?: string
        }
        Relationships: []
      }
      inquiries: {
        Row: {
          check_in: string | null
          check_out: string | null
          created_at: string
          customer_email: string
          customer_name: string
          customer_phone: string
          guests: number | null
          id: string
          message: string
          property_id: string
          seller_id: string
          status: string
          updated_at: string
        }
        Insert: {
          check_in?: string | null
          check_out?: string | null
          created_at?: string
          customer_email: string
          customer_name: string
          customer_phone: string
          guests?: number | null
          id?: string
          message: string
          property_id: string
          seller_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          check_in?: string | null
          check_out?: string | null
          created_at?: string
          customer_email?: string
          customer_name?: string
          customer_phone?: string
          guests?: number | null
          id?: string
          message?: string
          property_id?: string
          seller_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "inquiries_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          full_name: string | null
          id: string
          is_online: boolean | null
          latitude: number | null
          location: string | null
          longitude: number | null
          phone: string | null
          updated_at: string | null
          user_id: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          is_online?: boolean | null
          latitude?: number | null
          location?: string | null
          longitude?: number | null
          phone?: string | null
          updated_at?: string | null
          user_id: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          is_online?: boolean | null
          latitude?: number | null
          location?: string | null
          longitude?: number | null
          phone?: string | null
          updated_at?: string | null
          user_id?: string
          username?: string | null
        }
        Relationships: []
      }
      properties: {
        Row: {
          active_tags: string[] | null
          amenities: string[]
          bathrooms: number
          bedrooms: number
          contact_approved: boolean | null
          created_at: string
          description: string
          features: string[] | null
          hall: number
          id: string
          images: string[]
          is_active: boolean | null
          kitchen: number
          location: string
          map_embed: string | null
          max_guests: number
          name: string
          rating: number | null
          review_count: number | null
          seller_id: string
          tags: string[] | null
          type: string
          updated_at: string
          weekday_price: number
          weekend_price: number
        }
        Insert: {
          active_tags?: string[] | null
          amenities: string[]
          bathrooms: number
          bedrooms: number
          contact_approved?: boolean | null
          created_at?: string
          description: string
          features?: string[] | null
          hall: number
          id?: string
          images: string[]
          is_active?: boolean | null
          kitchen: number
          location: string
          map_embed?: string | null
          max_guests: number
          name: string
          rating?: number | null
          review_count?: number | null
          seller_id: string
          tags?: string[] | null
          type: string
          updated_at?: string
          weekday_price: number
          weekend_price: number
        }
        Update: {
          active_tags?: string[] | null
          amenities?: string[]
          bathrooms?: number
          bedrooms?: number
          contact_approved?: boolean | null
          created_at?: string
          description?: string
          features?: string[] | null
          hall?: number
          id?: string
          images?: string[]
          is_active?: boolean | null
          kitchen?: number
          location?: string
          map_embed?: string | null
          max_guests?: number
          name?: string
          rating?: number | null
          review_count?: number | null
          seller_id?: string
          tags?: string[] | null
          type?: string
          updated_at?: string
          weekday_price?: number
          weekend_price?: number
        }
        Relationships: []
      }
      reviews: {
        Row: {
          admin_notes: string | null
          comment: string
          customer_email: string | null
          customer_name: string
          id: string
          property_id: string
          rating: number
          reviewed_at: string | null
          reviewed_by: string | null
          status: string
          submitted_at: string
        }
        Insert: {
          admin_notes?: string | null
          comment: string
          customer_email?: string | null
          customer_name: string
          id?: string
          property_id: string
          rating: number
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          submitted_at?: string
        }
        Update: {
          admin_notes?: string | null
          comment?: string
          customer_email?: string | null
          customer_name?: string
          id?: string
          property_id?: string
          rating?: number
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          submitted_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      tag_requests: {
        Row: {
          admin_notes: string | null
          id: string
          payment_screenshot: string | null
          price: number
          property_id: string
          reviewed_at: string | null
          reviewed_by: string | null
          seller_id: string
          status: string
          submitted_at: string
          tag_name: string
        }
        Insert: {
          admin_notes?: string | null
          id?: string
          payment_screenshot?: string | null
          price: number
          property_id: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          seller_id: string
          status?: string
          submitted_at?: string
          tag_name: string
        }
        Update: {
          admin_notes?: string | null
          id?: string
          payment_screenshot?: string | null
          price?: number
          property_id?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          seller_id?: string
          status?: string
          submitted_at?: string
          tag_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "tag_requests_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "service_provider" | "customer"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "service_provider", "customer"],
    },
  },
} as const
