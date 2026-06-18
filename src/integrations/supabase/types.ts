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
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      complaints: {
        Row: {
          bank_name: string
          comments: string
          complaint_id: string
          complaint_type: string
          created_at: string
          district: string
          email: string
          file_url: string | null
          id: string
          name: string
          phone: string
          status: string
        }
        Insert: {
          bank_name: string
          comments: string
          complaint_id: string
          complaint_type: string
          created_at?: string
          district: string
          email: string
          file_url?: string | null
          id?: string
          name: string
          phone: string
          status?: string
        }
        Update: {
          bank_name?: string
          comments?: string
          complaint_id?: string
          complaint_type?: string
          created_at?: string
          district?: string
          email?: string
          file_url?: string | null
          id?: string
          name?: string
          phone?: string
          status?: string
        }
        Relationships: []
      }
      members: {
        Row: {
          address: string | null
          approved_at: string | null
          approved_by: string | null
          blood_group: string | null
          created_at: string
          designation: string | null
          district: string | null
          dob: string | null
          email: string | null
          father_name: string
          full_name: string
          gender: string | null
          id: string
          id_card_url: string | null
          membership_number: string | null
          membership_type: string | null
          mobile_number: string
          photo_url: string | null
          qr_code_url: string | null
          referral_mobile: string | null
          referral_name: string | null
          state: string | null
          status: Database["public"]["Enums"]["member_status"]
          taluk: string | null
          updated_at: string
          village: string | null
          voter_id_number: string
          voter_id_url: string | null
          whatsapp_number: string | null
        }
        Insert: {
          address?: string | null
          approved_at?: string | null
          approved_by?: string | null
          blood_group?: string | null
          created_at?: string
          designation?: string | null
          district?: string | null
          dob?: string | null
          email?: string | null
          father_name: string
          full_name: string
          gender?: string | null
          id?: string
          id_card_url?: string | null
          membership_number?: string | null
          membership_type?: string | null
          mobile_number: string
          photo_url?: string | null
          qr_code_url?: string | null
          referral_mobile?: string | null
          referral_name?: string | null
          state?: string | null
          status?: Database["public"]["Enums"]["member_status"]
          taluk?: string | null
          updated_at?: string
          village?: string | null
          voter_id_number: string
          voter_id_url?: string | null
          whatsapp_number?: string | null
        }
        Update: {
          address?: string | null
          approved_at?: string | null
          approved_by?: string | null
          blood_group?: string | null
          created_at?: string
          designation?: string | null
          district?: string | null
          dob?: string | null
          email?: string | null
          father_name?: string
          full_name?: string
          gender?: string | null
          id?: string
          id_card_url?: string | null
          membership_number?: string | null
          membership_type?: string | null
          mobile_number?: string
          photo_url?: string | null
          qr_code_url?: string | null
          referral_mobile?: string | null
          referral_name?: string | null
          state?: string | null
          status?: Database["public"]["Enums"]["member_status"]
          taluk?: string | null
          updated_at?: string
          village?: string | null
          voter_id_number?: string
          voter_id_url?: string | null
          whatsapp_number?: string | null
        }
        Relationships: []
      }
      party_registrations: {
        Row: {
          address: string | null
          created_at: string
          date_of_birth: string
          designation: string
          full_name: string
          id: string
          location: string
          mobile_number: string
        }
        Insert: {
          address?: string | null
          created_at?: string
          date_of_birth: string
          designation: string
          full_name: string
          id?: string
          location: string
          mobile_number: string
        }
        Update: {
          address?: string | null
          created_at?: string
          date_of_birth?: string
          designation?: string
          full_name?: string
          id?: string
          location?: string
          mobile_number?: string
        }
        Relationships: []
      }
      registrations: {
        Row: {
          address: string | null
          age: number | null
          created_at: string
          district: string
          email: string | null
          id: string
          interest: string
          mobile: string
          name: string
          occupation: string | null
        }
        Insert: {
          address?: string | null
          age?: number | null
          created_at?: string
          district: string
          email?: string | null
          id?: string
          interest?: string
          mobile: string
          name: string
          occupation?: string | null
        }
        Update: {
          address?: string | null
          age?: number | null
          created_at?: string
          district?: string
          email?: string | null
          id?: string
          interest?: string
          mobile?: string
          name?: string
          occupation?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      public_members: {
        Row: {
          approved_at: string | null
          blood_group: string | null
          designation: string | null
          district: string | null
          full_name: string | null
          membership_number: string | null
          photo_url: string | null
        }
        Insert: {
          approved_at?: string | null
          blood_group?: string | null
          designation?: string | null
          district?: string | null
          full_name?: string | null
          membership_number?: string | null
          photo_url?: string | null
        }
        Update: {
          approved_at?: string | null
          blood_group?: string | null
          designation?: string | null
          district?: string | null
          full_name?: string | null
          membership_number?: string | null
          photo_url?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      approve_member: { Args: { _member_id: string }; Returns: string }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      member_status: "Pending" | "Approved" | "Rejected" | "Suspended"
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
      app_role: ["admin", "moderator", "user"],
      member_status: ["Pending", "Approved", "Rejected", "Suspended"],
    },
  },
} as const
