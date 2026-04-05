import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './users/user-list/user-list.component';
import { RoleListComponent } from './roles/role-list/role-List.component';

const routes: Routes = [
  { path: 'users', component: UserListComponent, title: 'Users' },
  { path: 'roles', component: RoleListComponent, title: 'Roles' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
