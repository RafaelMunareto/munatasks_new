import { LogoutButtonModule } from './../logout-button/logout-button.module';
import { NgModule } from '@angular/core';
import { MenuToggleComponent } from './menu-toggle.component';
import { SharedModule } from '../../shared.module';

@NgModule({
  declarations: [MenuToggleComponent],
  imports: [SharedModule, LogoutButtonModule],
  exports: [MenuToggleComponent],
})
export class MenuToggleModule {}
