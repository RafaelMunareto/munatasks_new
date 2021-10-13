import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { GeralRoutingModule } from './home-routing.module';

import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { HomePageComponent } from './home.page';
import { EtiquetasService } from '../../etiquetas/services/etiquetas.service';

@NgModule({
  imports: [SharedModule, ComponentsModule, GeralRoutingModule, FormsModule],
  declarations: [HomePageComponent],
  providers: [EtiquetasService],
})
export class HomePageModule {}
