import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemsListComponent } from './pages/items-list/items-list.component';

const routes: Routes = [
  { path: '', component: ItemsListComponent, title: 'Items' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemsRoutingModule { }
2