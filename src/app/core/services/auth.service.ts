import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    saveToken(token: string, expiration: string) {
        const date = new Date(expiration).toUTCString();
        document.cookie = `token=${token}; expires=${date}; path=/;`;
    }

    getToken(): string | null {
        const match = document.cookie.match(new RegExp('(^| )token=([^;]+)'));
        return match ? match[2] : null;
    }

    clearToken() {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }

    isAuthenticated(): boolean {
        const token = this.getToken();
        if (!token) return false;

        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const isExpired = payload.exp * 1000 < Date.now();

            if (isExpired) {
                this.clearToken();
                return false;
            }

            return true;
        } catch {
            this.clearToken();
            return false;
        }
    }

    getUserRoles(): string[] {
        const token = this.getToken();
        if (!token) return [];

        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.role || payload.roles || [];
        } catch {
            return [];
        }
    }

    hasAnyRole(expectedRoles: string[]): boolean {
        const userRoles = this.getUserRoles();
        return expectedRoles.some(role => userRoles.includes(role));
    }
}