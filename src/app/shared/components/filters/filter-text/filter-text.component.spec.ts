import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterTextComponent } from './filter-text.component';

describe('FilterTextComponent', () => {
  let component: FilterTextComponent;
  let fixture: ComponentFixture<FilterTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [FilterTextComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilterTextComponent);
    component = fixture.componentInstance;
    component.filterForm = new FormGroup({test: new FormControl('')});
    component.formData = {key: 'test', value: ''};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
