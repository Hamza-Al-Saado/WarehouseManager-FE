import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentsRoutingModule } from './departments-routing.module';
import { DepartmentsListComponent } from './pages/departments-list/departments-list.component';
import { ModalComponent } from "../../shared/components/modal/modal.component";
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DepartmentsListComponent
  ],
  imports: [
    CommonModule,
    DepartmentsRoutingModule,
    ModalComponent,
    ReactiveFormsModule
]
})
export class DepartmentsModule { }
