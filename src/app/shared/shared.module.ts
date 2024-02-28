import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AgGridAngular } from 'ag-grid-angular';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSliderModule } from '@angular/material/slider';

import { FilterComponent } from './components/filters/filter/filter.component';
import { FilterArrayComponent } from './components/filters/filter-array/filter-array.component';
import { FilterTextComponent } from './components/filters/filter-text/filter-text.component';
import { FilterNumberComponent } from './components/filters/filter-number/filter-number.component';

import { SortByPipe } from './pipes/sort-by.pipe';

@NgModule({
  declarations: [
    FilterComponent,
    FilterArrayComponent,
    FilterTextComponent,
    FilterNumberComponent,

    SortByPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    AgGridAngular,
    
    MatTableModule,
    MatPaginatorModule,
    MatSliderModule,
  ],
  exports: [
    AgGridAngular,

    MatTableModule,
    MatPaginatorModule,
    MatSliderModule,

    FilterComponent,
    FilterArrayComponent,
    FilterTextComponent,
    FilterNumberComponent,

    SortByPipe
  ]
})
export class SharedModule { }


