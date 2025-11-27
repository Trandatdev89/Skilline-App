export interface AuthResponse {
    accessToken: string;
    refreshToken?: string;
    authenticated?: boolean;
    username?: string;
    userId?: number;
}