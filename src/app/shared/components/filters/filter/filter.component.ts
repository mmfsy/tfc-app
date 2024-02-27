import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {

  @Input() title: string;
  @Input() filterTemplate: TemplateRef<any>;

}
