import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaBoxComponent } from './formula-box.component';

describe('FormulaBoxComponent', () => {
  let component: FormulaBoxComponent;
  let fixture: ComponentFixture<FormulaBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormulaBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
