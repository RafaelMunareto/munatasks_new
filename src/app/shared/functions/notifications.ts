/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable prefer-const */
import { formatDate } from "@angular/common";
import { Injectable } from "@angular/core";
import { LocalNotifications } from "@ionic-native/local-notifications/ngx";
import { AlertController } from "@ionic/angular";
import { select, Store } from "@ngrx/store";
import { debounceTime, take } from "rxjs/operators";
import { AddTasks } from "src/app/core/ngrx/actions/action-types";
import { OverlayService } from "src/app/core/services/overlay.service";
import { TasksService } from "src/app/pages/dashboard/tasks/services/tasks.service";
import { Tasks } from "../model/tasks.model";

@Injectable({
  providedIn: 'root'
})

export class Notifications {
  alert: Tasks[] = [];
  radio: any;

  constructor(
    public localNotifications: LocalNotifications,
    public alertController: AlertController,
    private tasksService: TasksService,
    private overlayService: OverlayService,
    private store: Store<any>
  ){}

  async presentAlert(task: Tasks) {
    if (task.responsavel) {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: `Tarefa de ${task.tipo} está vencida` ,
        subHeader: `${task.responsavel[0] ?? ''} ${task.responsavel[1] ?? ''} ${
          task.responsavel[2] ?? ''
        } ${task.responsavel[3] ?? ''}`,
        message: task.title,
        translucent: true,
        animated: true,
        inputs: [
          {
            name: 'Adiar 1 dia',
            type: 'radio',
            label: 'Adiar 1 dia',
            value: 86400000,
            handler: () => {
              this.radio = 86400000;
            },
          },
          {
            name: 'Adiar 2 dias',
            type: 'radio',
            label: 'Adiar 2 dias',
            value: 172800000,
            handler: () => {
              this.radio = 172800000  ;
            },
          },
          {
            name: 'Adiar 1 semana',
            type: 'radio',
            label: 'Adiar 1 semana',
            value: 86400000,
            handler: () => {
              this.radio = 604800000;
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
      await alert.onDidDismiss();
    }
  }

  async notifications(task: Tasks) {
    this.localNotifications.schedule({
      id: Date.now(),
      text: task.title,
      group: task.tipo,
      color: '#F4F4F4',
      data: { secret: task.id },
      icon: "https://munatasks.com/assets/icon/favicon.png",
      smallIcon:  "res://notification-logo",
      led: 'FA962A',
      vibrate:true,
      foreground: true
    });
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

    if(!time){
      time = 0;
    }

    const date = formatDate(
      new Date().getTime() + time,
      "yyyy-MM-dd",
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


  public notificationsAcionar() {
    this.store.pipe(select('tasks'), take(1), debounceTime(400)).subscribe((res) => {
      this.simpleNotif((res.alert));
    });
  }

}
