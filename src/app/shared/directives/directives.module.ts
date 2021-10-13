import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { TaskTiposDirective } from './task-tipos.directive';
import { EtiquetaColorsDirective } from './etiqueta-colors.directive';

@NgModule({
  declarations: [TaskTiposDirective, EtiquetaColorsDirective],
  imports: [SharedModule],
  exports: [TaskTiposDirective, EtiquetaColorsDirective],
})
export class DirectivesModule {}
