import {
  AddSelectionEtiqueta,
  AddSelectionFase,
  RemoveEtiquetas,
} from './../../../core/ngrx/actions/action-types';
import { CompletoModel } from './../../../core/ngrx/models/completo.model';
import { OverlayService } from './../../../core/services/overlay.service';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { map, distinctUntilChanged, tap } from 'rxjs/operators';
import { Etiqueta } from 'src/app/shared/model/etiquetas.model';
import { TasksService } from '../tasks/services/tasks.service';
import { select, Store } from '@ngrx/store';
import { EtiquetasService } from '../../etiquetas/services/etiquetas.service';

@Component({
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePageComponent {
  etiquetas$: Observable<Etiqueta[]>;
  filtro;
  contador;

  constructor(
    public tasksService: TasksService,
    private navCtrl: NavController,
    private etiquetasService: EtiquetasService,
    private overlayService: OverlayService,
    private store: Store<CompletoModel>
  ) {}

  async ionViewDidEnter(): Promise<void> {
    setTimeout(() => {
      this.etiquetas$ = this.store.pipe(
        select('etiquetas'),
        map((res: any) => res.etiquetas)
      );

      this.store.pipe(select('tasks')).subscribe((res: any) => {
        this.contador = res.contador;
      });
    }, 700);
  }

  onUpdate(etiqueta: Etiqueta): void {
    this.navCtrl.navigateForward(['etiquetas', 'edit', etiqueta.id]);
  }

  onDetail(etiqueta: Etiqueta): void {
    this.navCtrl.navigateForward(['/tasks/list']);
    this.store.dispatch(AddSelectionFase('todos'));
    setTimeout(
      () => this.store.dispatch(AddSelectionEtiqueta(etiqueta.nome)),
      10
    );
  }

  onDirect(event: any) {
    this.store.dispatch(AddSelectionFase(event));
    this.store.dispatch(AddSelectionEtiqueta('todos'));
    this.navCtrl.navigateRoot(['/tasks/list']);
  }

  async onDelete(etiqueta: Etiqueta): Promise<void> {
    await this.overlayService.alert({
      message: `Tem certeza que deseja excluír a tarefa ${etiqueta.nome} ?`,
      buttons: [
        {
          text: 'Sim',
          handler: async () => {
            await this.etiquetasService.delete(etiqueta);
            await this.overlayService.toast({
              message: `Etiqueta ${etiqueta.nome} deletada!`,
            });
            this.store.dispatch(RemoveEtiquetas(etiqueta.id));
          },
        },
        'Não',
      ],
    });
  }

  async getItems(ev: any) {
    const val = ev.target.value;

    if (val && val !== '') {
      this.etiquetas$ = this.etiquetas$.pipe(
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
