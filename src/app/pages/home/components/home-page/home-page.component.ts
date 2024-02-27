import { Component, OnInit } from '@angular/core';
import { HomeApiService } from '../../services/home-api.service';
import { HomeUtilsService } from '../../services/home-utils.service';
import { IProduct, IProductHeader } from '@models/product';
import { IFilters } from '@models/filter';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {

  tableData: IProduct[] = null;
  tableHeaders: IProductHeader[] = null;
  filters: IFilters = null;

  constructor(private homeApi: HomeApiService, private homeUtils: HomeUtilsService) {}

  ngOnInit(): void {
    this.homeApi.loadProducts().subscribe(products => {
      this.homeUtils.prepareTableData(products);
    });
    
    this.homeUtils.tableData$.subscribe(tableData => {
      if (tableData) {
        if (tableData.reset) {
          this.tableData = [];
        }
        this.tableData = this.tableData.concat(tableData.data);
      }
    });

    this.homeUtils.tableHeaders$.subscribe(tableHeaders => {
      if (tableHeaders) {
        this.tableHeaders = tableHeaders;
      }
    });

    this.homeUtils.filters$.subscribe(filters => {
      if (filters) {
        this.filters = filters;
      }
    });
  }

  onFiltersChanged(filters: IFilters) {
    this.homeUtils.filterData(filters);
  }

}
