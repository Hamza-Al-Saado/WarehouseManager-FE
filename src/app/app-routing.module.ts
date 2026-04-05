import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout.component';
import { RoleGuard } from './core/guards/role.guard';

const routes: Routes = [

  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'items',
        loadChildren: () =>
          import('./features/items/items.module').then(m => m.ItemsModule),
        canActivate: [RoleGuard,],
      },
      {
        path: 'categories',
        loadChildren: () =>
          import('./features/categories/categories.module').then(m => m.CategoriesModule),
        canActivate: [RoleGuard],
      },
      {
        path: 'departments',
        loadChildren: () =>
          import('./features/departments/departments.module').then(m => m.DepartmentsModule),
        canActivate: [RoleGuard],
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('./features/admin/admin.module').then(m => m.AdminModule),
        canActivate: [RoleGuard],
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
