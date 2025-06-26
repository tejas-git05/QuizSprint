export interface User {
  userId: number;
  userName: string;
  password?: string; // Mark as optional since we might not want to expose it
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  profile?: string;
  role: string; 
  isEnabled:boolean;
}