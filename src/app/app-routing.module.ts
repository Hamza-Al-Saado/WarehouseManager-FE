import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'items',
        loadChildren: () =>
          import('./features/items/items.module').then(m => m.ItemsModule)
      },
      {
        path: 'categories',
        loadChildren: () => 
          import('./features/categories/categories.module').then(m => m.CategoriesModule)
      },
      {
        path: 'departments',
        loadChildren: () => 
          import('./features/departments/departments.module').then(m => m.DepartmentsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
