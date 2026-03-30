import { Component, OnInit } from '@angular/core';
import { UiService } from './core/services/ui.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'warehouse-FE';

  constructor(private ui: UiService) {}
  
  ngOnInit(): void {
    this.ui.setLanguage('ar');
    this.ui.initTheme();
  }
}
