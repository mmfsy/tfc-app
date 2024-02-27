import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, bufferCount, concatMap, delay, from, map, mergeMap, of } from 'rxjs';
import { IProduct, IProductHeader, ITableModel } from '@models/product';
import { IFilters, INumberFilterValue } from '@models/filter';
import { ITableData } from '@models/table';

interface ITempFilters {
  [key: string]: string | Set<string> | INumberFilterValue;
};

@Injectable()
export class HomeUtilsService {

  private _data: IProduct[] = [];
  private _headers: IProductHeader[] = [];
  private _filterSourcesSub: Subscription;

  tableData$ = new BehaviorSubject<ITableData>(null);
  tableHeaders$ = new BehaviorSubject<IProductHeader[]>(null);
  filters$ = new BehaviorSubject<IFilters>(null);

  prepareTableData(model: ITableModel) {
    this._data = model.data;
    this._headers = model.headers;
    const tempFilters: ITempFilters = {search: ''};

    // create filters model
    this._headers.forEach(header => {
      if (header.isFilterable) {
        switch (header.columnType) {
          case 'text': {
            tempFilters[header.id] = new Set<string>();
            break;
          }

          case 'list': {
            tempFilters[header.id] = new Set<string>();
            break;
          }
  
          case 'number': {
            tempFilters[header.id] = {
              min: 0,
              max: 0,
              absoluteMin: 0,
              absoluteMax: 0
            }
            break;
          }
        }
      }
    });  

    from(this._data).pipe(
      bufferCount(100),
      concatMap(chunk => of(chunk).pipe(delay(100))),
      // fill filters options
      map((products: IProduct[]) => {
        products.forEach(product => {
          const productKeys = Object.keys(product).filter(dataItemKey => tempFilters[dataItemKey]);
          productKeys.forEach(productKey => {
            const productField = product[productKey as keyof IProduct];
            if (tempFilters[productKey] instanceof Set) {
              const setFilter = tempFilters[productKey] as Set<string>;
              if (Array.isArray(productField)) {
                (productField as string[]).forEach(item => {
                  setFilter.add(item);
                });
              } else {
                setFilter.add(productField as string);
              }
            } else {
              const numberFilter = tempFilters[productKey] as INumberFilterValue;
              if (numberFilter.min > (productField as number)) {
                numberFilter.min = productField as number;
                numberFilter.absoluteMin = productField as number;
              }
    
              if (numberFilter.max < (productField as number)) {
                numberFilter.max = productField as number;
                numberFilter.absoluteMax = productField as number;
              }
            }
          });
        });
        return tempFilters;
      }),
      // replace Set with Array
      map(tempFilters => {
        const filters: IFilters = {};
        Object.keys(tempFilters).forEach(filterKey => {
          if (tempFilters[filterKey] instanceof Set) {
            filters[filterKey] = Array.from(tempFilters[filterKey] as Set<string>);
          } else {
            filters[filterKey] = tempFilters[filterKey] as INumberFilterValue;
          }
        });
        return filters;
      })
    ).subscribe(filters => {
      this.filters$.next(filters);
    });

    this.tableHeaders$.next(this._headers);
    this.filterData(null);
  }

  filterData(filters: IFilters) {
    if (!filters) {
      this.streamData(this._data, null);
      return;
    }

    filters = this.filterEmptyFilters(filters);
    if (!Object.keys(filters).length) {
      this.streamData(this._data, null);
      return;
    }

    this.streamData(this._data, filters);
  }

  private streamData(data: IProduct[], filters?: IFilters) {
    this._filterSourcesSub?.unsubscribe();

    this.tableData$.next({
      data: [],
      reset: true
    });

    this._filterSourcesSub = from(data).pipe(
      bufferCount(100),
      concatMap((chunk: IProduct[]) => of([...chunk]).pipe(delay(10))),
      mergeMap((chunk: IProduct[]) => {
        if (filters) {
          return this.filterData1(chunk, filters);
        } else {
          return of(chunk);
        }
      })
    ).subscribe((products: IProduct[]) => {
      this.tableData$.next({
        data: products,
        reset: false
      });
    });
  }

  private filterEmptyFilters(filters: IFilters) {
    return Object.keys(filters).reduce((result: IFilters, filterKey: string) => {
      if (Array.isArray(filters[filterKey])) {
        if ((filters[filterKey] as string[]).length) {
          result[filterKey] = filters[filterKey];
        } else {
          return result;
        }
      } else if (typeof filters[filterKey] === 'object') {
        const filter = filters[filterKey] as INumberFilterValue;
        if (filter.min !== filter.absoluteMin || filter.max !== filter.absoluteMax) {
          result[filterKey] = filters[filterKey];
        }
      } else if (filters[filterKey]) {
        result[filterKey] = filters[filterKey];
      }
      return result;
    }, {});
  }

  private filterData1(data: IProduct[], filters: IFilters): Observable<IProduct[]> {
    const filterKeys = Object.keys(filters);
    const filteredChunk = data.reduce((result: IProduct[], origSource: IProduct) => {
      const source = {...origSource, ...{tags: [...origSource.tags]}};
      for (let i = 0; i < filterKeys.length; i++) {
        const filterKey = filterKeys[i];
        const filterValue = filters[filterKey];
        if (Array.isArray(filterValue)) {
          if (!this.filterByArray(source, filterKey, filterValue)) {
            return result;
          }
        } else if (typeof filterValue === 'string') {
          if (!this.filterByString(source, filterValue)) {
            return result;
          }
        } else {
          if (!this.filterByNumber(source, filterKey, filterValue)) {
            return result;
          }
        }
      }

      result.push(source);
      return result;
    }, []);
    return of(filteredChunk);
  }

  private filterByString(item: IProduct, filterStr: string): boolean {
    const keys = Object.keys(item);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const value = item[key as keyof IProduct];
      switch (typeof value) {
        case 'object': {
          if (Array.isArray(value)) {
            const elIndex = value.findIndex(el => el.includes(filterStr));
            if (elIndex >= 0) {
              value[elIndex] = value[elIndex].replaceAll(filterStr, `<span class="highlight">${filterStr}</span>`);
              return true;
            }
          }
          break;
        }
        case 'string': {
          if (value.includes(filterStr)) {
            (<string>item[key as keyof IProduct]) = value.replaceAll(filterStr, `<span class="highlight">${filterStr}</span>`);
            return true;
          }
          break;
        }
      }
    }
    
    return false;
  }

  private filterByNumber(item: IProduct, filterKey: string, filterNum: INumberFilterValue): boolean {
    const itemValue = item[filterKey as keyof IProduct] as number;
    if (itemValue >= filterNum.min && itemValue <= filterNum.max) {
      return true;
    }

    return false;
  }

  private filterByArray(item: IProduct, filterKey: string, filterArr: string[]): boolean {
    const itemValue = item[filterKey as keyof IProduct];
    if (Array.isArray(itemValue)) {
      const items = filterArr.filter(item => {
        return !itemValue.includes(item);
      });
      if (!items.length) {
        return true;
      }
    } else {
      return filterArr.includes(itemValue as string);
    }

    return false;
  }

}
