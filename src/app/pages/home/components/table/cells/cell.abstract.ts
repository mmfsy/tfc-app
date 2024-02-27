import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

export abstract class CellAbstract implements ICellRendererAngularComp {
  public cellValue!: string;

  agInit(params: ICellRendererParams): void {
    this.cellValue = this.getValueToDisplay(params);
  }

  refresh(params: ICellRendererParams): boolean {
    this.cellValue = this.getValueToDisplay(params);
    return true;
  }

  abstract getValueToDisplay(params: ICellRendererParams): string;
}
