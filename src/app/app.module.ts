import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout.component';

import { TranslateModule } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

import { LucideAngularModule, Home, Boxes, Folder, Building, Users, SquarePen } from 'lucide-angular';
import { ConfirmationModalComponent } from './shared/components/confirmation-modal/confirmation-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ConfirmationModalComponent,

    TranslateModule.forRoot({
      loader: provideTranslateHttpLoader({
        prefix: './assets/i18n/',
        suffix: '.json'
      })
    }),

    // Register only the icons we need to reduce bundle size (Icons Library)
    LucideAngularModule.pick({
      Home,
      Boxes,
      Folder,
      Building,
      Users,
      SquarePen
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
