import { FormulaService } from './formula.service';
import { ComponentFixture, ComponentFixtureAutoDetect, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { FormulaBoxComponent } from './formula-box.component';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('FormulaBoxComponent', () => {
  let component: FormulaBoxComponent;
  let fixture: ComponentFixture<FormulaBoxComponent>;

  const mockFormulaService = jasmine.createSpyObj('MyRealService',['getRandomNumber', 'validateResult']);
    mockFormulaService.getRandomNumber.and.returnValue(5);

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [FormulaBoxComponent],
      providers:[{provide:FormulaService, useValue: mockFormulaService},
      {provide: ComponentFixtureAutoDetect, useValue:true}],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
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

  describe('Generated onInit',()=>{

    it('should call generateNewEquation', () => {

      spyOn(component,"generateNewEquation")
      component.ngOnInit();

      expect(component.generateNewEquation).toHaveBeenCalledTimes(1);
    });

    it('should display equation', () => {
      component.firstNum=5;
      component.secondNum=5;
      const equationEl = fixture.debugElement.query(By.css('.equation'));

      component.ngOnInit();

      expect(equationEl.nativeElement.textContent.trim()).toBe('5 + 5 =');
    });

  });

  describe('generateNewEquations is called',()=>{

    beforeEach(()=>{
      component.resultForm.patchValue(2);
      component.correctAnswer = true;
      mockFormulaService.getRandomNumber.calls.reset();

      component.generateNewEquation();
    })

    it('Should call getRandomNumber twice',()=>{
      expect(mockFormulaService.getRandomNumber.calls.count()).toBe(2);

    })

    it('First number should equal dummy number',()=>{
      expect(component.firstNum).toEqual(5);
    })

    it('Second number should equal dummy number',()=>{
      expect(component.secondNum).toEqual(5);
    })

    it('Should set correctAnswer to false',()=>{
      expect(component.correctAnswer).toBeFalse();

    })

    it('Should reset form value',()=>{
      expect(component.resultForm.value).toBeNull();
    })

  });

  it('resetWrongMessage should reset wrongAnswer',()=>{
    component.wrongAnswer =true;
    component.resetWrongMessage();

    expect(component.wrongAnswer).toBeFalse();
  })

  describe('SubmitResult function with invalid input value',()=>{
      const invalidInput:string='e';


    beforeEach(()=>{
      mockFormulaService.validateResult.calls.reset();
      spyOn(component,'generateNewEquation');
      spyOn(component,'submitResult')
      spyOn(window,'alert');
    })

    it('should not call validateResult', ()=>{

      component.submitResult(invalidInput as any);

      expect(mockFormulaService.validateResult).toHaveBeenCalledTimes(0);
    });
  })

  describe('SubmitResult with incorrect result value',()=>{

    const input=11;

    beforeEach(()=>{
      component.firstNum=5;
      component.secondNum=5;
      component.resultForm.patchValue(2);
      mockFormulaService.validateResult.and.returnValue(false);
    })

    it('should set wrongAnswer to true',()=>{

      component.submitResult(input);

      expect(component.wrongAnswer).toBeTrue();
    });

    it('should reset form',()=>{

      component.submitResult(input);
      expect(component.resultForm.value).toBeNull()

    });
  });

  describe('SubmitResult with correct result value',()=>{
    const input=10;

    beforeEach(()=>{
      component.firstNum=5;
      component.secondNum=5;
      component.resultForm.patchValue(2);
      mockFormulaService.validateResult.calls.reset();
      mockFormulaService.validateResult.and.returnValue(true);

    })

    it('should call validateResult with correct values',()=>{

      component.submitResult(input);

      expect(mockFormulaService.validateResult).toHaveBeenCalledOnceWith(component.firstNum,component.secondNum,input);
    })

    it('should set wrongAnswer to false',()=>{
      component.wrongAnswer=true;

      component.submitResult(input);

      expect(component.wrongAnswer).toBeFalse();
    })

    it('should set correctAnswer to true',()=>{
      component.submitResult(input);

      expect(component.correctAnswer).toBeTrue();
    })

    it('should call generateNewEquation after 4 seconds',fakeAsync(()=>{
      spyOn(component,'generateNewEquation');

      component.submitResult(input);

      tick(4000);
      expect(component.generateNewEquation).toHaveBeenCalledTimes(1);
    }));

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


});


