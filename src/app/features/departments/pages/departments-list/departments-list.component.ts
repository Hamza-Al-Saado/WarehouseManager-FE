import { Component, OnInit } from '@angular/core';
import { Department } from '../../depatments.model';
import { DepartmentService } from '../../services/department.service';

@Component({
  selector: 'app-departments-list',
  standalone: false,
  templateUrl: './departments-list.component.html',
  styleUrls: [
    './departments-list.component.scss',
    '../../../../../styles/components/_table.scss'
  ]
})
export class DepartmentsListComponent implements OnInit {
  departments: Department[] = [];
  loading = true;

  constructor(private departmentService: DepartmentService){}

  ngOnInit(): void {
    this.departmentService.getDepartments().subscribe(data => {
      this.departments = data;
      this.loading = false;
    });
  }
}
