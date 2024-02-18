import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterNumberComponent } from './filter-number.component';
import { SharedModule } from '@shared/shared.module';

describe('FilterNumberComponent', () => {
  let component: FilterNumberComponent;
  let fixture: ComponentFixture<FilterNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, SharedModule],
      declarations: [FilterNumberComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilterNumberComponent);
    component = fixture.componentInstance;
    component.filterForm = new FormGroup({test: new FormControl({min: new FormControl(0), max: new FormControl(1000)})});
    component.formData = {key: 'test', value: {min: 0, absoluteMin: 0, max: 1000, absoluteMax: 1000}};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
