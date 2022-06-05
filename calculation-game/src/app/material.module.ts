import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { LayoutModule } from "@angular/cdk/layout";
import { NgModule } from "@angular/core";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatInputModule } from '@angular/material/input';


const MaterialComponents:any[]=[
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatListModule,
  MatGridListModule,
  LayoutModule
];

@NgModule({
  imports:[MaterialComponents],
  exports:[MaterialComponents],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}}],
})
export class MaterialModule{ }
