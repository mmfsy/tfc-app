import { Component } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';
import { CellAbstract } from '../cell.abstract';

@Component({
  selector: 'app-chips-cell',
  templateUrl: './chips-cell.component.html',
  styleUrl: './chips-cell.component.scss'
})
export class ChipsCellComponent extends CellAbstract {

  getValueToDisplay(params: ICellRendererParams) {
    return params.value;
  }

}