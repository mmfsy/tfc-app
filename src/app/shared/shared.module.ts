import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSliderModule } from '@angular/material/slider';

import { FilterArrayComponent } from './components/filters/filter-array/filter-array.component';
import { FilterTextComponent } from './components/filters/filter-text/filter-text.component';
import { FilterNumberComponent } from './components/filters/filter-number/filter-number.component';

@NgModule({
  declarations: [
    FilterArrayComponent,
    FilterTextComponent,
    FilterNumberComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSliderModule,
  ],
  exports: [
    MatTableModule,
    MatPaginatorModule,
    MatSliderModule,

    FilterArrayComponent,
    FilterTextComponent,
    FilterNumberComponent
  ]
})
export class SharedModule { }


