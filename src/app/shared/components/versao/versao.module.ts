import { CurrentPlatformService } from 'src/app/shared/services/current-plataform.service';
import { VersaoComponent } from './versao.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    VersaoComponent
  ],
  imports: [
    SharedModule
  ],
  exports:[
    VersaoComponent
  ],

})
export class VersaoModule { }
