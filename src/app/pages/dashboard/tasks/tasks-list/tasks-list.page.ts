import { etiqueta } from './../../../../core/ngrx/reducers/etiquetas.reducer';
import {
  AddSelectionEtiqueta,
  ClearTasks,
} from './../../../../core/ngrx/actions/action-types';
/* eslint-disable @typescript-eslint/no-shadow */
import {
  AddSelectionResponsavel,
  AddTasks,
} from './../../../../core/ngrx/actions/action-types';
import { NavController } from '@ionic/angular';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { OverlayService } from '../../../../core/services/overlay.service';
import { Tasks } from '../../../../shared/model/tasks.model';
import { TasksService } from '../services/tasks.service';
import { take } from 'rxjs/operators';
import { formatDate } from '@angular/common';
import { EtiquetasService } from '../../../etiquetas/services/etiquetas.service';
import { ResponsavelService } from '../../../responsaveis/services/responsavel.service';
import { select, Store } from '@ngrx/store';
import * as moment from 'moment';
import { Notifications } from 'src/app/shared/functions/notifications';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.page.html',
  styleUrls: ['./tasks-list.page.scss'],
})
export class TasksListPage {
  //tarefas
  tasks: any[] = [];
  filteredTasks: any[] = [];

  //outros
  filtro;
  color;
  isOpen = true;

  //forms
  taskForm: FormGroup;

  //etiquetas
  etiquetas: any[] = [];
  etiqueta;

  //responsaveis
  responsaveis: any[] = [];
  responsavel;

  //parâmetros
  etiquetaParam;
  responsavelParam;
  faseParam;

  constructor(
    private tasksService: TasksService,
    private navCtrl: NavController,
    private fb: FormBuilder,
    private overlayService: OverlayService,
    private etiquetaService: EtiquetasService,
    private responsavelService: ResponsavelService,
    private store: Store<any>,
    public nt: Notifications
  ) {
    this.createForm();
    this.storeAction();
  }

  async ionViewDidEnter(): Promise<void> {
    this.actionEtiquetasResponsaveis();
  }

  filterTasks(): void {
    let newTasks = [...this.tasks];
    const data = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    switch (this.faseParam) {
      case 'todos':
        newTasks = newTasks;
        break;
      case 'hoje':
        newTasks = newTasks.filter(
          (r) => formatDate(r.data, 'yyyy-MM-dd', 'en') === data && !r.done
        );
        break;
      case 'vencidos':
        newTasks = newTasks.filter(
          (r) => formatDate(r.data, 'yyyy-MM-dd', 'en') < data && !r.done
        );
        break;
      case 'abertos':
        newTasks = newTasks.filter((r) => r.done === false);
        break;
      case 'finalizados':
        newTasks = newTasks.filter((r) => r.done);
        break;
      case 'sinalizados':
        newTasks = newTasks.filter((r) => r.sinalizado && !r.done);
    }
    if (Boolean(this.etiquetaParam)) {

      newTasks = newTasks.filter(
        (r) =>
          this.etiquetaParam === 'todos' ||
          (r.tipo === this.etiquetaParam && !r.done)
      );
    }
    if (Boolean(this.responsavelParam)) {
      newTasks = newTasks.filter(
        (r) =>
          this.responsavelParam === 'todos' ||
          (r.responsavel && r.responsavel?.includes(this.responsavelParam))
      );
    }
    this.filteredTasks = newTasks;
  }

  onUpdate(task: Tasks): void {
    this.navCtrl.navigateForward(['tasks/edit', task.id]);
  }

  async onDone(task: Tasks): Promise<void> {
    const taskToUpdate = { ...task, done: !task.done };

    setTimeout(() => {
      this.store.dispatch(AddTasks([taskToUpdate]));
      this.tasksService.update(taskToUpdate);
      this.filterTasks();
      this.cor();
    }, 400);
    await this.overlayService.toast({
      message: `Tarefa ${task.title} ${
        taskToUpdate.done ? 'Atualizada' : 'Atualizada'
      }!`,
    });
  }

  async onHoje(task: Tasks) {
    const taskToUpdate = {
      ...task,
      data: moment(new Date()).format('YYYY-MM-DDTHH:mmZ'),
    };
    setTimeout(() => {
      this.store.dispatch(AddTasks([taskToUpdate]));
      this.tasksService.update(taskToUpdate);
      this.filterTasks();
      this.cor();
      this.nt.notificationsAcionar();
    }, 400);
    await this.overlayService.toast({
      message: `Tarefa ${task.title} ${
        taskToUpdate.done ? 'Atualizada' : 'Atualizada'
      }!`,
    });
  }

  async onSinalizada(task: Tasks): Promise<void> {
    const taskToUpdate = { ...task, sinalizado: !task.sinalizado };
    this.store.dispatch(AddTasks([taskToUpdate]));
    this.filterTasks();
    this.cor();
    await this.tasksService.update(taskToUpdate);
    await this.overlayService.toast({
      message: `Tarefa ${task.title} ${
        taskToUpdate.done ? 'Atualizada' : 'Atualizada'
      }!`,
    });
  }

  async getItems(ev: any) {
    const val = ev.target.value;
    if (val && val !== '') {
      this.tasks.filter(
        (state) => state.title.toLowerCase().indexOf(val.toLowerCase()) !== -1
      );
    }
  }

  changeSelect(event) {
    this.store.dispatch(AddSelectionEtiqueta(event.target.value));
  }

  changeSelectResponsavel(event: any) {
    this.store.dispatch(AddSelectionResponsavel(event.target.value));
  }

  corEtiqueta(tipo: string): string {
    try {
      const cor = this.etiquetas.find((element) => element.nome === tipo);
      return cor.cor;
    } catch (e) {
      return;
    }
  }

  cor(): void {
    switch (this.faseParam) {
      case 'hoje':
        this.color = 'primary';
        break;
      case 'abertos':
        this.color = 'success';
        break;
      case 'vencidos':
        this.color = 'danger';
        break;
      case 'sinalizados':
        this.color = 'warning';
        break;
      case 'todos':
        this.color = 'medium';
        break;
      case 'finalizados':
        this.color = 'primary';
        break;
    }
  }

  private createForm() {
    this.taskForm = this.fb.group({
      tipo: [''],
      responsavel: [''],
    });
  }

  private async actionEtiquetasResponsaveis() {
    await this.etiquetaService
      .getAll()
      .pipe(take(1))
      .subscribe((res) => {
        this.etiquetas = res;
      });

    await this.responsavelService
      .getAll()
      .pipe(take(1))
      .subscribe((res: any) => {
        this.responsaveis = res;
      });
  }

  private storeAction() {
    this.store.pipe(select('selectBox'), take(1)).subscribe((res: any) => {
      this.faseParam = res.fase;
      this.etiquetaParam = res.etiqueta;
      this.responsavelParam = res.responsavel;
      this.filterTasks();
      this.cor();
    });
    this.store.select('tasks').subscribe((data) => {
      this.tasks = data.tasks;
      this.filterTasks();
      this.cor();
    });
  }
}
