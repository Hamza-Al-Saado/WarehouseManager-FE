export interface AuthRequestBody {
    email: string;
    password: string;
}

export interface AuthResponse {
    accessToken: string;
    expiration: string;
    user: User;
}

export interface User {
    id: string;
    name: string;
    email: string;
}