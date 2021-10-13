import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { ResponsibleListPageRoutingModule } from './responsaveis-list-routing.module';

import { ResponssaveisListPage } from './responsaveis-list.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { ResponsavelService } from './../services/responsavel.service';

@NgModule({
  imports: [SharedModule, ComponentsModule, ResponsibleListPageRoutingModule, FormsModule],
  declarations: [ResponssaveisListPage],
  providers: [ResponsavelService],
})
export class ResponsaveisListPageModule {}
