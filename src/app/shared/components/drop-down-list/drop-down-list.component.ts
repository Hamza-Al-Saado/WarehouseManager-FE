import { Component, Input, OnInit, HostListener, OnChanges, SimpleChanges, Output, EventEmitter, ViewChild, ElementRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MenuModel } from "../../models/api/lookups.model";
import { LucideAngularModule, SquarePen, Trash, Trash2 } from 'lucide-angular';
@Component({
    selector: 'app-drop-down-list',
    standalone: true,
    imports:
        [
            CommonModule, FormsModule,
        ],
    templateUrl: './drop-down-list.component.html',
    styleUrls: ['./drop-down-list.component.scss'],
})
export class DropDownListComponent implements OnInit, OnChanges {

    @Input() items: MenuModel[] = [];
    @Input() showSearch: boolean = false;
    @Input() showTitle: boolean = true;
    @Input() insidePopup: boolean = false;
    @Input() filterType: string = 'name';
    @Input() highlightClass: string = '';
    @Input() height: string = '';
    @Input() fontSizeText: string = '';
    @Input() role: string = '';
    @Input() buttonText: string = '';
    @Input() showButtonToAddNewItem: boolean = false;
    @Input() isMultiSelect: boolean = false;
    @Input() selectedItems: MenuModel[] = [];
    @Input() title: string = '';
    @Input() searchPlaceholder: string = '';
    @Input() selectedItem: MenuModel = { name: 'اختر', id: '1' };
    @Output() itemSelected = new EventEmitter<MenuModel>();
    @Output() itemsSelected = new EventEmitter<MenuModel[]>();
    @Output() addAction = new EventEmitter<void>();
    originalItems: MenuModel[] = [];
    itemsSearch: string = '';
    isOpen: boolean = false;

    constructor() { }

    ngOnInit() {
        this.originalItems = Array.isArray(this.items) ? [...this.items] : [];
        this.selectedItem = this.selectedItem ? this.selectedItem : { name: `اختر ${this.title}`, id: '1' };
        this.height = this.height ? this.height : '56px';
        this.fontSizeText = this.fontSizeText ? this.fontSizeText : '16px';
    }

    selectItem(item: MenuModel, isMultiSelect: boolean = false) {
        if (!isMultiSelect) {
            this.selectedItem = { name: item.name || item.fullName!, id: item.id! };
            this.itemSelected.emit(item);
            this.isOpen = this.isMultiSelect ? this.isOpen : false;
        }
        else {
            this.toggleItem(item);
        }
    }

    filterItems() {
        const search = this.itemsSearch.toLowerCase();
        this.items = this.originalItems.filter(o => {
            return this.filterType === 'name' ?
                (o.name.toLowerCase().includes(search)) :
                (o.name.toLowerCase().includes(search) || o.phoneNumber?.toLowerCase().includes(search))
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['items'] && changes['items'].currentValue) {
            this.originalItems = changes['items'].currentValue;
        }
        if (changes['selectedItem'] && changes['selectedItem'].currentValue) {
            this.selectedItem = changes['selectedItem'].currentValue;
        }
        if (changes['selectedItems'] && changes['selectedItems'].currentValue) {
            this.selectedItems = changes['selectedItems'].currentValue;
        }
        if (changes['highlightClass'] && changes['highlightClass'].currentValue) {
            this.highlightClass = changes['highlightClass'].currentValue;
        }
        if (changes['isMultiSelect'] && changes['isMultiSelect'].currentValue) {
            this.isMultiSelect = changes['isMultiSelect'].currentValue;
        }
    }

    @HostListener('document:click', ['$event'])
    clickOutside(event: Event) {
        const target = event.target as HTMLElement;
        const isInsideContainer = target.closest('.custom-select-container');
        const isOptionOrButton = target.closest('.dropdown-option') || target.closest('.add-owner-btn');
        if (!isInsideContainer && !isOptionOrButton) {
            this.isOpen = false;
        }
    }

    addPropertyOwners() {
        this.addAction.emit();
    }

    toggleItem(item: any) {
        const index = this.selectedItems.findIndex(i => i.id === item.id);
        if (index > -1) {
            this.selectedItems.splice(index, 1);
        } else {
            this.selectedItems.push(item);
        }
        this.itemsSelected.emit(this.selectedItems);
    }

    isSelected(item: any): boolean {
        return this.isMultiSelect
            ? this.selectedItems.some(i => i.id === item.id)
            : this.selectedItem.id === item.id;
    }

    @ViewChild('selectBox') selectBox!: ElementRef<HTMLDivElement>;
    @ViewChild('dropdown') dropdown!: ElementRef<HTMLDivElement>;
    @ViewChild('container', { static: true }) container!: ElementRef<HTMLDivElement>;

    toggleDropdown() {
        this.isOpen = !this.isOpen;

        if (this.isOpen && this.insidePopup) {
            setTimeout(() => {
                if (!this.dropdown) return;

                const rect = this.selectBox.nativeElement.getBoundingClientRect();
                const dropdownEl = this.dropdown.nativeElement;

                dropdownEl.style.position = 'absolute';
                dropdownEl.style.top = rect.bottom + 'px';
                dropdownEl.style.left = rect.left + 'px';
                dropdownEl.style.width = rect.width + 'px';
                dropdownEl.style.zIndex = '10000';
                dropdownEl.style.maxHeight = '200px';

                document.body.appendChild(dropdownEl);
            });
        }
    }
}