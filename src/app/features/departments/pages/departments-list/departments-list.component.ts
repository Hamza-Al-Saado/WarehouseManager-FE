import { Component } from '@angular/core';
import { DEPARTMENTS_MOCK } from '../../departments.mock';

@Component({
  selector: 'app-departments-list',
  standalone: false,
  templateUrl: './departments-list.component.html',
  styleUrls: [
    './departments-list.component.scss',
    '../../../../../styles/components/_table.scss'
  ]
})
export class DepartmentsListComponent {
  departments = DEPARTMENTS_MOCK;
}
