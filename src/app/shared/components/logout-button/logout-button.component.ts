import {
  ClearEtiquetas,
  ClearResponsavel,
  ClearTasks,
} from './../../../core/ngrx/actions/action-types';
import { MenuController, NavController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';

import { AuthService } from 'src/app/core/services/auth.service';
import { OverlayService } from '../../../core/services/overlay.service';
import { Store } from '@ngrx/store';
import { CompletoModel } from 'src/app/core/ngrx/models/completo.model';

@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.scss'],
})
export class LogoutButtonComponent implements OnInit {
  @Input() menu: string;

  constructor(
    private authService: AuthService,
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private overlayService: OverlayService,
    private store: Store<CompletoModel>
  ) {}

  async ngOnInit(): Promise<void> {
    if (!(await this.menuCtrl.isEnabled(this.menu))) {
      this.menuCtrl.enable(true, this.menu);
    }
  }

  async logout() {
    await this.overlayService.alert({
      message: 'Você realmente quer sair?',
      buttons: [
        {
          text: 'SIM',
          handler: async () => {
            await this.authService.logout();
            this.navCtrl.navigateRoot('/login');
            this.menuCtrl.enable(false, this.menu);
            this.store.dispatch(ClearEtiquetas());
            this.store.dispatch(ClearResponsavel());
            this.store.dispatch(ClearTasks());
          },
        },
        'NÃO',
      ],
    });
  }
}
