import { NgModule } from '@angular/core';

import { EtiquetasRoutingModule } from './etiquetas-routing.module';

import { SharedModule } from 'src/app/shared/shared.module';
import { EtiquetasComponent } from './etiquetas.component';

@NgModule({
  declarations: [EtiquetasComponent],
  imports: [EtiquetasRoutingModule, SharedModule],
})
export class EtiquetasModule {}
