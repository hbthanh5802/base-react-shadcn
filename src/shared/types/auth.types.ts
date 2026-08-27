export interface AuthUser {
  id: string;
  username: string;
  email: string;
  fullName: string;
  avatar?: string;
  position?: string;
  department?: string;
  roles: string[];
  permissions: string[];
}

export interface LoginPayload {
  username: string;
  password?: string;
  role?: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
}
