export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  initials: string;
  role: UserRole;
}
