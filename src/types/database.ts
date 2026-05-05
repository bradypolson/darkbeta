export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      organizations: {
        Row: {
          id: string;
          name: string;
          slug: string;
          industry: string | null;
          employee_count: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["organizations"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["organizations"]["Insert"]>;
      };
      frameworks: {
        Row: {
          id: string;
          key: string;
          name: string;
          description: string;
          version: string | null;
          category: string;
          total_controls: number;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["frameworks"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["frameworks"]["Insert"]>;
      };
      organization_frameworks: {
        Row: {
          id: string;
          organization_id: string;
          framework_id: string;
          status: "active" | "inactive" | "archived";
          assigned_at: string;
          due_date: string | null;
          owner_id: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["organization_frameworks"]["Row"], "id" | "assigned_at">;
        Update: Partial<Database["public"]["Tables"]["organization_frameworks"]["Insert"]>;
      };
      controls: {
        Row: {
          id: string;
          framework_id: string;
          control_id: string;
          title: string;
          description: string;
          category: string;
          subcategory: string | null;
          priority: "critical" | "high" | "medium" | "low";
          guidance: string | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["controls"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["controls"]["Insert"]>;
      };
      control_responses: {
        Row: {
          id: string;
          organization_id: string;
          control_id: string;
          status: "not_started" | "in_progress" | "compliant" | "non_compliant" | "not_applicable";
          notes: string | null;
          owner_id: string | null;
          due_date: string | null;
          completed_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["control_responses"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["control_responses"]["Insert"]>;
      };
      evidence: {
        Row: {
          id: string;
          organization_id: string;
          control_response_id: string;
          title: string;
          description: string | null;
          file_url: string | null;
          file_name: string | null;
          file_size: number | null;
          evidence_type: "document" | "screenshot" | "policy" | "procedure" | "other";
          uploaded_by: string | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["evidence"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["evidence"]["Insert"]>;
      };
      audit_log: {
        Row: {
          id: string;
          organization_id: string;
          user_id: string | null;
          action: string;
          resource_type: string;
          resource_id: string | null;
          metadata: Json | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["audit_log"]["Row"], "id" | "created_at">;
        Update: never;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      control_status: "not_started" | "in_progress" | "compliant" | "non_compliant" | "not_applicable";
      control_priority: "critical" | "high" | "medium" | "low";
    };
  };
}
