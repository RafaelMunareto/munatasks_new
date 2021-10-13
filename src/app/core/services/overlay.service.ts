import { Injectable } from '@angular/core';
import {
  AlertController,
  AlertOptions,
  LoadingController,
  LoadingOptions,
  ToastController,
  ToastOptions,
} from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class OverlayService {
  constructor(
    private alertCtrl: AlertController,
    private loadController: LoadingController,
    private toastController: ToastController
  ) {}

  async alert(options?: AlertOptions): Promise<HTMLIonAlertElement> {
    const alert = await this.alertCtrl.create(options);
    await alert.present();
    return alert;
  }

  async loading(options?: LoadingOptions): Promise<HTMLIonLoadingElement> {
    const loading = await this.loadController.create({
      message: 'Carregando...',
      ...options,
    });
    await loading.present();
    return loading;
  }

  async toast(options?: ToastOptions): Promise<HTMLIonToastElement> {
    const toast = await this.toastController.create({
      position: 'bottom',
      duration: 3000,
      animated: true,
      cssClass: 'overlay-toast',
      message: '',
      ...options,
      buttons: [
        {
          text: 'OK',
          role: 'Cancelar',
        },
      ],
    });
    await toast.present();
    return toast;
  }
}
