import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemsRoutingModule } from './items-routing.module';
import { ItemsListComponent } from './pages/items-list/items-list.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    ItemsListComponent
  ],
  imports: [
    CommonModule,
    ItemsRoutingModule,
    TranslateModule
  ]
})
export class ItemsModule { }
