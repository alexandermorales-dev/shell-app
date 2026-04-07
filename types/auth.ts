// Authentication related interfaces
export interface AuthUser {
  email: string;
  name?: string;
  phone?: string;
  email_verified: boolean;
  phone_verified: boolean;
}

export interface AuthSession {
  access_token: string;
  refresh_token: string;
  expires_at?: number;
  user: AuthUser;
}

export interface SignInState {
  error?: string;
}

export interface SignUpState {
  error?: string;
}

export interface ForgotPasswordState {
  error?: string;
  success?: boolean;
}

export interface UpdatePasswordState {
  error?: string;
  success?: boolean;
}
