import { ResponsaveisItemComponent } from './responsaveis-item.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [ResponsaveisItemComponent],
  imports: [SharedModule],
  exports: [ResponsaveisItemComponent],
})
export class ResponsaveisItemModule {}
