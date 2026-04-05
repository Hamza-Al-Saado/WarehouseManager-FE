import { Component, OnInit } from "@angular/core";
import { Role, RolesResponse } from "../model/role.model";
import { RoleService } from "../services/role.service";
import { finalize } from "rxjs";


@Component({
    selector: "app-role-list",
    standalone: false,
    templateUrl: "./role-list.component.html",
    styleUrls: [
        "./role-list.component.scss",
        '../../../../../styles/components/_table.scss',
        '../../../../../styles/abstracts/_border-radius.scss',
    ]
})
export class RoleListComponent implements OnInit {

    loading: boolean = false;
    roles: RolesResponse | null = null;
    modeStatus: { [key: string]: boolean } = {}
    item: { [key: string]: Role | null } = {}

    constructor(private roleService: RoleService) { }
    ngOnInit(): void {
        this.getRoles();
    }

    getRoles() {
        this.loading = true;
        this.roleService.getRoles().pipe(finalize(() => {
            this.loading = false;
        })).subscribe(roles => {
            this.roles = roles;
        });
    }

    trackByRoleId(index: number, role: Role) {
        return role.roleId;
    }




}