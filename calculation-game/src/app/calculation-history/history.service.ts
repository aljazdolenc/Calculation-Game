
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HistoryItem } from "../shared/history-item.model";

@Injectable({providedIn:"root"})
export class HistoryService{

  historyList= new Subject<HistoryItem[]>()

  historyArray:HistoryItem[]=[];

  sendHistoryArray(){
    this.historyList.next(this.historyArray)
  }

  pushNewEquation(num1:number,num2:number,result:number,isCorrect:boolean){
    let fullEquation:string= `${num1} + ${num2} = ${result}` ;

    this.historyArray.push(new HistoryItem(fullEquation, isCorrect));
    this.sendHistoryArray()
  }


}
