import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MenuModel } from "../../../../shared/models/api/lookups.model";
import { UserService } from "../services/user.service";
import { User } from "../models/user.model";
type UserForm = FormGroup<{
    fullName: FormControl<string>;
    email: FormControl<string>;
    phone: FormControl<string>;
    password: FormControl<string>;
    roleId: FormControl<string>;
    status: FormControl<string>;
}>;

@Component({
    selector: "app-user-form",
    standalone: false,
    templateUrl: "./user-form.component.html",
    styleUrls: [
        "./user-form.component.scss",
        // '../../../../../styles/components/shared/forms.scss',
    ]
})
export class UserFormComponent implements OnInit {
    @Input() isEditMode = false;
    @Input() isSubmitting = false;
    @Input() user: User | null = null;
    @Output() save = new EventEmitter<any>();
    @Output() close = new EventEmitter<void>();
    roles: MenuModel[] = [];
    selectedItem: { [key: string]: MenuModel } = {};
    status: MenuModel[] = [
        { id: 'active', name: 'نشط' },
        { id: 'inactive', name: 'غير نشط' },
        { id: 'closed', name: 'مغلق' },
        { id: 'banned', name: 'محظور' }
    ];
    form!: UserForm;

    constructor(
        private fb: FormBuilder, private userService: UserService
    ) { }

    ngOnInit() {
        this.initFrom();
        this.getroles();
    }
    ngOnChanges(changes: SimpleChanges): void {
        if (changes['user']) {
            this.user = changes['user'].currentValue;
            this.selectedItem['role'] = this.roles.find(r => r.id === this.user?.roleId)!;
            this.selectedItem['status'] = this.status.find(s => s.name === this.user?.status)!;
            if (this.isEditMode && this.user) {
                this.form.patchValue({
                    fullName: this.user.fullName,
                    email: this.user.email,
                    phone: this.user.phone,
                    roleId: this.user.roleId,
                    status: this.user.status
                });
            }
        }
    }

    getroles() {
        this.userService.getRoles().subscribe(roles => {
            this.roles = roles;
        });
    }
    initFrom() {
        this.form = this.fb.nonNullable.group({
            fullName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', Validators.required],
            password: [''],
            roleId: ['', Validators.required],
            status: ['Active']
        });
    }

    submit() {
        if (this.form.invalid) return;
        console.log(this.form.value);
        this.save.emit(this.form.value);
    }

    onSelectItem(item: MenuModel, isRole: boolean) {
        if (isRole) {
            this.form.patchValue({ roleId: item.id });
            this.selectedItem['role'] = item;
        } else {
            this.form.patchValue({ status: item.name });
            this.selectedItem['status'] = item;
        }
    }

    onClose() {
        this.close.emit();
    }
}