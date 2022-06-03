import { HistoryService } from './history.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { HistoryItem } from '../shared/history-item.model';


@Component({
  selector: 'app-calculation-history',
  templateUrl: './calculation-history.component.html',
  styleUrls: ['./calculation-history.component.css']
})
export class CalculationHistoryComponent implements OnInit, OnDestroy {

  @Input()rowHeight: string | number='48px';

  historyArray: HistoryItem[] = [];

  constructor(private historyService: HistoryService) { }

  ngOnInit(): void {
    this.historyService.sendHistoryArray();

    this.historyService.historyList
      .subscribe((array) => {
        this.historyArray = array;
      })
  }

  ngOnDestroy(): void {
    this.historyService.historyList.unsubscribe()
  }

}
