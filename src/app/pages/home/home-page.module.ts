import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';

import { HomePageRoutingModule } from './home-page-routing.module';

import { HomePageComponent } from './components/home-page/home-page.component';
import { TableComponent } from './components/table/table.component';
import { DefaultCellComponent } from './components/table/cells/default-cell/default-cell.component';
import { ChipsCellComponent } from './components/table/cells/chips-cell/chips-cell.component';
import { NumberCellComponent } from './components/table/cells/number-cell/number-cell.component';
import { FiltersComponent } from './components/filters/filters.component';

import { HomeApiService } from './services/home-api.service';
import { HomeUtilsService } from './services/home-utils.service';

@NgModule({
  declarations: [
    HomePageComponent,
    TableComponent,
    DefaultCellComponent,
    ChipsCellComponent,
    NumberCellComponent,
    FiltersComponent
  ],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    HomeApiService,
    HomeUtilsService
  ]
})
export class HomPageModule { }
