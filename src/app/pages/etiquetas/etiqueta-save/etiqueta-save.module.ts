import { NgModule } from '@angular/core';

import { EtiquetaSavePageRoutingModule } from './etiqueta-save-routing.module';

import { EtiquetaSavePage } from './etiqueta-save.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { DirectivesModule } from 'src/app/shared/directives/directives.module';
import { EtiquetasService } from '../services/etiquetas.service';

@NgModule({
  imports: [
    SharedModule,
    ComponentsModule,
    EtiquetaSavePageRoutingModule,
    DirectivesModule,
  ],
  declarations: [EtiquetaSavePage],
  providers: [EtiquetasService],
})
export class EtiquetaSavePageModule {}
