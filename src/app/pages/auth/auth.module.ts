import { ResponsavelService } from './../responsaveis/services/responsavel.service';
import { NgModule } from '@angular/core';
import { TasksService } from '../dashboard/tasks/services/tasks.service';
import { EtiquetasService } from '../etiquetas/services/etiquetas.service';

import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  imports: [AuthRoutingModule],
})
export class AuthModule {}
