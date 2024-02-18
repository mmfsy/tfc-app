import { TestBed, discardPeriodicTasks, fakeAsync, flush, tick } from '@angular/core/testing';
import { IProduct, IProductHeader, ITableModel } from '@models/product';
import { HomeUtilsService } from './home-utils.service';
import { IFilters } from '@models/filter';
import { take } from 'rxjs';
import { ITableData } from '@models/table';

const dataMock: IProduct[] = [
  {
    name: 'name1',
    description: 'description1',
    category: 'category1',
    material: 'material1',
    price: 1,
    tags: ['tag1']
  },
  {
    name: 'name2',
    description: 'description2',
    category: 'category2',
    material: 'material2',
    price: 11,
    tags: ['tag2']
  }
];

const headersMock: IProductHeader[] = [
  { name: 'name', id: 'name', columnType: 'text', isFilterable: false },
  { name: 'description', id: 'description', columnType: 'text', isFilterable: false },
  { name: 'category', id: 'category', columnType: 'text', isFilterable: true },
  { name: 'material', id: 'material', columnType: 'text', isFilterable: true },
  { name: 'price', id: 'price', columnType: 'number', isFilterable: true },
  { name: 'tags', id: 'tags', columnType: 'list', isFilterable: true }
];

function getDataMock() {
  return JSON.parse(JSON.stringify(dataMock));
}

function getHeadersMock() {
  return JSON.parse(JSON.stringify(headersMock));
}

describe('HomeUtilsService', () => {
  let service: HomeUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HomeUtilsService]
    });
    service = TestBed.inject(HomeUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('prepareTableData()', () => {
    it ('should save data and headers', () => {
      const tableMock: ITableModel = {
        data: getDataMock(),
        headers: getHeadersMock()
      };
  
      service.prepareTableData(tableMock);
  
      expect(service['_data']).toEqual(getDataMock());
      expect(service['_headers']).toEqual(getHeadersMock());
    });
  
    it ('should emit filters', fakeAsync(() => {
      const tableMock: ITableModel = {
        data: getDataMock(),
        headers: getHeadersMock()
      };
  
      const sub = service.filters$.subscribe((filters: IFilters) => {
        expect(filters).toBeNull();
      });
  
      sub.unsubscribe();
  
      service.prepareTableData(tableMock);
      tick(100);
  
      service.filters$.pipe(take(1)).subscribe((filters: IFilters) => {
        expect(filters).toEqual({
          search: '',
          category: ['category1', 'category2'],
          material: ['material1', 'material2'],
          price: {min: 0, absoluteMin: 0, max: 11, absoluteMax: 11},
          tags: ['tag1', 'tag2']
        });
        flush();
      });
    }));
  
    it ('should call filterData()', () => {
      spyOn(service, 'filterData');
  
      const tableMock: ITableModel = {
        data: getDataMock(),
        headers: getHeadersMock()
      };
  
      service.prepareTableData(tableMock);
  
      expect(service.filterData).toHaveBeenCalledWith(null);
    });
  });

  describe('filterByString()', () => {
    it ('should return true if found match in string', () => {
      const item = getDataMock()[0];
      expect(service['filterByString'](item, 'gory')).toBe(true);
    });
  
    it ('should return false if no match in string', () => {
      const item = getDataMock()[0];
      expect(service['filterByString'](item, 'test')).toBe(false);
    });
  
    it ('should highlight match in string', () => {
      const item = getDataMock()[0];
      service['filterByString'](item, 'gory');
      expect(item).toEqual({
        name: 'name1',
        description: 'description1',
        category: 'cate<span class="highlight">gory</span>1',
        material: 'material1',
        price: 1,
        tags: ['tag1']
      });
    });
  
    it ('should highlight match in an array of strings', () => {
      const item = getDataMock()[0];
      service['filterByString'](item, 'ag');
      expect(item).toEqual({
        name: 'name1',
        description: 'description1',
        category: 'category1',
        material: 'material1',
        price: 1,
        tags: ['t<span class="highlight">ag</span>1']
      });
    });
  });

  describe('filterByNumber()', () => {
    it ('should return true if found match in between min and max', () => {
      const item = getDataMock()[0];
      item.price = 10;
      expect(service['filterByNumber'](item, 'price', {min: 0, absoluteMin: 0, max: 20, absoluteMax: 20})).toBe(true);
    });
  
    it ('should return false if no match in between min and max', () => {
      const item = getDataMock()[0];
      item.price = 30;
      expect(service['filterByNumber'](item, 'price', {min: 0, absoluteMin: 0, max: 20, absoluteMax: 20})).toBe(false);
    });
  });

  describe('filterByArray()', () => {
    it ('should return true if found match in array', () => {
      const item = getDataMock()[0];
      expect(service['filterByArray'](item, 'material', ['material1'])).toBe(true);
    });
  
    it ('should return false if mo match in array', () => {
      const item = getDataMock()[0];
      expect(service['filterByArray'](item, 'category', ['material'])).toBe(false);
    });
  });

  describe('filterData() ', () => {
    it ('should emit all data if passed filter is null', fakeAsync(() => {
      const tableMock: ITableModel = {
        data: getDataMock(),
        headers: getHeadersMock()
      };
  
      service.prepareTableData(tableMock);
      service.filterData(null);
  
      tick(100);
  
      service.tableData$.subscribe((tableData: ITableData) => {
        expect(tableData.data).toEqual(tableMock.data);
        flush();
      });
    }));

    it ('should emit all data if passed filters are empty', fakeAsync(() => {
      const tableMock: ITableModel = {
        data: getDataMock(),
        headers: getHeadersMock()
      };
  
      service.prepareTableData(tableMock);
      service.filterData({search: '', category: [], material: [], tags: []});
  
      tick(100);
  
      service.tableData$.subscribe((tableData: ITableData) => {
        expect(tableData.data).toEqual(tableMock.data);
        flush();
      });
    }));

    it ('should emit filtered data', fakeAsync(() => {
      const tableMock: ITableModel = {
        data: getDataMock(),
        headers: getHeadersMock()
      };
  
      service.prepareTableData(tableMock);
      service.filterData({search: '', category: [], material: ['material1'], tags: []});
  
      tick(100);
  
      service.tableData$.subscribe((tableData: ITableData) => {
        expect(tableData.data).toEqual([tableMock.data[0]]);
        flush();
      });
    }));
  });

});
