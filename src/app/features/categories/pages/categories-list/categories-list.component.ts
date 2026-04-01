import { Component, OnInit } from '@angular/core';
import { CATEGORIES_MOCK } from '../../categories.mock';

@Component({
  selector: 'app-categories-list',
  standalone: false,
  templateUrl: './categories-list.component.html',
  styleUrls: [
    './categories-list.component.scss',
    '../../../../../styles/components/_table.scss'
  ]
})
export class CategoriesListComponent implements OnInit {
  categories = CATEGORIES_MOCK;

  ngOnInit(): void { }
}
