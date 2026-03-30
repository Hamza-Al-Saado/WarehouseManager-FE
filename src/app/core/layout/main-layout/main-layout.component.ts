import { Component } from '@angular/core';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-main-layout',
  standalone: false,
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss',
    '../../../../styles/layout/_layout.scss',
    '../../../../styles/layout/_navbar.scss',
    '../../../../styles/layout/_sidebar.scss',
  ]
})
export class MainLayoutComponent {

  isDark = false;
  isSidebarOpen = false;
  
  constructor(public ui: UiService) {}

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar() {
  this.isSidebarOpen = false;
}

  toggleDark() {
    this.isDark = !this.isDark;

    document.body.classList.toggle('dark-theme', this.isDark);
  }
}
