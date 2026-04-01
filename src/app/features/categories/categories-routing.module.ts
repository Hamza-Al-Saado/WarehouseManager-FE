import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesListComponent } from './pages/categories-list/categories-list.component';

const routes: Routes = [
  { path: '', component: CategoriesListComponent, title: 'Categories' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
