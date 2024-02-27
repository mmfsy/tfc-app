import { Component } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';
import { CellAbstract } from '../cell.abstract';

@Component({
  selector: 'app-number-cell',
  templateUrl: './number-cell.component.html',
  styleUrl: './number-cell.component.scss'
})
export class NumberCellComponent extends CellAbstract {

  getValueToDisplay(params: ICellRendererParams) {
    return params.valueFormatted ? params.valueFormatted : params.value;
  }

}

