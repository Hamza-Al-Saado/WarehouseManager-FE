import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentsRoutingModule } from './departments-routing.module';
import { DepartmentsListComponent } from './pages/departments-list/departments-list.component';
import { ModalComponent } from "../../shared/components/modal/modal.component";
import { ReactiveFormsModule } from '@angular/forms';

import { LucideAngularModule, SquarePen, Trash, Trash2 } from 'lucide-angular';
import { ConfirmationModalComponent } from '../../shared/components/confirmation-modal/confirmation-modal.component';


@NgModule({
  declarations: [
    DepartmentsListComponent
  ],
  imports: [
    CommonModule,
    DepartmentsRoutingModule,
    ModalComponent,
    ReactiveFormsModule,
    ConfirmationModalComponent,

    LucideAngularModule.pick({
          SquarePen,
          Trash,
          Trash2
        })
]
})
export class DepartmentsModule { }
