
export class HistoryItem {
  public equation: string;
  public isCorrect: boolean;

  constructor(equation: string, isCorrect: boolean) {
    this.equation = equation;
    this.isCorrect = isCorrect;
  }
}
