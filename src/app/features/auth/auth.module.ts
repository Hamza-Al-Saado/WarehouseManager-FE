import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Form } from 'lucide-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,ReactiveFormsModule,
  ]
})

export class AuthModule { }
