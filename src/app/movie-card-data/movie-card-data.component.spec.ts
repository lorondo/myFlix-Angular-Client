import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCardDataComponent } from './movie-card-data.component';

describe('MovieCardDataComponent', () => {
  let component: MovieCardDataComponent;
  let fixture: ComponentFixture<MovieCardDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieCardDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieCardDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
