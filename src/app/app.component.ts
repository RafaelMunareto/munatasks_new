import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

import { AuthService } from 'src/app/core/services/auth.service';
import {
  AddEtiquetas,
  AddResponsavel,
  AddTasks,
} from './core/ngrx/actions/action-types';
import { TasksService } from './pages/dashboard/tasks/services/tasks.service';
import { EtiquetasService } from './pages/etiquetas/services/etiquetas.service';
import { ResponsavelService } from './pages/responsaveis/services/responsavel.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  pages: { url: string; direction: any; icon: string; text: string }[];
  user: firebase.default.User;

  constructor(
    private authService: AuthService,
    private etiquetasService: EtiquetasService,
    private responsavelService: ResponsavelService,
    private taskServices: TasksService,
    private store: Store<any>
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.authService.authState$.subscribe((user) => {
      this.user = user;
      if (user) {
        this.callNgrxGet();
      }
    });

    this.pages = [
      {
        url: '/tasks',
        icon: 'home-outline',
        direction: 'back',
        text: 'Home',
      },
      {
        url: '/responsaveis',
        icon: 'man-outline',
        direction: 'forward',
        text: 'Responsáveis',
      },
      {
        url: '/etiquetas/create',
        icon: 'add-circle-outline',
        direction: 'forward',
        text: 'Nova Etiqueta',
      },
      {
        url: '/responsaveis/create',
        icon: 'add-circle-outline',
        direction: 'forward',
        text: 'Novo Responsável',
      },
      {
        url: '/tasks/create',
        icon: 'add',
        direction: 'forward',
        text: 'Nova Tarefa',
      },
    ];
  }

  private callNgrxGet() {
    this.etiquetasService
      .getAll()
      .pipe(take(1))
      .subscribe((res) => {
        this.store.dispatch(AddEtiquetas(res));
      });

    this.taskServices
      .getAll()
      .pipe(take(1))
      .subscribe((res) => {
        this.store.dispatch(AddTasks(res));
      });

    this.responsavelService
      .getAll()
      .pipe(take(1))
      .subscribe((res) => {
        this.store.dispatch(AddResponsavel(res));
      });
  }
}
