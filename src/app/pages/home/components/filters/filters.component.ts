import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IProductHeader } from '@models/product';
import { IFilters } from '@models/filter';
import { IArrayFilter, ITextFilter, INumberFilter } from '@models/filter';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss'
})
export class FiltersComponent implements OnInit {

  arrayFilters: IArrayFilter[] = [];
  textFilters: ITextFilter[] = [];
  numberFilters: INumberFilter[] = [];

  filtersForm: FormGroup = new FormGroup([]);

  @Input() headers: Array<IProductHeader> = [];
  @Input() filters: IFilters = {}


  @Output() onFiltersChanged = new EventEmitter<IFilters>();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm(this.filters);

    this.filtersForm.valueChanges.subscribe(formValue => {
      this.onFiltersChanged.emit(formValue);
    });
  }

  onArrayFilterChanged(event: IArrayFilter) {
    this.filtersForm.get(event.key).setValue(event.value);
  }

  onTextFilterChanged(event: ITextFilter) {
    this.filtersForm.get(event.key).setValue(event.value);
  }

  onNumberFilterChanged(event: INumberFilter) {
    this.filtersForm.get(event.key).setValue(event.value);
  }

  private buildForm(filters: IFilters) {
    Object.keys(filters).forEach(filterKey => {
      this.filtersForm.addControl(filterKey, this.formBuilder.control(''));
      if (Array.isArray(filters[filterKey])) {
        this.arrayFilters.push({
          key: filterKey,
          value: filters[filterKey]
        } as IArrayFilter);
      } else if (typeof filters[filterKey] === 'object') {
        this.numberFilters.push({
          key: filterKey,
          value: filters[filterKey]
        } as INumberFilter);
      } else {
        this.textFilters.push({
          key: filterKey,
          value: ''
        } as ITextFilter);
      }
    });
  }

}