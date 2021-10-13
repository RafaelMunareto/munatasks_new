import { RemoveResponsavel } from './../../../core/ngrx/actions/action-types';
import { select, Store } from '@ngrx/store';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Component } from '@angular/core';

import { OverlayService } from '../../../core/services/overlay.service';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { Responsavel } from '../../../shared/model/responsavel.model';
import { ResponsavelService } from './../services/responsavel.service';

@Component({
  templateUrl: './responsaveis-list.page.html',
  styleUrls: ['./responsaveis-list.page.scss'],
})
export class ResponssaveisListPage {
  responsaveis$: Observable<Responsavel[]>;
  filtro;

  constructor(
    private navCtrl: NavController,
    private responsaveisService: ResponsavelService,
    private store: Store<any>,
    private overlayService: OverlayService
  ) {}

  async ionViewDidEnter(): Promise<void> {
    const loading = await this.overlayService.loading();

    this.responsaveis$ = this.store.pipe(select('responsaveis'));

    this.responsaveis$ = this.responsaveisService.getAll();

    this.responsaveis$.subscribe(() => {
      loading.dismiss();
    });
  }

  onUpdate(responsavel: Responsavel): void {
    this.navCtrl.navigateForward(['/responsaveis', 'edit', responsavel.id]);
  }

  async onDelete(responsavel: Responsavel): Promise<void> {
    await this.overlayService.alert({
      message: `Tem certeza que deseja excluír o responsável ${responsavel.nome} ?`,
      buttons: [
        {
          text: 'Sim',
          handler: async () => {
            await this.responsaveisService.delete(responsavel);
            await this.overlayService.toast({
              message: `Responsável ${responsavel.nome} deletado!`,
            });
            this.store.dispatch(RemoveResponsavel(responsavel.id));
          },
        },
        'Não',
      ],
    });
  }

  async getItems(ev: any) {
    const val = ev.target.value;

    if (val && val !== '') {
      this.responsaveis$ = this.responsaveis$.pipe(
        distinctUntilChanged(),
        map((res) =>
          res.filter(
            (state) =>
              state.nome.toLowerCase().indexOf(val.toLowerCase()) !== -1
          )
        )
      );
    }
  }
}
