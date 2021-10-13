import { ResponsavelService } from '../services/responsavel.service';
import { NgModule } from '@angular/core';

import { ComponentsModule } from 'src/app/shared/components/components.module';
import { DirectivesModule } from 'src/app/shared/directives/directives.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { ResponsibleSavePageRoutingModule } from './responsaveis-save-routing.module';
import { ResponsaveisSavePage } from './responsaveis-save.page';

@NgModule({
  imports: [
    SharedModule,
    ComponentsModule,
    DirectivesModule,
    ResponsibleSavePageRoutingModule,
  ],
  declarations: [ResponsaveisSavePage],
  providers: [ResponsavelService],
})
export class ResponsaveisSavePageModule {}
