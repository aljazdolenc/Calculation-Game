import { MaterialModule } from './material.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CalculationHistoryComponent } from './calculation-history/calculation-history.component';
import { FormulaBoxComponent } from './formula-box/formula-box.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import{ CUSTOM_ELEMENTS_SCHEMA} from '@angular/core'

@NgModule({
  declarations: [
    AppComponent,
    FormulaBoxComponent,
    CalculationHistoryComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
