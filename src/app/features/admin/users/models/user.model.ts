import { ApiResponse, PaginatedResponse } from "../../../../shared/models/api/api-response.model";
 
export interface User {
    userId: string;
    fullName: string;
    email: string;
    phone: string;
    roleId: string;
    status: string;
    createdAt: string;
    roleName?: string;
}
// response types
// for users list with pagination, filtering, and sorting
export type UsersResponse = PaginatedResponse<User>;
// for create user response
export type CreateUserRequest = ApiResponse<User>;