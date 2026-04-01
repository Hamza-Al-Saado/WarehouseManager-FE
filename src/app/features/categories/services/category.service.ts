import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { delay, Observable, of } from 'rxjs';
import { Category } from '../categories.model';
import { environment } from '../../../../environments/environment';
import { CATEGORIES_MOCK } from '../categories.mock';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private api: ApiService) { }
  
    getCategories(): Observable<Category[]> {
      if (environment.useMock)
        return of(CATEGORIES_MOCK).pipe(delay(500));
  
      return this.api.get<Category[]>('/categories');
    }
}
