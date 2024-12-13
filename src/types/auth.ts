export interface LoginRequest {
    email: number;
    passowrd?: string;
}

export interface ErrorResponse {
    code: string;
    description: string;
}
