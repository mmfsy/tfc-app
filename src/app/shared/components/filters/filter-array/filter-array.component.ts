import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IArrayFilter } from '@models/filter';

@Component({
  selector: 'app-filter-array',
  templateUrl: './filter-array.component.html',
  styleUrl: './filter-array.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterArrayComponent {

  filterForm: FormGroup = null;
  formData: IArrayFilter = null;

  @Input() set filterData(data: IArrayFilter) {
    this.formData = data;

    this.filterForm = this.formBuilder.group(
      data.value.reduce((prev: {[key: string]: boolean}, curr: string) => {
        prev[curr] = false;
        return prev;
      }, {})
    );

    this.filterForm.valueChanges.subscribe(formValue => {
      const result = Object.keys(formValue).reduce((res, key) => {
        if (formValue[key]) {
          res.push(key);
        }
        return res;
      }, []);

      this.onChanged.emit({key: this.formData.key, value: result});
    });
  }

  @Output() onChanged = new EventEmitter<IArrayFilter>();

  constructor(private formBuilder: FormBuilder) {}

}
