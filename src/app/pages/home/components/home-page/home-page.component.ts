import { Component, OnInit } from '@angular/core';
import { HomeApiService } from '../../services/home-api.service';
import { HomeUtilsService } from '../../services/home-utils.service';
import { ITableModel } from '@models/product';
import { IFilters } from '@models/filter';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {

  tableModel: ITableModel = null;
  filters: IFilters = null;

  constructor(private homeApi: HomeApiService, private homeUtils: HomeUtilsService) {}

  ngOnInit(): void {
    this.homeApi.loadProducts().subscribe(products => {
      this.homeUtils.prepareTableData(products);
    });

    this.homeUtils.dataSource$.subscribe(tableModel => {
      if (tableModel) {
        this.tableModel = tableModel;
      }
    });

    this.homeUtils.filters$.subscribe(filters => {
      this.filters = filters;
    });
  }

  onFiltersChanged(filters: IFilters) {
    this.homeUtils.filterData(filters);
  }

}
