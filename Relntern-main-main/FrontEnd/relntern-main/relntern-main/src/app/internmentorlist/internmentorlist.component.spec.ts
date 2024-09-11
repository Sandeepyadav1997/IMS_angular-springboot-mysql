import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternmentorlistComponent } from './internmentorlist.component';

describe('InternmentorlistComponent', () => {
  let component: InternmentorlistComponent;
  let fixture: ComponentFixture<InternmentorlistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InternmentorlistComponent]
    });
    fixture = TestBed.createComponent(InternmentorlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
