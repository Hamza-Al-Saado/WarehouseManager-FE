import { Injectable } from "@angular/core";
import { ApiService } from "../../../../core/services/api.service";
import { Observable } from "rxjs";
import { RolesResponse } from "../model/role.model";

@Injectable({
    providedIn: 'root'
})
export class RoleService {
    constructor(private apiService: ApiService) { }
    getRoles(): Observable<RolesResponse> {
        return this.apiService.get<RolesResponse>('/Roles');
    }
}