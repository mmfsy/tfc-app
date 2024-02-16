import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { INumberFilter } from '@models/filter';

@Component({
  selector: 'app-filter-number',
  templateUrl: './filter-number.component.html',
  styleUrls: ['../filter.scss', './filter-number.component.scss']
})
export class FilterNumberComponent {

  filterForm: FormGroup = null;
  formData: INumberFilter = null;

  @Input() set filterData(data: INumberFilter) {
    this.formData = data;
    this.filterForm = this.formBuilder.group(data.value);

    this.filterForm.valueChanges.subscribe(formValue => {
      this.onChanged.emit({key: this.formData.key, value: formValue});
    });
  }

  @Output() onChanged = new EventEmitter<INumberFilter>();

  constructor(private formBuilder: FormBuilder) {}

  onValueChanged(key: string, value: number) {
    const control = this.filterForm.get(key);
    if (control) {
      control.setValue(value);
    }
  }

}
