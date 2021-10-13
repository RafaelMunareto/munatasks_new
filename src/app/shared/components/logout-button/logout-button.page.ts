import { MenuController, NavController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';

import { AuthService } from 'src/app/core/services/auth.service';
import { OverlayService } from './../../../core/services/overlay.service';

@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.page.html',
  styleUrls: ['./logout-button.page.scss'],
})
export class LogoutButtonPage implements OnInit {
  @Input() menu: string;

  constructor(
    private authService: AuthService,
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private overlayService: OverlayService
  ) {}

  async ngOnInit(): Promise<void> {
    if (!(await this.menuCtrl.isEnabled(this.menu))) {
      this.menuCtrl.enable(true, this.menu);
    }
  }

  async logout() {
    await this.overlayService.alert({
      message: 'Do you really want to quit?',
      buttons: [
        {
          text: 'YES',
          handler: async () => {
            await this.authService.logout();
            this.navCtrl.navigateRoot('/login');
            this.menuCtrl.enable(false, this.menu);
          },
        },
        'NO',
      ],
    });
  }
}
