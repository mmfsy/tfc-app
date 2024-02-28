import { TemplateRef } from '@angular/core';
import { IArrayFilter, ITextFilter, INumberFilter } from '@models/filter';

interface IFilterGroup {
    filters: any[];
    templateRef: TemplateRef<any>;
    order: number;
}

export class FiltersGroups {
    private _textFilters: IFilterGroup;
    private _numberFilters: IFilterGroup;
    private _arrayFilters: IFilterGroup;
    private _iterableFiltersGroups: {key: string, value: IFilterGroup}[];
  
    get textFilters(): IFilterGroup {
      return this._textFilters;
    }
  
    get numberFilters(): IFilterGroup {
      return this._numberFilters;
    }
  
    get arrayFilters(): IFilterGroup {
      return this._arrayFilters;
    }
  
    get iterableFiltersGroups(): {key: string, value: IFilterGroup}[] {
      return this._iterableFiltersGroups;
    }
    
    constructor(
      textFilterTemplateRef?: TemplateRef<any>,
      numberFilterTemplateRef?: TemplateRef<any>,
      arrayFilterTemplateRef?: TemplateRef<any>
    ) {
      this._textFilters = {
        templateRef: textFilterTemplateRef || null,
        filters: [],
        order: 0
      },
  
      this._numberFilters = {
        templateRef: numberFilterTemplateRef || null,
        filters: [],
        order: 1
      },
  
      this._arrayFilters = {
        templateRef: arrayFilterTemplateRef || null,
        filters: [],
        order: 2
      }
  
      this._iterableFiltersGroups = [
        {key: 'textFilters', value: this._textFilters},
        {key: 'numberFilters', value: this._numberFilters},
        {key: 'arrayFilters', value: this._arrayFilters}
      ];
    }
  
    addTextFilter(filter: ITextFilter): void {
      this._textFilters.filters.push(filter);
    }
  
    addNumberFilter(filter: INumberFilter): void {
      this._numberFilters.filters.push(filter);
    }
  
    addArrayFilter(filter: IArrayFilter): void {
      this._arrayFilters.filters.push(filter);
    }
  
    updateTemplatesRefs(
      textFilterTemplateRef?: TemplateRef<any>,
      numberFilterTemplateRef?: TemplateRef<any>,
      arrayFilterTemplateRef?: TemplateRef<any>
    ): void {
      if (textFilterTemplateRef) {
        this.updateTextFiltersTemplateRef(textFilterTemplateRef);
      }
  
      if (numberFilterTemplateRef) {
        this.updateNumberFiltersTemplateRef(numberFilterTemplateRef);
      }
  
      if (arrayFilterTemplateRef) {
        this.updateArrayFiltersTemplateRef(arrayFilterTemplateRef);
      }
    }
  
    updateTextFiltersTemplateRef(templateRef: TemplateRef<any>): void {
      this._textFilters.templateRef = templateRef;
    }
  
    updateNumberFiltersTemplateRef(templateRef: TemplateRef<any>): void {
      this._numberFilters.templateRef = templateRef;
    }
  
    updateArrayFiltersTemplateRef(templateRef: TemplateRef<any>): void {
      this._arrayFilters.templateRef = templateRef;
    }
  
    reset(): void {
      this._textFilters.filters = [];
      this._numberFilters.filters = [];
      this._arrayFilters.filters = [];
    }
}
