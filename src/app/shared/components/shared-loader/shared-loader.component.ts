import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-shared-loader',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './shared-loader.component.html',
  styleUrl: './shared-loader.component.scss'
})
export class LoaderComponent {
  @Input() show: boolean = false;
  @Input() text?: string;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
}