import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CreateUserRequest, UsersResponse } from "../models/user.model";
import { ApiService } from "../../../../core/services/api.service";
import { MenuModel } from "../../../../shared/models/api/lookups.model";

@Injectable({
    providedIn: "root",
})
export class UserService {
    constructor(private apiService: ApiService) { }
    // users
    // get all users with pagination, filtering, and sorting
    getUsers(): Observable<UsersResponse> {
        return this.apiService.get<UsersResponse>(`/Users`);
    }
    // create new user
    createUser(userData: any): Observable<CreateUserRequest> {
        return this.apiService.post<CreateUserRequest>(`/Users`, userData);
    }
    // update user
    updateUser(userId: string, userData: any): Observable<void> {
        return this.apiService.put<void>(`/Users/${userId}`, userData);
    }
    // delete user
    deleteUser(userId: string): Observable<void> {
        return this.apiService.delete<void>(`/Users/${userId}`);
    }

    // lookups
    // get roles for dropdown
    getRoles(): Observable<MenuModel[]> {
        return this.apiService.get<MenuModel[]>(`/Roles/RolesLookup`);
    }
}