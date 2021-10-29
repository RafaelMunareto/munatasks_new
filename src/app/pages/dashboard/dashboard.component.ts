import { finalize } from 'rxjs/operators';
/* eslint-disable @typescript-eslint/no-shadow */
import { Component } from '@angular/core';
import { TasksService } from './tasks/services/tasks.service';
import { select, Store } from '@ngrx/store';
import { Tasks } from 'src/app/shared/model/tasks.model';
import {
  AddEtiquetas,
  AddResponsavel,
  AddTasks,
  ClearEtiquetas,
  ClearResponsavel,
  ClearTasks,
} from 'src/app/core/ngrx/actions/action-types';
import { EtiquetasService } from '../etiquetas/services/etiquetas.service';
import { ResponsavelService } from '../responsaveis/services/responsavel.service';
import { Notifications } from 'src/app/shared/functions/notifications';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  contador: any[];
  totalTaks = 0;
  totalEtiquetas = 0;
  totalResponsaveis = 0;
  alert: Tasks[] = [];

  constructor(
    public tasksService: TasksService,
    public etiquetasService: EtiquetasService,
    public responsaveisService: ResponsavelService,
    private store: Store<any>,
    private nt: Notifications
  ) {}

  ionViewDidEnter() {

    //chamada do tasks
    this.store.pipe(select('tasks'), finalize(() => this.nt.notificationsAcionar())).subscribe((res: any) => {
      this.contador = res.contador;
      this.totalTaks = res.tasks.length;
    });
    //condicao para executar o ngrx tem tb no appComponente
    this.tasksService.getAll().subscribe((res) => {
      if (res.length !== this.totalTaks) {
        this.store.dispatch(ClearTasks());
        this.store.dispatch(AddTasks(res));
      }
    });
    this.etiquetasService.getAll().subscribe((res) => {
      if (res.length !== this.totalEtiquetas) {
        this.store.dispatch(ClearEtiquetas());
        this.store.dispatch(AddEtiquetas(res));
      }
    });
    this.responsaveisService.getAll().subscribe((res) => {
      if (res.length !== this.totalResponsaveis) {
        this.store.dispatch(ClearResponsavel());
        this.store.dispatch(AddResponsavel(res));
      }
    });
  }
}
