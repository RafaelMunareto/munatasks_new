import { NgModule } from '@angular/core';

import { LogoutButtonComponent } from './logout-button.component';
import { SharedModule } from '../../shared.module';

@NgModule({
  declarations: [LogoutButtonComponent],
  imports: [SharedModule],
  exports: [LogoutButtonComponent],
})
export class LogoutButtonModule {}
