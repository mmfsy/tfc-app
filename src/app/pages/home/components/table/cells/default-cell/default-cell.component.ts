import { Component } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';
import { CellAbstract } from '../cell.abstract';

@Component({
  selector: 'app-default-cell',
  templateUrl: './default-cell.component.html',
  styleUrl: './default-cell.component.scss'
})
export class DefaultCellComponent extends CellAbstract {

  getValueToDisplay(params: ICellRendererParams) {
    return params.valueFormatted ? params.valueFormatted : params.value;
  }

}
