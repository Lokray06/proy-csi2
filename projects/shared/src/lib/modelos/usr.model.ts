export interface User {
  username: string;
  email: string;
  role: string; // Ejemplo: 'admin', 'user', 'guest'
  acceptTerms: boolean;
}
