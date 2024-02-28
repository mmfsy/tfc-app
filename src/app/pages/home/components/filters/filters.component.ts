import { Component, AfterViewInit, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IProductHeader } from '@models/product';
import { IFilters } from '@models/filter';
import { IArrayFilter, ITextFilter, INumberFilter } from '@models/filter';
import { FiltersGroups } from './filters';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FiltersComponent implements AfterViewInit {

  filtersForm: FormGroup = new FormGroup([]);
  filtersGroups: FiltersGroups = null;

  @Input() headers: IProductHeader[] = [];

  @Input() set filters(filters: IFilters) {
    if (!this.filtersGroups) {
      this.filtersGroups = new FiltersGroups();
    } else {
      this.filtersGroups.reset();
    }

    this.filtersForm = new FormGroup([]);
    if (filters) {
      this.buildForm(filters);

      this.filtersForm.valueChanges.subscribe(formValue => {
        this.onFiltersChanged.emit(formValue);
      });
    } 
  }

  @Output() onFiltersChanged = new EventEmitter<IFilters>();

  @ViewChild('textFilterContentTemplate') textFilterContentTemplate: TemplateRef<any>;
  @ViewChild('numberFilterContentTemplate') numberFilterContentTemplate: TemplateRef<any>;
  @ViewChild('arrayFilterContentTemplate') arrayFilterContentTemplate: TemplateRef<any>;

  constructor(private formBuilder: FormBuilder) {}

  ngAfterViewInit(): void {
    if (!this.filtersGroups) {
      this.filtersGroups = new FiltersGroups(
        this.textFilterContentTemplate,
        this.numberFilterContentTemplate,
        this.arrayFilterContentTemplate
      );
    } else {
      this.filtersGroups.updateTemplatesRefs(
        this.textFilterContentTemplate,
        this.numberFilterContentTemplate,
        this.arrayFilterContentTemplate
      );
    }
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
        this.filtersGroups.addArrayFilter({
          key: filterKey,
          value: filters[filterKey]
        } as IArrayFilter);
      } else if (typeof filters[filterKey] === 'object') {
        this.filtersGroups.addNumberFilter({
          key: filterKey,
          value: filters[filterKey]
        } as INumberFilter);
      } else {
        this.filtersGroups.addTextFilter({
          key: filterKey,
          value: '',
          title: 'Search:'
        } as ITextFilter);
      }
    });
  }

}
