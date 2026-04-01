import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { delay, Observable, of } from 'rxjs';
import { Item } from '../item.model';
import { environment } from '../../../../environments/environment';
import { ITEMS_MOCK } from '../item.mock';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private api: ApiService) { }

  getItmes(): Observable<Item[]>{
    if (environment.useMock)
      return of(ITEMS_MOCK).pipe(delay(500));

    return this.api.get<Item[]>('/items')
  }
}
