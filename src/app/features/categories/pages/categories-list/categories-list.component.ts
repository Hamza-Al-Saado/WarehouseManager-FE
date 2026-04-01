import { Component, OnInit } from '@angular/core';
import { CATEGORIES_MOCK } from '../../categories.mock';
import { Category } from '../../categories.model';
import { CategoriesRoutingModule } from '../../categories-routing.module';
import { CategoryService } from '../../services/category.service';

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
  categories: Category[] = [];
  loading = true;

  constructor(private categoriesService: CategoryService){}

  ngOnInit(): void { 
    this.categoriesService.getCategories().subscribe(data => {
      this.categories = data;
      this.loading = false;
    })
  }
}
