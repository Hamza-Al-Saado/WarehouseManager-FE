import { Component, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { UserService } from "../services/user.service";
import { User, UsersResponse } from "../models/user.model";
import { finalize } from "rxjs";


@Component({
    selector: "app-user-list",
    standalone: false,
    templateUrl: "./user-list.component.html",
    styleUrls: [
        "./user-list.component.scss",
        '../../../../../styles/components/_table.scss',
        '../../../../../styles/abstracts/_border-radius.scss',
        // '../../../../../styles/components/shared/forms.scss',
    ]
})
export class UserListComponent implements OnInit {
    constructor(private userService: UserService) { }
    loading: boolean = false;
    users: UsersResponse | null = null;
    modeStatus: { [key: string]: boolean } = {}
    item: { [key: string]: User | null } = {}

    ngOnInit(): void {
        this.getUser();
    }

    getUser() {
        this.loading = true;
        this.userService.getUsers().pipe(finalize(() => {
            this.loading = false;
        })).subscribe(users => {
            this.users = users;
        });
    }

    trackByUserId(index: number, user: User) {
        return user.userId;
    }

    changeMode(isAddMode: boolean, user: User | null = null) {
        this.modeStatus[isAddMode ? 'add' : 'edit'] = !this.modeStatus[isAddMode ? 'add' : 'edit'];
        this.item['edit'] = isAddMode ? null : user;
        console.log(this.item['edit']);
    }

    createNewUser(userData: any) {
        this.userService.createUser(userData).subscribe((res) => {
            this.users?.items.unshift(res.data);
            this.modeStatus['add'] = false;
        });
    }

    confirmDelete() {
        if (!this.item['delete']) return;
        this.userService.deleteUser(this.item['delete']!.userId).subscribe(() => {
            this.users!.items = this.users!.items.filter(u => u.userId !== this.item['delete']!.userId);
            this.closeDeleteModal();
        });
    }

    deleteUser(user: User) {
        this.item['delete'] = user;
        this.modeStatus['delete'] = true;
    }
    closeDeleteModal() {
        this.modeStatus['delete'] = false;
        this.item['delete'] = null;
    }

    updateUser(userData: any) {
        this.userService.updateUser(this.item['edit']!.userId, userData).subscribe(() => {
            const index = this.users!.items.findIndex(u => u.userId === this.item['edit']!.userId);
            if (index !== -1) {
                this.users!.items[index] = { ...this.users!.items[index], ...userData };
            }
            this.modeStatus['edit'] = false;
            this.item['edit'] = null;
        });
    }
}