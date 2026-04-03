import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  @Input() title = '';
  @Input() isOpen = false;

  @Output() isClose = new EventEmitter<void>();

  onClose() {
    this.isClose.emit();
  }
}