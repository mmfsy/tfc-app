import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipsCellComponent } from './chips-cell.component';

describe('ChipsCellComponent', () => {
  let component: ChipsCellComponent;
  let fixture: ComponentFixture<ChipsCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChipsCellComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChipsCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
