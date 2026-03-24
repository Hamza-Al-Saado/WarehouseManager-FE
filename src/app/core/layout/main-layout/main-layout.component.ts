import { Component } from '@angular/core';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-main-layout',
  standalone: false,
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {

  isDark = false;
  constructor(public ui: UiService) {}

  toggleDark() {
    this.isDark = !this.isDark;

    document.body.classList.toggle('dark-theme', this.isDark);
  }
}
