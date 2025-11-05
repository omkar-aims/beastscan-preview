export interface Organization {
  id: number;
  name: string | null;
  street: string | null;
  postcode: string | null;
  city: string | null;
  phone: string | null;
  email: string | null;
  is_business: boolean;
}

export interface User {
  id: string;
  email: string;
  publicRoles?: string[];
  name?: string;
  company?: string | null;
  created_at?: string;
  organization?: Organization;
}
