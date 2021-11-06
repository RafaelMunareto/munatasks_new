import { debounceTime, take } from 'rxjs/operators';
/* eslint-disable @typescript-eslint/no-shadow */
import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
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
import { formatDate } from '@angular/common';
import { AuthService } from 'src/app/core/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  contador: any[];
  totalTaks = 0;
  totalEtiquetas = 0;
  totalResponsaveis = 0;
  alert: any[] = [];
  constructor(
    public tasksService: TasksService,
    public etiquetasService: EtiquetasService,
    public responsaveisService: ResponsavelService,
    private store: Store<any>,
    private nt: Notifications,
    private authService: AuthService,
    private bd: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.notificationsAcionar();
  }

  ionViewDidEnter() {
    this.notificationsAcionar().then(() => this.nt.simpleNotif(this.alert));

    //chamada do tasks
    this.store.pipe(select('tasks')).subscribe((res: any) => {
      this.contador = res.contador;
      this.totalTaks = res.tasks.length;
    });
    //condicao para executar o ngrx tem tb no appComponente
    this.tasksService.getAll().subscribe((res) => {
      this.store.dispatch(ClearTasks());
      this.store.dispatch(AddTasks(res));
    });
    this.etiquetasService.getAll().subscribe((res) => {
      this.store.dispatch(ClearEtiquetas());
      this.store.dispatch(AddEtiquetas(res));
    });
    this.responsaveisService.getAll().subscribe((res) => {
      this.store.dispatch(ClearResponsavel());
      this.store.dispatch(AddResponsavel(res));
    });
  }

  public async notificationsAcionar() {
    const data = formatDate(new Date(), 'yyyy-MM-dd', 'en');

    await this.authService.authState$.subscribe((user) => {
      if (user) {
        this.bd
          .collection(`/users/${user.uid}/tasks`, (ref) =>
            ref
              .where('done', '==', false)
              .orderBy('data', 'asc')
              .orderBy('title', 'asc')
          )
          .valueChanges()
          .pipe(take(1), debounceTime(1000))
          .subscribe((res) => {
            this.alert = res.filter(
              (r: any) =>
                this.convertData(formatDate(r.data, 'yyyy-MM-dd', 'en')) <
                this.convertData(data)
            );
          });
      }
    });
  }

  private convertData(data) {
    const value = new Date(data);

    return value;
  }
}
