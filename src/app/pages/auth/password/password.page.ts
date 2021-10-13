import { OverlayService } from './../../../core/services/overlay.service';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';
import { Component, OnInit } from '@angular/core';

import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage {
  form: FormGroup;
  hasError: boolean;
  errorMessage: string;
  emailSent: boolean;

  constructor(
    private navCtrl: NavController,
    private loadingCtrl: OverlayService,
    private formBuilder: FormBuilder,
    private auth: AuthService
  ) {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
    });
  }

  async signInWithEmail() {
    const loading = await this.loadingCtrl.loading();

    this.auth.sendPasswordResetEmail(this.form.value.email).then(
      () => {
        loading.dismiss();
        this.hasError = false;
        this.emailSent = true;
      },
      (error) => {
        loading.dismiss();
        switch (error.code) {
          case 'auth/invalid-email':
            this.errorMessage = 'Insira um email válido.';
            break;
          case 'auth/user-not-found':
            this.errorMessage = 'Nenhum usuário com este email encontrado.';
            break;
          default:
            this.errorMessage = error;
            break;
        }
        this.hasError = true;
      }
    );
  }

  navigatePop() {
    this.navCtrl.pop();
  }
}
