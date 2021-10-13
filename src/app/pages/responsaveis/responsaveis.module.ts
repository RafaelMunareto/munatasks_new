import { NgModule } from '@angular/core';

import { ResponsaveisPageRoutingModule } from './responsaveis-routing.module';
import { CoreModule } from './../../core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ResponsaveisComponent } from './responsaveis.component';

@NgModule({
  declarations: [ResponsaveisComponent],
  imports: [SharedModule, ResponsaveisPageRoutingModule],
})
export class ResponsaveisPageModule {}
