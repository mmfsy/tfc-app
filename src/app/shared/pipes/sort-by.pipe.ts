import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortBy'
})
export class SortByPipe implements PipeTransform {
  transform(value: any[], pathToKey: string[]): any[] {
    if (pathToKey?.length) {
      return value.sort((a, b) => {
        const aValue = pathToKey.reduce((result, key) => {
          return result[key];
        }, a);

        const bValue = pathToKey.reduce((result, key) => {
          return result[key];
        }, b);

        return aValue - bValue;
      });
    }

    return value;
  }
}
