import {
  AddSelectionFase,
  AddTasks,
} from './../../../../core/ngrx/actions/action-types';
import { NavController } from '@ionic/angular';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import * as moment from 'moment';

import { TasksService } from '../services/tasks.service';
import { OverlayService } from '../../../../core/services/overlay.service';
import { EtiquetasService } from '../../../etiquetas/services/etiquetas.service';
import { select, Store } from '@ngrx/store';
import { CompletoModel } from 'src/app/core/ngrx/models/completo.model';
import * as firebase from 'firebase';

@Component({
  templateUrl: './task-save.page.html',
  styleUrls: ['./task-save.page.scss'],
})
export class TaskSavePage {
  pageTitle = '...';
  taskForm: FormGroup;
  taskId: string = undefined;
  pickerShow = false;
  hoje = moment(new Date()).format('YYYY-MM-DDTHH:mmZ');

  etiquetas = [];
  responsaveis: any[] = [];
  responsavel: any[] = [];
  responsaveisTask: any;

  constructor(
    private fb: FormBuilder,
    private tasksService: TasksService,
    private overlayService: OverlayService,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private etiquetaService: EtiquetasService,
    private store: Store<CompletoModel>
  ) {
    this.createForm();
  }

  ionViewDidEnter() {
    this.store.pipe(select('responsaveis')).subscribe((res: any) => {
      this.responsaveis = res.responsaveis;
    });
    this.init();
  }

  init(): void {
    this.taskId = this.route.snapshot.paramMap.get('id');
    this.etiquetaService
      .getAll()
      .pipe(take(1))
      .subscribe((res) => (this.etiquetas = res));

    if (!this.taskId) {
      this.store.dispatch(AddSelectionFase('create'));
      this.pageTitle = 'Criar Tarefa';
      return;
    } else {
      this.pageTitle = 'Editar Tarefa';
      this.tasksService
        .get(this.taskId)
        .pipe(take(1))
        .subscribe(({ title, done, tipo, data, sinalizado, responsavel }) => {
          this.taskForm.get('title').setValue(title);
          this.taskForm.get('done').setValue(done);
          this.taskForm.get('tipo').setValue(tipo);
          this.taskForm.get('data').setValue(data);
          this.taskForm.get('sinalizado').setValue(sinalizado);
          this.taskForm.get('responsavel').setValue(responsavel);
          this.responsaveisTask = responsavel ?? [];
        });
    }
  }

  async onSubmit(): Promise<void> {
    const loading = await this.overlayService.loading({
      message: 'Salvando ...',
    });
    try {
      if (this.taskId) {
        const newTask = await this.tasksService.update({
          id: this.taskId,
          ...this.taskForm.value,
        });
        this.store.dispatch(AddTasks([newTask]));
        this.navCtrl.back();
      } else {
        const newTask = await this.tasksService.create({
          ...this.taskForm.value,
        });
        this.store.dispatch(AddTasks([newTask]));
        this.navCtrl.navigateBack(`/tasks`);
      }
    } catch (error) {
      await this.overlayService.toast({
        message: error.message,
      });
    } finally {
      loading.dismiss();
    }
  }

  toogle(event: any, nome: any) {
    if (event.detail.checked) {
      this.responsavel.push(nome);
    } else {
      this.responsavel = this.responsavel.filter((res) => res !== nome);
    }

    this.taskForm.get('responsavel').setValue(this.responsavel);
  }

  povoaChecked(event: any) {
    return this.responsaveisTask?.includes(event);
  }

  hojeAction(event) {
    if (event.detail.checked) {
      this.pickerShow = true;
      this.taskForm.get('data').setValue(this.hoje);
    } else {
      this.pickerShow = false;
    }
  }

  get title(): any {
    return this.taskForm.get('title');
  }

  private createForm() {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      tipo: ['', [Validators.required, Validators.minLength(3)]],
      data: ['', [Validators.required]],
      responsavel: [''],
      done: [false],
      sinalizado: [false],
    });
  }
}
