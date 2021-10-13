import { OverlayService } from './../../../core/services/overlay.service';
import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { TasksService } from 'src/app/pages/dashboard/tasks/services/tasks.service';
import { Store } from '@ngrx/store';
import { Tasks } from '../../model/tasks.model';
import { RemoveTasks } from 'src/app/core/ngrx/actions/action-types';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  animations: [
    trigger('slideInOut', [
      state(
        'in',
        style({
          right: '0%',
          backgroundColor: 'rgba(0, 0, 0, 1)',
        })
      ),
      state(
        'out',
        style({
          right: '-400%',
          backgroundColor: 'rgba(0, 0, 0, 0)',
        })
      ),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out')),
    ]),
  ],
})
export class TaskItemComponent implements OnInit {
  @Input() task: any;
  @Input() color: any;
  @Input() isOpen = true;
  @Output() animation = new EventEmitter<any>();
  @Output() done = new EventEmitter<any>();
  @Output() update = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() sinalizada = new EventEmitter<any>();
  @Output() hoje = new EventEmitter<any>();
  tipo;

  constructor(
    private overlayService: OverlayService,
    private tasksService: TasksService,
    private store: Store<any>
  ) {}

  ngOnInit(): void {
    this.tipo = this.task.tipo;
  }

  onToggle() {
    this.isOpen = !this.isOpen;
  }

  async onDelete(task: Tasks): Promise<void> {
    await this.overlayService.alert({
      message: `Tem certeza que deseja excluír a tarefa ${task.title} ?`,
      buttons: [
        {
          text: 'Sim',
          handler: async () => {
            await this.tasksService.delete(task);
            await this.overlayService.toast({
              message: `Tarefa ${task.title} deletada!`,
            });
            this.isOpen = false;
            setTimeout(() => {
              this.store.dispatch(RemoveTasks(task.id));
            }, 400);
          },
        },
        'Não',
      ],
    });
  }
}
