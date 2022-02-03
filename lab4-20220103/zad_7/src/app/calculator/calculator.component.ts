import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  result: number;
  inputNumber?: number;
  equation: string = "";
  digits: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  ops: string[] = ["+", "-", "x", ":", "="];
  opToDo?: string;

  constructor() {
    this.result = 0;
  }

  ngOnInit(): void {
  }

  reset(): void {
    this.result = 0;
    this.inputNumber = 0;
    this.equation = "";
  }

  numDigits(x: number): number {
    return Math.max(Math.floor(Math.log10(Math.abs(x))), 0) + 1;
  }

  registerDigit(digit: number): void {
    let res: number = 0;
    let pow: number = 0;
    let temp = this.inputNumber;
    if (!temp) {
      temp = 0;
    }

    while(temp > 0) {
      pow++;
      res += temp%10 * Math.pow(10, pow);
      temp = ~~(temp / 10);
    }

    res += digit;
    this.inputNumber = res;
  }

  updateEquation(op: string): void {
    if (!this.equation || this.equation.length <= 1 || this.equation === ""){
      this.equation = "" + this.result;
    }
    if (op === "=") {
      this.equation = "" + this.result;
    } else {
      this.equation += op;
    }
  }

  calculate(): void {
    switch(this.opToDo){
      case "+":
        if (!this.inputNumber){
          this.inputNumber = 0;
        }
        this.result = this.result + this.inputNumber;
        break;
      case "-":
        if (!this.inputNumber){
          this.inputNumber = 0;
        }
        this.result = this.result - this.inputNumber;
        break;
      case "x":
        if (!this.inputNumber){
          this.inputNumber = 1;
        }
        this.result = this.result * this.inputNumber;
        break;
      case ":":
        if (!this.inputNumber){
          this.inputNumber = 1;
        }
        this.result = ~~(this.result / this.inputNumber);
        break;
    }

    this.inputNumber = 0;
  }

  handleOp(op: string): void {
    if(op === "=" || op == "=") {
      this.calculate();
    } else {
      if (!this.opToDo) {
        this.result = this.inputNumber ? this.inputNumber : 0;
        this.inputNumber = 0;
      }
      this.opToDo = op;
    }

    this.updateEquation(op);
  }
}
