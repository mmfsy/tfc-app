import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterNumberComponent } from './filter-number.component';

describe('FilterNumberComponent', () => {
  let component: FilterNumberComponent;
  let fixture: ComponentFixture<FilterNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterNumberComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilterNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
