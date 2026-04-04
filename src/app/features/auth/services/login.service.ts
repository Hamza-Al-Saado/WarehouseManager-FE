import { Injectable } from "@angular/core";
import { ApiService } from "../../../core/services/api.service";
import { Observable } from "rxjs";
import { AuthRequestBody, AuthResponse } from "../models/login.model";

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    constructor(private apiService: ApiService) { }

    login(loginData: AuthRequestBody): Observable<AuthResponse> {
        return this.apiService.post<AuthResponse>('/Auth/login', loginData);
    }
}
