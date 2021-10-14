import { SharedModule } from '../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { TouchID } from '@ionic-native/touch-id';

import { LoginPageRoutingModule } from './login-routing.module';
import { LoginPage } from './login.page';
import { ComponentsModule } from 'src/app/shared/components/components.module';

@NgModule({
  imports: [SharedModule, LoginPageRoutingModule, ComponentsModule],
  declarations: [LoginPage],
})
export class LoginPageModule {}
