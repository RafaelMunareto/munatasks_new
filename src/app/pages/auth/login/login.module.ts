import { SharedModule } from '../../../shared/shared.module';
import { NgModule } from '@angular/core';

import { LoginPageRoutingModule } from './login-routing.module';
import { LoginPage } from './login.page';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { CurrentPlatformService } from 'src/app/shared/services/current-plataform.service';
import { EtiquetasService } from '../../etiquetas/services/etiquetas.service';
import { ResponsavelService } from '../../responsaveis/services/responsavel.service';
import { TasksService } from '../../dashboard/tasks/services/tasks.service';

@NgModule({
  imports: [SharedModule, LoginPageRoutingModule, ComponentsModule],
  declarations: [LoginPage],
  providers:[CurrentPlatformService, EtiquetasService, ResponsavelService, TasksService]
})
export class LoginPageModule {}
