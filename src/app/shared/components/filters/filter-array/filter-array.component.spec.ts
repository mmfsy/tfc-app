import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterArrayComponent } from './filter-array.component';

describe('FilterArrayComponent', () => {
  let component: FilterArrayComponent;
  let fixture: ComponentFixture<FilterArrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [FilterArrayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilterArrayComponent);
    component = fixture.componentInstance;
    component.filterForm = new FormGroup('');
    component.formData = {key: 'test', value: []}
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
