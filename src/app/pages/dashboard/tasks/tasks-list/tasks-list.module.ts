import { ResponsavelService } from '../../../responsaveis/services/responsavel.service';
import { FormsModule } from '@angular/forms';
import { TasksService } from '../services/tasks.service';
import { NgModule } from '@angular/core';

import { TasksListPageRoutingModule } from './tasks-list-routing.module';
import { TasksListPage } from './tasks-list.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { DirectivesModule } from '../../../../shared/directives/directives.module';
import { EtiquetasService } from '../../../etiquetas/services/etiquetas.service';

@NgModule({
  imports: [
    SharedModule,
    ComponentsModule,
    TasksListPageRoutingModule,
    FormsModule,
    DirectivesModule,
  ],
  providers: [TasksService, EtiquetasService, ResponsavelService],
  declarations: [TasksListPage],
})
export class TasksListPageModule {}
