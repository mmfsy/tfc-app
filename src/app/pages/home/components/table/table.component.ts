import { Component, AfterViewInit, ViewChild, Input, ChangeDetectionStrategy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IProduct, IProductHeader } from '@models/product';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements AfterViewInit {

  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<IProduct>([]);

  @Input() set data(data: IProduct[]) {
    this.dataSource.data = data;
  };

  @Input() set headers(headers: IProductHeader[]) {
    this.displayedColumns = headers.map(header => header.id);
  }

  @ViewChild(MatPaginator) paginator: MatPaginator = null;

  constructor() {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

}
