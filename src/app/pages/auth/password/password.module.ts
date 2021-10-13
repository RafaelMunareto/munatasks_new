import { NgModule } from '@angular/core';

import { PasswordPageRoutingModule } from './password-routing.module';

import { PasswordPage } from './password.page';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [SharedModule, ComponentsModule, PasswordPageRoutingModule],
  declarations: [PasswordPage],
})
export class PasswordPageModule {}
