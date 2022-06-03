import { HistoryService } from './../calculation-history/history.service';

import { Injectable } from "@angular/core";

@Injectable({providedIn:"root"})
export class FormulaService{

  constructor(private historyService:HistoryService){}

  getRandomNumber():number{
    return Math.floor(Math.random()*101)// Returns number between 0-100
  }

  validateResult(num1:number,num2:number,result:number):boolean {//Takes in 2 numbers and checks if they equal users input
    const correctResult:number= num1 + num2;

    const isCorrect:boolean = (correctResult===result) ? true : false; // If correct result matches users result it's true

    this.historyService.pushNewEquation(num1,num2,result,isCorrect); //Pushes new item to historyArray

    return isCorrect;
  }


}
