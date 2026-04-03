import { Component, OnInit } from '@angular/core';
import { Department } from '../../depatments.model';
import { DepartmentService } from '../../services/department.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-departments-list',
  standalone: false,
  templateUrl: './departments-list.component.html',
  styleUrls: [
    './departments-list.component.scss',
    '../../../../../styles/components/_table.scss',
    '../../../../../styles/abstracts/_border-radius.scss',
    '../../../../../styles/components/shared/forms.scss',
  ]
})

export class DepartmentsListComponent implements OnInit {
  departments: Department[] = [];
  loading = true;
  isModalOpen= false;
  form;
   constructor(
    private fb: FormBuilder,
    private departmentService: DepartmentService
  ) {
      // Initialize the form with validation
      this.form = this.fb.group({
        name: ['', Validators.required],
        description: ['']
      });
  }
  
  ngOnInit(): void {
    this.loadDepartments();
  }
  
  // Fetch departments from the service
  loadDepartments() {
    this.departmentService.getDepartments().subscribe(res => {
      this.departments = res.items;
      this.loading = false;
    });
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  submit() {
  if (this.form.invalid) return;

  const payload = {
    departmentName: this.form.value.name,
    description: this.form.value.description
  };

  console.log(payload);
  this.closeModal();
  this.form.reset();
}
}
