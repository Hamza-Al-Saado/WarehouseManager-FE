import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { LucideAngularModule, SquarePen, Trash, Trash2, User } from 'lucide-angular';
import { UserListComponent } from './users/user-list/user-list.component';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { LoaderComponent } from '../../shared/components/shared-loader/shared-loader.component';
import { UserFormComponent } from './users/user-form/user-form.component';
import { DropDownListComponent } from '../../shared/components/drop-down-list/drop-down-list.component';
import { ConfirmationModalComponent } from "../../shared/components/confirmation-modal/confirmation-modal.component";

@NgModule({
    declarations: [
        UserListComponent,
        UserFormComponent
    ],
    imports: [
        CommonModule, AdminRoutingModule, FormsModule,
        ReactiveFormsModule, LoaderComponent, ModalComponent,
        DropDownListComponent, ConfirmationModalComponent,

        LucideAngularModule.pick({
            SquarePen, Trash, Trash2
        }),
    ],
    exports: [
    ]
})

export class AdminModule { }
