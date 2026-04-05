import { PaginatedResponse } from "../../../../shared/models/api/api-response.model";

export interface Role {
    roleId: string;
    roleName: string;
    description: string;
    createdAt: string;
    usersCount: number;
    createdBy: string | null;
    updatedAt: string | null;
    updatedBy: string | null;
    isDeleted: boolean;
}

export type RolesResponse = PaginatedResponse<Role>;