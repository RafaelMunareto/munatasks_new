import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { EtiquetasService } from '../etiquetas/services/etiquetas.service';
import { ResponsavelService } from '../responsaveis/services/responsavel.service';
import { TasksService } from './tasks/services/tasks.service';

@NgModule({
  declarations: [DashboardComponent],
  imports: [DashboardRoutingModule, SharedModule, ComponentsModule],
  providers: [TasksService, EtiquetasService, ResponsavelService],
})
export class DashboardModule {}
