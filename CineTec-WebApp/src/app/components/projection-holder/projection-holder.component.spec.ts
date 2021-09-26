import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectionHolderComponent } from './projection-holder.component';

describe('ProjectionHolderComponent', () => {
  let component: ProjectionHolderComponent;
  let fixture: ComponentFixture<ProjectionHolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectionHolderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectionHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
