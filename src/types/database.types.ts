export interface Message {
  id: number
  created_at: string
  name: string
  email: string
  message: string
  status: 'pending' | 'reviewed' | 'archived'
} 