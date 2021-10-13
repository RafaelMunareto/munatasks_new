import { NgModule } from '@angular/core';

import { ValidatorNoteModule } from './../validator-note/validator-note.module';
import { SharedModule } from '../../shared.module';
import { InputIconValildComponent } from './input-icon-valild.component';


@NgModule({
  declarations: [InputIconValildComponent],
  imports: [SharedModule, ValidatorNoteModule],
  exports: [InputIconValildComponent],
})
export class InputIconValidModule {}
