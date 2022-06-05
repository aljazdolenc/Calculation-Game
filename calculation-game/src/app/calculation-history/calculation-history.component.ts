import { GridService } from './grid.service';
import { HistoryService } from './history.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { HistoryItem } from '../shared/history-item.model';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-calculation-history',
  templateUrl: './calculation-history.component.html',
  styleUrls: ['./calculation-history.component.css']
})
export class CalculationHistoryComponent implements OnInit, OnDestroy {


  historyArray: HistoryItem[] = [];
  colNumber: number= 0;
  breakPointsArray:string[]=[
    Breakpoints.XSmall,
    Breakpoints.Small,
    Breakpoints.Medium,
    Breakpoints.Large,
    Breakpoints.XLarge,
  ]
  historyListSub:Subscription;

  constructor(
    private historyService: HistoryService,
    private breakpointObserver: BreakpointObserver,
    private gridService:GridService) {

      this.breakpointObserver.observe(this.breakPointsArray).subscribe(result => {
        if (result.matches) {
          this.colNumber=this.gridService.getColNumber(result)
        }
      });
    }

  ngOnInit(): void {
    this.historyService.sendHistoryArray();

    this.historyListSub=this.historyService.historyList
      .subscribe((array) => {
        this.historyArray = array;
      })


  }

  ngOnDestroy(): void {
    this.historyListSub.unsubscribe()
  }

}
