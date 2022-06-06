
import { TestBed } from '@angular/core/testing';
import { HistoryService } from '../calculation-history/history.service';
import { FormulaService } from './formula.service';


describe('FormulaService', () => {
  let service: FormulaService;
  const mockHistoryService = jasmine.createSpyObj('MyRealService',['pushNewEquation']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[{provide:HistoryService, useValue: mockHistoryService}]
    });
    service = TestBed.inject(FormulaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getRandomNumber with mocked random',()=>{
    spyOn(Math,'random').and.returnValue(0.3);
    const number=service.getRandomNumber();
    expect(number).toEqual(30)
  })

  describe('ValidateResult',()=>{
    const firstNum:number=5;
    const secondNum:number=5;
    const result:number=10;
    const wrongResult:number=11;
    const isCorrect:boolean=true;

    it('should call pushNewEquation with correct values',()=>{
      mockHistoryService.pushNewEquation.calls.reset()
      service.validateResult(firstNum,secondNum,result)

      expect(mockHistoryService.pushNewEquation).toHaveBeenCalledOnceWith(firstNum,secondNum,result,isCorrect);
    })

    it('should return false on wrong result',()=>{
      var wrong=service.validateResult(firstNum,secondNum,wrongResult)

      expect(wrong).toEqual(false);
    })

    it('should return true on wrong correct',()=>{
      var correct=service.validateResult(firstNum,secondNum,result)

      expect(correct).toEqual(true);
    })
  })
});
