import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatHolderComponent } from './seat-holder.component';

describe('SeatHolderComponent', () => {
  let component: SeatHolderComponent;
  let fixture: ComponentFixture<SeatHolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeatHolderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeatHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
