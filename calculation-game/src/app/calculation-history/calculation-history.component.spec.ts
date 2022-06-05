import { of, Subject } from 'rxjs';
import { HistoryItem } from './../shared/history-item.model';
import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';

import { CalculationHistoryComponent } from './calculation-history.component';
import { HistoryService } from './history.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('CalculationHistoryComponent', () => {
  let component: CalculationHistoryComponent;
  let fixture: ComponentFixture<CalculationHistoryComponent>;

  const serviceHistoryArray:HistoryItem[]=[{equation:'5 + 5 =10', isCorrect:true} ]

  const mockHistoryService = jasmine.createSpyObj('MyRealService',['sendHistoryArray', 'historyList']);
    mockHistoryService.historyList = new Subject();


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculationHistoryComponent ],
      providers:[{provide:HistoryService, useValue: mockHistoryService},
        {provide: ComponentFixtureAutoDetect, useValue:true}],
        schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculationHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('OnInit',()=>{

    beforeEach(() => {
      mockHistoryService.historyList.next(serviceHistoryArray);
      fixture.detectChanges();
    });

    it('should call sendHistory',()=>{
      mockHistoryService.sendHistoryArray.calls.reset();
      component.ngOnInit()

      expect(mockHistoryService.sendHistoryArray).toHaveBeenCalledTimes(1);
    })

    it('historyArray should equal serviceHistoryArray',()=>{
      // spyOn(mockHistoryService, 'historyList')
      component.ngOnInit()

      expect(component.historyArray).toEqual(serviceHistoryArray);
    })
  })

});
