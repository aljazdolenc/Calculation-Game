import { HistoryItem } from './../shared/history-item.model';

import { TestBed } from '@angular/core/testing';
import { HistoryService } from '../calculation-history/history.service';



describe('HistoryService', () => {
  let service: HistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('sendHistoryArray should call historyList.next',()=>{
    service.historyArray=[new HistoryItem('5 + 5 = 10',true)]
    var array:HistoryItem[];
    service.historyList.subscribe(value=>{
      array=value;
    })

    service.sendHistoryArray()

    expect(array).toEqual(service.historyArray)
  })

  describe('pushNewEquation',()=>{
    const firstNum:number=5;
    const secondNum:number=5;
    const result:number=10;
    const isCorrect:boolean=true;

    it('should push new equation to historyArray',()=>{
      service.historyArray=[];
      const finalArray=[new HistoryItem('5 + 5 = 10',true)];
      service.pushNewEquation(firstNum,secondNum,result,isCorrect);

      expect(service.historyArray).toEqual(finalArray);
    })

    it('should call sendHistoryArray',()=>{
      spyOn(service, 'sendHistoryArray')
      service.pushNewEquation(firstNum,secondNum,result,isCorrect);

      expect(service.sendHistoryArray).toHaveBeenCalledTimes(1);
    })

  })
});
