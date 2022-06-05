import { FormulaService } from './formula.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-formula-box',
  templateUrl: './formula-box.component.html',
  styleUrls: ['./formula-box.component.css']
})
export class FormulaBoxComponent implements OnInit {

  firstNum: number = 0;
  secondNum: number = 0;

  wrongAnswer: boolean = false;
  correctAnswer: boolean = false;

  resultForm= new FormControl('',Validators.required);

  constructor(private formulaService: FormulaService) { }

  ngOnInit(): void {
    this.generateNewEquation()
  }

  generateNewEquation() {
    this.firstNum = this.formulaService.getRandomNumber();
    this.secondNum = this.formulaService.getRandomNumber();
    this.correctAnswer = false;
    this.resultForm.reset();
  }

  resetWrongMessage(){
    this.wrongAnswer = false;
  }

  submitResult(result:number){
    if(isNaN(result) || !(typeof result == 'number')){
      alert('Invalid input value!')
      return
    }
    if(this.correctAnswer){
      alert('Wait...')
      return
    }

    console.log('it passed')

    const isCorrect:boolean = this.formulaService.validateResult(this.firstNum, this.secondNum, result);


    if (isCorrect) {
      this.wrongAnswer=false;
      this.correctAnswer = true;
      setTimeout(()=>this.generateNewEquation(),4000);
    } else {
      this.wrongAnswer = true;
      this.resultForm.reset();
    }
  }
}
