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
    '../../../../../styles/components/forms.scss',
    '../../../../../styles/components/_search-filter.scss'
  ]
})

export class DepartmentsListComponent implements OnInit {
  departments: Department[] = [];
  selectedDepartmentId: string | null = null;
  departmentToDelete: Department | null = null;

  allDepartments: Department[] = [];
  searchTerm: string = '';
  form;

  loading = true;
  isModalOpen= false;
  isSubmitting = false;
  isEditMode = false;
  isDeleteMode = false;
  
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
      this.allDepartments = res.items;
      this.departments = res.items;
      this.loading = false;
    });
  }

  applyFilter() {
    const term = this.searchTerm.toLowerCase();
    this.departments = this.allDepartments.filter (dep =>
      dep.departmentName.toLowerCase().includes(term)
    );
  }

  // Handle form submission for both create and edit
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

  /* Edit */
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

  /* Delete */
  openDeleteModal(dep: Department) {
    this.departmentToDelete = dep;
    this.isDeleteMode = true;
  }

  closeDeleteModal() {
    this.isDeleteMode = false;
    this.departmentToDelete = null;
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

  confirmDelete() {
    if (!this.departmentToDelete) return;

    this.departmentService.deleteDepartment(this.departmentToDelete.departmentId).subscribe({
      next: ()=> {
        this.departments = this.departments.filter(
          d => d.departmentId !== this.departmentToDelete!.departmentId
        );

        this.closeDeleteModal();
      }
    })
  }

  afterSave() {
    this.closeModal();
    this.form.reset();
    this.isSubmitting = false;
  }
}
