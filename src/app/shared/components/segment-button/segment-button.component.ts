/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable prefer-const */
import { NavigationEnd, Router } from '@angular/router';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { AlertController, NavController } from '@ionic/angular';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter, take } from 'rxjs/operators';

import {
  AddSelectionFase,
  AddSelectionEtiqueta,
  AddTasks,
} from './../../../core/ngrx/actions/action-types';

import { Tasks } from '../../model/tasks.model';
import * as moment from 'moment';
import { TasksService } from 'src/app/pages/dashboard/tasks/services/tasks.service';
import { TasksFunctions } from '../../functions/tasks-functions';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-segment-button',
  templateUrl: './segment-button.component.html',
  styleUrls: ['./segment-button.component.scss'],
})
export class SegmentButtonComponent implements OnInit {
  @Input() contador;
  fase = 'home';
  alert: Tasks[] = [];
  radio: any;
  constructor(
    private navCtrl: NavController,
    private store: Store<any>,
    private router: Router,
    public localNotifications: LocalNotifications,
    public alertController: AlertController,
    private tasksService: TasksService,
    public TasksFunctions: TasksFunctions,
    private overlayService: OverlayService
  ) {}

  ngOnInit() {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        const url = e.url;
        if (url === '/tasks') {
          this.fase = 'home';
          this.slideChanged(`home`);
        } else if (url === `/tasks/create`) {
          this.slideChanged(`create`);
        } else {
          this.store.pipe(select('selectBox'), take(2)).subscribe((data) => {
            this.fase = data.fase ?? 'home';
            this.slideChanged(this.fase);
          });
        }
      });
  }

  segmentChanged(event) {
    this.store.pipe(select(`tasks`), take(1)).subscribe((res) => {
      this.notificationsAcionar(res.alert);
    });
    const e = typeof event === 'string' ? event : event.target.value;
    switch (e) {
      case 'home':
        this.navCtrl.navigateBack(['/tasks']);
        break;
      case 'create':
        this.navCtrl.navigateRoot(['/tasks/create']);
        this.slideChanged(`create`);
        break;
      default:
        this.store.dispatch(AddSelectionEtiqueta('todos'));
        this.store.dispatch(AddSelectionFase(e));
        this.slideChanged(e);
        this.navCtrl.navigateRoot(['/tasks/list']);
    }
  }

  async slideChanged(fase: string) {
    const el = document.getElementById(`segment-${fase}`);
    await el?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });
  }

  async presentAlert(task: Tasks) {
    if (task.responsavel) {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: `Notifcação ${task.tipo}`,
        subHeader: `${task.responsavel[0] ?? ''} ${task.responsavel[1] ?? ''} ${
          task.responsavel[2] ?? ''
        } ${task.responsavel[3] ?? ''}`,
        message: task.title,
        translucent: true,
        animated: true,
        inputs: [
          {
            name: 'Adiar 30 min',
            type: 'radio',
            label: 'Adiar 30 min',
            value: 1800000,
            handler: () => {
              this.radio = 1800000;
            },
          },
          {
            name: 'Adiar 1 hora',
            type: 'radio',
            label: 'Adiar 1 hora',
            value: 3600000,
            handler: () => {
              this.radio = 3600000;
            },
          },
          {
            name: 'Adiar 1 dia',
            type: 'radio',
            label: 'Adiar 1 dia',
            value: 86400000,
            handler: () => {
              this.radio = 86400000;
            },
          },
        ],
        buttons: [
          {
            text: 'OK',
            handler: () => {
              if (this.radio) {
                this.onHoje(task, this.radio);
              }
            },
          },
        ],
      });
      await alert.present();
      const { role } = await alert.onDidDismiss();
    }
  }

  async notifications(task: Tasks) {
    // this.localNotifications.schedule({
    //   id: task.id,
    //   text: task.title,
    //   data: { secret: task.id },
    //   icon: 'alert-circle-outline',
    //   smallIcon: 'alert-circle-outline',
    //   led: 'FF0000',
    // });
  }
  async simpleNotif(tasks: Tasks[]) {
    if (tasks !== undefined) {
      for (let task of tasks) {
        await this.presentAlert(task);
        await this.notifications(task);
      }
    }
  }

  async onHoje(task: Tasks, time: number) {
    let timer = 0;
    if (time === 30) {
      timer = 1800000;
    } else if (time === 60) {
      timer = 3600000;
    } else if (time === 2) {
      timer = 86400000;
    }
    const date = formatDate(
      new Date().getTime() + timer,
      "yyyy-MM-dd'T'HH:mm",
      'en'
    );
    const taskToUpdate = {
      ...task,
      data: date,
    };
    setTimeout(() => {
      this.store.dispatch(AddTasks([taskToUpdate]));
      this.tasksService.update(taskToUpdate);
    }, 400);
    await this.overlayService.toast({
      message: `Tarefa ${task.title} ${
        taskToUpdate.done ? 'Atualizada' : 'Atualizada'
      }!`,
    });
  }

  private notificationsAcionar(alert: Tasks[]) {
    this.simpleNotif(alert);
  }
}
