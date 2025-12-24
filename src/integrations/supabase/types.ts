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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      activities: {
        Row: {
          activity_date: string | null
          activity_type: string | null
          calories_burned: number | null
          created_at: string | null
          distance: number | null
          duration_minutes: number | null
          id: string
          notes: string | null
          title: string
          user_id: string
        }
        Insert: {
          activity_date?: string | null
          activity_type?: string | null
          calories_burned?: number | null
          created_at?: string | null
          distance?: number | null
          duration_minutes?: number | null
          id?: string
          notes?: string | null
          title: string
          user_id: string
        }
        Update: {
          activity_date?: string | null
          activity_type?: string | null
          calories_burned?: number | null
          created_at?: string | null
          distance?: number | null
          duration_minutes?: number | null
          id?: string
          notes?: string | null
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      books: {
        Row: {
          author: string | null
          cover_url: string | null
          created_at: string | null
          current_page: number | null
          finished_at: string | null
          id: string
          notes: string | null
          rating: number | null
          started_at: string | null
          status: string | null
          title: string
          total_pages: number | null
          user_id: string
        }
        Insert: {
          author?: string | null
          cover_url?: string | null
          created_at?: string | null
          current_page?: number | null
          finished_at?: string | null
          id?: string
          notes?: string | null
          rating?: number | null
          started_at?: string | null
          status?: string | null
          title: string
          total_pages?: number | null
          user_id: string
        }
        Update: {
          author?: string | null
          cover_url?: string | null
          created_at?: string | null
          current_page?: number | null
          finished_at?: string | null
          id?: string
          notes?: string | null
          rating?: number | null
          started_at?: string | null
          status?: string | null
          title?: string
          total_pages?: number | null
          user_id?: string
        }
        Relationships: []
      }
      categories: {
        Row: {
          color: string | null
          created_at: string | null
          icon: string | null
          id: string
          name: string
          user_id: string
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          icon?: string | null
          id?: string
          name: string
          user_id: string
        }
        Update: {
          color?: string | null
          created_at?: string | null
          icon?: string | null
          id?: string
          name?: string
          user_id?: string
        }
        Relationships: []
      }
      goal_milestones: {
        Row: {
          completed: boolean | null
          completed_at: string | null
          created_at: string | null
          goal_id: string
          id: string
          sort_order: number | null
          title: string
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          goal_id: string
          id?: string
          sort_order?: number | null
          title: string
          user_id: string
        }
        Update: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          goal_id?: string
          id?: string
          sort_order?: number | null
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "goal_milestones_goal_id_fkey"
            columns: ["goal_id"]
            isOneToOne: false
            referencedRelation: "goals"
            referencedColumns: ["id"]
          },
        ]
      }
      goals: {
        Row: {
          category: string | null
          category_color: string | null
          created_at: string | null
          description: string | null
          id: string
          progress: number | null
          status: string | null
          target_date: string | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          category?: string | null
          category_color?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          progress?: number | null
          status?: string | null
          target_date?: string | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          category?: string | null
          category_color?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          progress?: number | null
          status?: string | null
          target_date?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      habit_completions: {
        Row: {
          completed_date: string
          count: number | null
          created_at: string | null
          habit_id: string
          id: string
          notes: string | null
          user_id: string
        }
        Insert: {
          completed_date: string
          count?: number | null
          created_at?: string | null
          habit_id: string
          id?: string
          notes?: string | null
          user_id: string
        }
        Update: {
          completed_date?: string
          count?: number | null
          created_at?: string | null
          habit_id?: string
          id?: string
          notes?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "habit_completions_habit_id_fkey"
            columns: ["habit_id"]
            isOneToOne: false
            referencedRelation: "habits"
            referencedColumns: ["id"]
          },
        ]
      }
      habits: {
        Row: {
          best_streak: number | null
          category: string | null
          created_at: string | null
          description: string | null
          emoji: string | null
          frequency: string | null
          id: string
          name: string
          streak: number | null
          target_count: number | null
          user_id: string
        }
        Insert: {
          best_streak?: number | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          emoji?: string | null
          frequency?: string | null
          id?: string
          name: string
          streak?: number | null
          target_count?: number | null
          user_id: string
        }
        Update: {
          best_streak?: number | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          emoji?: string | null
          frequency?: string | null
          id?: string
          name?: string
          streak?: number | null
          target_count?: number | null
          user_id?: string
        }
        Relationships: []
      }
      health_logs: {
        Row: {
          created_at: string | null
          id: string
          log_date: string | null
          mood: string | null
          notes: string | null
          sleep_hours: number | null
          steps: number | null
          user_id: string
          water_glasses: number | null
          weight: number | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          log_date?: string | null
          mood?: string | null
          notes?: string | null
          sleep_hours?: number | null
          steps?: number | null
          user_id: string
          water_glasses?: number | null
          weight?: number | null
        }
        Update: {
          created_at?: string | null
          id?: string
          log_date?: string | null
          mood?: string | null
          notes?: string | null
          sleep_hours?: number | null
          steps?: number | null
          user_id?: string
          water_glasses?: number | null
          weight?: number | null
        }
        Relationships: []
      }
      journal_entries: {
        Row: {
          content: string | null
          created_at: string | null
          entry_date: string | null
          id: string
          mood: string | null
          tags: string[] | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          entry_date?: string | null
          id?: string
          mood?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          content?: string | null
          created_at?: string | null
          entry_date?: string | null
          id?: string
          mood?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      meal_plans: {
        Row: {
          calories: number | null
          completed: boolean | null
          created_at: string | null
          id: string
          meal_date: string
          meal_type: string | null
          notes: string | null
          recipe: string | null
          title: string
          user_id: string
        }
        Insert: {
          calories?: number | null
          completed?: boolean | null
          created_at?: string | null
          id?: string
          meal_date: string
          meal_type?: string | null
          notes?: string | null
          recipe?: string | null
          title: string
          user_id: string
        }
        Update: {
          calories?: number | null
          completed?: boolean | null
          created_at?: string | null
          id?: string
          meal_date?: string
          meal_type?: string | null
          notes?: string | null
          recipe?: string | null
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      media: {
        Row: {
          created_at: string | null
          current_episode: number | null
          finished_at: string | null
          id: string
          media_type: string | null
          notes: string | null
          poster_url: string | null
          rating: number | null
          started_at: string | null
          status: string | null
          title: string
          total_episodes: number | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          current_episode?: number | null
          finished_at?: string | null
          id?: string
          media_type?: string | null
          notes?: string | null
          poster_url?: string | null
          rating?: number | null
          started_at?: string | null
          status?: string | null
          title: string
          total_episodes?: number | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          current_episode?: number | null
          finished_at?: string | null
          id?: string
          media_type?: string | null
          notes?: string | null
          poster_url?: string | null
          rating?: number | null
          started_at?: string | null
          status?: string | null
          title?: string
          total_episodes?: number | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      tasks: {
        Row: {
          category_id: string | null
          completed: boolean | null
          completed_at: string | null
          created_at: string | null
          description: string | null
          due_date: string | null
          due_time: string | null
          id: string
          priority: string | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          category_id?: string | null
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          due_time?: string | null
          id?: string
          priority?: string | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          category_id?: string | null
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          due_time?: string | null
          id?: string
          priority?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasks_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          amount: number
          category: string | null
          created_at: string | null
          id: string
          notes: string | null
          title: string
          transaction_date: string | null
          transaction_type: string | null
          user_id: string
        }
        Insert: {
          amount: number
          category?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          title: string
          transaction_date?: string | null
          transaction_type?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          category?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          title?: string
          transaction_date?: string | null
          transaction_type?: string | null
          user_id?: string
        }
        Relationships: []
      }
      travel_plans: {
        Row: {
          budget: number | null
          created_at: string | null
          currency: string | null
          description: string | null
          destination: string
          end_date: string | null
          id: string
          itinerary: Json | null
          notes: string | null
          start_date: string | null
          status: string | null
          user_id: string
        }
        Insert: {
          budget?: number | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          destination: string
          end_date?: string | null
          id?: string
          itinerary?: Json | null
          notes?: string | null
          start_date?: string | null
          status?: string | null
          user_id: string
        }
        Update: {
          budget?: number | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          destination?: string
          end_date?: string | null
          id?: string
          itinerary?: Json | null
          notes?: string | null
          start_date?: string | null
          status?: string | null
          user_id?: string
        }
        Relationships: []
      }
      vision_items: {
        Row: {
          category: string | null
          created_at: string | null
          icon: string | null
          id: string
          sort_order: number | null
          timeframe: string | null
          title: string
          updated_at: string | null
          user_id: string
          vision: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          icon?: string | null
          id?: string
          sort_order?: number | null
          timeframe?: string | null
          title: string
          updated_at?: string | null
          user_id: string
          vision?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          icon?: string | null
          id?: string
          sort_order?: number | null
          timeframe?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string
          vision?: string | null
        }
        Relationships: []
      }
      workout_plans: {
        Row: {
          completed: boolean | null
          created_at: string | null
          description: string | null
          duration_minutes: number | null
          exercises: Json | null
          id: string
          title: string
          user_id: string
          workout_date: string | null
          workout_type: string | null
        }
        Insert: {
          completed?: boolean | null
          created_at?: string | null
          description?: string | null
          duration_minutes?: number | null
          exercises?: Json | null
          id?: string
          title: string
          user_id: string
          workout_date?: string | null
          workout_type?: string | null
        }
        Update: {
          completed?: boolean | null
          created_at?: string | null
          description?: string | null
          duration_minutes?: number | null
          exercises?: Json | null
          id?: string
          title?: string
          user_id?: string
          workout_date?: string | null
          workout_type?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
