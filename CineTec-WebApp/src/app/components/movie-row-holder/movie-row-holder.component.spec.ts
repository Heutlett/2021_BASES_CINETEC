import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieRowHolderComponent } from './movie-row-holder.component';

describe('MovieRowHolderComponent', () => {
  let component: MovieRowHolderComponent;
  let fixture: ComponentFixture<MovieRowHolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieRowHolderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieRowHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
