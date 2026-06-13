export interface User {
  id: number;
  email: string;
  name: string;
  birthDate: string;
  role: 'admin' | 'user';
  address: string | null;
  phone: string | null;
  validated: number;
  active: number;
}
