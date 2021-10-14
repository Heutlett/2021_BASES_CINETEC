import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieTimeButtonComponent } from './movie-time-button.component';

describe('MovieTimeButtonComponent', () => {
  let component: MovieTimeButtonComponent;
  let fixture: ComponentFixture<MovieTimeButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieTimeButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieTimeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
