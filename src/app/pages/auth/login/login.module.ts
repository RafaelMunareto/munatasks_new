import { SharedModule } from '../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { TouchID } from '@ionic-native/touch-id';

import { LoginPageRoutingModule } from './login-routing.module';
import { LoginPage } from './login.page';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { BiometricWrapper } from '@ionic-native/biometric-wrapper/ngx';
import { CurrentPlatformService } from 'src/app/shared/services/current-plataform.service';

@NgModule({
  imports: [SharedModule, LoginPageRoutingModule, ComponentsModule],
  declarations: [LoginPage],
  providers:[BiometricWrapper, CurrentPlatformService]
})
export class LoginPageModule {}
