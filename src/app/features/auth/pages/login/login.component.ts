import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
    selector: 'app-login',
    standalone: false,
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


    loginFrom!: FormGroup;
    constructor(
        private fb: FormBuilder,
        private loginService: LoginService,
        private router: Router,
        private authService: AuthService,

    ) {
    }

    ngOnInit(): void {
        this.intiFrom();
    }

    onSubmit() {
        if (this.loginFrom.invalid) {
            this.loginFrom.markAllAsTouched();
            return;
        }

        this.loginService.login(this.loginFrom.value).subscribe({
            next: (res) => {
                this.authService.saveToken(res.accessToken, res.expiration);
                this.router.navigate(['/items']);
            }
        });
    }

    intiFrom() {
        this.loginFrom = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
        });
    }

    onForgotPassword() {
        console.log('Forgot Password clicked');
        // ممكن تربطيها بصفحة reset-password
    }

    onRegister() {
        console.log('Go to Register page');
        // ممكن تعملي navigate لصفحة التسجيل
    }

    getToken(): string | null {
        const match = document.cookie.match(new RegExp('(^| )token=([^;]+)'));
        return match ? match[2] : null;
    }
}