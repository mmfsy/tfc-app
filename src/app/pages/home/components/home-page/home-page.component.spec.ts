import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { SharedModule } from '@shared/shared.module';
import { HomePageComponent } from './home-page.component';
import { TableComponent } from '../table/table.component';
import { FiltersComponent } from '../filters/filters.component';
import { HomeApiService } from '../../services/home-api.service';
import { HomeUtilsService } from '../../services/home-utils.service';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SharedModule
      ],
      declarations: [
        HomePageComponent,
        TableComponent,
        FiltersComponent
      ],
      providers: [provideAnimations(), HomeApiService, HomeUtilsService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
