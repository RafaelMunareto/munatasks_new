import { EtiquetaItemComponent } from './etiqueta-item.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [EtiquetaItemComponent],
  imports: [SharedModule],
  exports: [EtiquetaItemComponent],
})
export class EtiquetaItemModule {}
