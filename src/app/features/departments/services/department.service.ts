import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Department, PaginatedResponse } from '../depatments.model';
import { environment } from '../../../../environments/environment';
import { DEPARTMENTS_MOCK } from '../departments.mock';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private api: ApiService) { }

  getDepartments(): Observable<any> {
    if (environment.useMock)
      return of(DEPARTMENTS_MOCK).pipe(delay(500));
    return this.api.get('/Department');
  }
}
