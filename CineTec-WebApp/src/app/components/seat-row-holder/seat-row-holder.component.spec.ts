import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatRowHolderComponent } from './seat-row-holder.component';

describe('SeatRowHolderComponent', () => {
  let component: SeatRowHolderComponent;
  let fixture: ComponentFixture<SeatRowHolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeatRowHolderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeatRowHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
