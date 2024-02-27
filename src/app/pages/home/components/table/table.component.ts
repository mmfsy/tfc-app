import { Component, Input, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ColDef, SizeColumnsToFitGridStrategy, SizeColumnsToContentStrategy, GridReadyEvent, ValueFormatterParams, ITooltipParams } from 'ag-grid-community';
import { IProduct, IProductHeader } from '@models/product';
import { DefaultCellComponent } from './cells/default-cell/default-cell.component';
import { ChipsCellComponent } from './cells/chips-cell/chips-cell.component';
import { NumberCellComponent } from './cells/number-cell/number-cell.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent {

  gridApi: any = null;

  rowData: IProduct[] = [];
  colDefs: ColDef[] = [];
  defaultColDef: ColDef = {
    sortable: false,
    resizable: false,
    suppressMovable: true,
    tooltipValueGetter: toolTipValueGetter
  };

  autoSizeFitWidthStrategy: SizeColumnsToFitGridStrategy = {
    type: 'fitGridWidth',
    defaultMinWidth: 100
  };

  autoSizeFitCellStrategy: SizeColumnsToContentStrategy = {
    type: 'fitCellContents'
  };

  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<IProduct>([]);

  @Input() set data(data: IProduct[]) {
    this.rowData = data;
  };

  @Input() set headers(headers: IProductHeader[]) {
    this.colDefs = headers.map(header => {
      const defs: ColDef = {
        field: header.id
      };

      switch (header.columnType) {
        case 'list': {
          defs.cellRenderer = ChipsCellComponent;
          defs.valueFormatter = valueFormatter;
          break;
        }
        case 'number': {
          defs.cellRenderer = NumberCellComponent;
          defs.maxWidth = 100;
          break;
        }
        default: {
          defs.cellRenderer = DefaultCellComponent;
        }
      }
      return defs;
    });
  }

  @ViewChild('agGridElement', { read: ElementRef }) agGridElement: ElementRef;

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }
  
}

const valueFormatter = (params: ValueFormatterParams) => params.value;
const toolTipValueGetter = (params: ITooltipParams) => params.value;
