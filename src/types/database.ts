export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          created_at: string
          updated_at: string
          preferences: {
            theme: 'light' | 'dark'
            notifications: boolean
            focus_duration: number
            break_duration: number
          }
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          created_at?: string
          updated_at?: string
          preferences?: Json
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          created_at?: string
          updated_at?: string
          preferences?: Json
        }
      }
      tasks: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          status: 'pending' | 'in_progress' | 'completed'
          priority: number
          deadline: string | null
          created_at: string
          updated_at: string
          complexity: number
          tags: string[]
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          status?: 'pending' | 'in_progress' | 'completed'
          priority?: number
          deadline?: string | null
          complexity?: number
          tags?: string[]
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          status?: 'pending' | 'in_progress' | 'completed'
          priority?: number
          deadline?: string | null
          complexity?: number
          tags?: string[]
        }
      }
      focus_sessions: {
        Row: {
          id: string
          user_id: string
          task_id: string
          start_time: string
          end_time: string | null
          duration: number
          completed: boolean
          notes: string | null
        }
        Insert: {
          id?: string
          user_id: string
          task_id: string
          start_time?: string
          end_time?: string | null
          duration: number
          completed?: boolean
          notes?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          task_id?: string
          start_time?: string
          end_time?: string | null
          duration?: number
          completed?: boolean
          notes?: string | null
        }
      }
    }
  }
} 