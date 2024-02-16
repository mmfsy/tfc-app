import { Component, AfterViewInit, ViewChild, Input, ChangeDetectionStrategy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IProduct, ITableModel } from '@models/product';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements AfterViewInit {

  displayedColumns: string[] = [];
  tableModel: ITableModel = {data: [], headers: []};
  dataSource = new MatTableDataSource<IProduct>([]);

  @Input() set data(table: ITableModel) {
    this.displayedColumns = table.headers.map(header => header.id);
    this.tableModel = table;
    this.dataSource.data = table.data;
  };

  @ViewChild(MatPaginator) paginator: MatPaginator = null;

  constructor() {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

}
