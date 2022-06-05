
import { FormulaService } from './formula.service';
import { ComponentFixture, ComponentFixtureAutoDetect, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { FormulaBoxComponent } from './formula-box.component';
import { By } from '@angular/platform-browser';

describe('FormulaBoxComponent', () => {
  let component: FormulaBoxComponent;
  let fixture: ComponentFixture<FormulaBoxComponent>;

  const mockFormulaService = jasmine.createSpyObj('MyRealService',['getRandomNumber', 'validateResult']);
    mockFormulaService.getRandomNumber.and.returnValue(5);

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [FormulaBoxComponent],
      providers:[{provide:FormulaService, useValue: mockFormulaService},
      {provide: ComponentFixtureAutoDetect, useValue:true}]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaBoxComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
    component.correctAnswer=false;
    component.wrongAnswer=false;

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call generateNewEquation onInit', () => {

    const spy = spyOn(component,"generateNewEquation")
    component.ngOnInit();

    expect(component.generateNewEquation).toHaveBeenCalledTimes(1);
  })

  it('should display equation onInit', () => {
    component.firstNum=5;
    component.secondNum=5;
    const equationEl = fixture.debugElement.query(By.css('.equation'));

    component.ngOnInit();

    expect(equationEl.nativeElement.textContent.trim()).toBe('5 + 5 =');
  })

  it('generateNewEquations generates new Equation',()=>{

    component.resultForm.patchValue(2);
    component.correctAnswer = true;
    mockFormulaService.getRandomNumber.calls.reset();

    component.generateNewEquation();

    expect(mockFormulaService.getRandomNumber.calls.count()).toBe(2);
    expect(component.firstNum).toEqual(5);
    expect(component.secondNum).toEqual(5);
    expect(component.correctAnswer).toBeFalse();
    expect(component.resultForm.value).toBeNull()
  })

  it('resetWrongMessage should reset wrongAnswer',()=>{
    component.wrongAnswer =true;
    component.resetWrongMessage();

    expect(component.wrongAnswer).toBeFalse();
  })

  it('submitResult should show alert on invalid input', ()=>{
    const invalidInput:string='e';


    spyOn(component,'generateNewEquation');
    spyOn(component,'submitResult')
    spyOn(window,'alert');

    component.submitResult(invalidInput as any);

    expect(mockFormulaService.validateResult).toHaveBeenCalledTimes(0);
    expect(window.alert).toHaveBeenCalledTimes(1);
  });

  it('submitResult should set wrongAnswer true if input is incorrect',()=>{
    component.firstNum=5;
    component.secondNum=5;
    const input=10;
    component.resultForm.patchValue(2);

    mockFormulaService.validateResult.and.returnValue(false);

    spyOn(component,'generateNewEquation');

    component.submitResult(input);

    expect(component.correctAnswer).toBeFalse();
    expect(component.wrongAnswer).toBeTrue();
    expect(component.resultForm.value).toBeNull()
  });

  it('should render X if answer is incorrect', ()=>{
    component.wrongAnswer=true;
    fixture.detectChanges();
    const redX = fixture.debugElement.query(By.css('.wrongResultContainer'));

    expect(redX.nativeElement).toBeTruthy();
  });

  it('should render checkmark if answer is correct', ()=>{
    component.correctAnswer=true;
    fixture.detectChanges();
    const redX = fixture.debugElement.query(By.css('.correctResultContainer'));

    expect(redX.nativeElement).toBeTruthy();
  });

  it('submitResult should set correctAnswer true if input is correct',fakeAsync(()=>{

    component.firstNum=5;
    component.secondNum=5;
    const input=10;
    component.wrongAnswer=true;
    component.resultForm.patchValue(2);

    mockFormulaService.validateResult.calls.reset();

    mockFormulaService.validateResult.and.returnValue(true);

    spyOn(component,'generateNewEquation');

    component.submitResult(input);

    expect(mockFormulaService.validateResult).toHaveBeenCalledOnceWith(component.firstNum,component.secondNum,input);
    expect(component.wrongAnswer).toBeFalse();
    expect(component.correctAnswer).toBeTrue();
    tick(4000);
    expect(component.generateNewEquation).toHaveBeenCalledTimes(1);
  }));
});


