import { NgModule } from '@angular/core';

import { ValidatorNoteComponent } from './validator-note.component';
import { SharedModule } from '../../shared.module';

@NgModule({
  imports: [SharedModule],
  declarations: [ValidatorNoteComponent],
  exports: [ValidatorNoteComponent],
})
export class ValidatorNoteModule {}
