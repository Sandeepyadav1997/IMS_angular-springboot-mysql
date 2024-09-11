import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndInternshipDialogComponent } from './end-internship-dialog.component';

describe('EndInternshipDialogComponent', () => {
  let component: EndInternshipDialogComponent;
  let fixture: ComponentFixture<EndInternshipDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EndInternshipDialogComponent]
    });
    fixture = TestBed.createComponent(EndInternshipDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
