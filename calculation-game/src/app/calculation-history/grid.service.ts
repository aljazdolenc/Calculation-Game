import { Injectable } from "@angular/core";
import { Breakpoints } from '@angular/cdk/layout';
@Injectable({providedIn: 'root'})
export class GridService{

  gridByBreakpoint = {
    xl: 4,
    lg: 3,
    md: 3,
    sm: 2,
    xs: 1
  }

  getColNumber(breakPoint:any):number{
    switch(breakPoint.matches){

      case breakPoint.breakpoints[Breakpoints.XSmall]:
      return this.gridByBreakpoint.xs;

      case breakPoint.breakpoints[Breakpoints.Small]:
      return this.gridByBreakpoint.sm;

      case breakPoint.breakpoints[Breakpoints.Medium]:
      return this.gridByBreakpoint.md;

      case breakPoint.breakpoints[Breakpoints.Large]:
      return this.gridByBreakpoint.lg;

      case breakPoint.breakpoints[Breakpoints.XLarge]:
      return this.gridByBreakpoint.xl;

      default:
      return 1;
    }
  }


}
