import { Component, Input, TemplateRef } from '@angular/core';
import { IArrayFilter, INumberFilter, ITextFilter } from '@models/filter';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrl: './filter.component.scss'
})
export class FilterComponent {

    @Input() title: string;
    @Input() data: ITextFilter | INumberFilter | IArrayFilter;

    @Input() filterTitleTemplate: TemplateRef<any>;
    @Input() filterContentTemplate: TemplateRef<any>;

}
