import { Injectable } from '@angular/core';
import { RESPONSE_MOCK } from '../mocked-data/response-mock';
import { Observable, map, of } from 'rxjs';
import { IResponse } from '@models/response';
import { ITableModel } from '@models/product';

@Injectable()
export class HomeApiService {

  loadProducts(): Observable<ITableModel> {
    return of(RESPONSE_MOCK as IResponse).pipe(
      map((responseMock: IResponse) => {
        return responseMock.response
      })
    );
  }

}
