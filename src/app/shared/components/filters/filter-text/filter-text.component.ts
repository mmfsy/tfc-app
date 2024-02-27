import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ITextFilter } from '@models/filter';

@Component({
  selector: 'app-filter-text',
  templateUrl: './filter-text.component.html',
  styleUrl: './filter-text.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterTextComponent {

  filterForm: FormGroup = null;
  formData: ITextFilter = null;

  @Input() set filterData(data: ITextFilter) {
    this.formData = data;

    this.filterForm = this.formBuilder.group({[data.key]: data.value});

    this.filterForm.valueChanges.subscribe(formValue => {
      this.onChanged.emit({key: this.formData.key, value: formValue[this.formData.key]});
    });
  }

  @Output() onChanged = new EventEmitter<ITextFilter>();

  constructor(private formBuilder: FormBuilder) {}

}
