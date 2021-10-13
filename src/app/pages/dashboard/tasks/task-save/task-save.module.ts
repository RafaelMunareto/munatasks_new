import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TaskSavePageRoutingModule } from './task-save-routing.module';

import { TaskSavePage } from './task-save.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { DirectivesModule } from '../../../../shared/directives/directives.module';
import { ResponsavelService } from '../../../responsaveis/services/responsavel.service';
import { TasksService } from '../services/tasks.service';
import { EtiquetasService } from '../../../etiquetas/services/etiquetas.service';

@NgModule({
  imports: [
    SharedModule,
    ComponentsModule,
    TaskSavePageRoutingModule,
    DirectivesModule,
    FormsModule,
  ],
  declarations: [TaskSavePage],
  providers: [TasksService, EtiquetasService, ResponsavelService],
})
export class TaskSavePageModule {}
