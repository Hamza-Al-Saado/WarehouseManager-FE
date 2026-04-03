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
  selectedDepartmentId: string | null = null;
  form;

  loading = true;
  isModalOpen= false;
  isSubmitting = false;
  isEditMode = false;
  
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
    this.isEditMode = false;
    this.selectedDepartmentId = null;
    
    this.form.reset(); // Reset the form when opening the modal
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  submit() {
    if (this.form.invalid) return;

    this.isSubmitting = true;

    const payload = {
      departmentName: this.form.value.name!,
      description: this.form.value.description!
    };

    // Edit mode
    if (this.isEditMode && this.selectedDepartmentId) {
      this.departmentService.updateDepartment(this.selectedDepartmentId, payload).subscribe({
        next: () => {
          const index = this.departments.findIndex(
            d => d.departmentId === this.selectedDepartmentId
          );
          if (index !== -1) {
            this.departments[index] = {
              ...this.departments[index],
              departmentName: payload.departmentName,
              description: payload.description
            };
          }

          this.afterSave();

        }
      })
    }

    // Create mode
    else {
      this.departmentService.createDepartment(payload).subscribe({
        next: (res: any) => {
          this.departments.unshift(res); // Add the new department to the top of the list
          this.afterSave();
        },
        error: (err) => {
          console.error('Error creating department:', err);
          this.isSubmitting = false; // Reset submitting state on error
        }
      })
    }
  }

  editDepartment(dep: Department) {
    this.isEditMode = true;
    this.selectedDepartmentId = dep.departmentId;

    // Pre-filling form
    this.form.patchValue({
      name: dep.departmentName,
      description: dep.description
    });

    this.isModalOpen = true;
  }

  deleteDepartment(_t40: Department) {
    throw new Error('Method not implemented.');
  }

  afterSave() {
    this.closeModal();
    this.form.reset();
    this.isSubmitting = false;
  }
}
