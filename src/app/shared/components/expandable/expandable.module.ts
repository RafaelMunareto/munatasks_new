import { NgModule } from '@angular/core';
import { ExpandableComponent } from './expandable.component';
import { SharedModule } from '../../shared.module';

@NgModule({
  declarations: [ExpandableComponent],
  imports: [
    SharedModule
  ],
  exports: [
    ExpandableComponent
  ]
})
export class ExpandableModule { }
