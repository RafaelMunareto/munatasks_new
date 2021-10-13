import { formatDate } from '@angular/common';
import { Tasks } from '../model/tasks.model';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Injector } from '@angular/core';
import { TasksService } from 'src/app/pages/dashboard/tasks/services/tasks.service';

export class Contador {
  hoje;
  programados;
  sinalizados;
  check;
  todos;
  tasks$: Observable<Tasks[]>;
  contador: any[] = [];

  protected tasksService;
  constructor(protected injector: Injector) {
    this.tasksService = this.injector.get(TasksService);
  }

  async ionViewWillEnter() {
    this.tasks$ = this.tasksService.getAll();
    this.taskTotais();
  }

  taskTotais() {
    const data = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.tasks$.subscribe((res) => (this.todos = res.length.toString()));

    this.tasks$
      .pipe(
        take(1),
        map((arr: any) =>
          arr.filter(
            (r) =>
              formatDate(r.data, 'yyyy-MM-dd', 'en') === data &&
              r.done === false
          )
        )
      )
      .subscribe((res) => (this.hoje = res.length.toString()));

    this.tasks$
      .pipe(
        take(1),
        map((arr: any) =>
          arr.filter(
            (r) =>
              formatDate(r.data, 'yyyy-MM-dd', 'en') > data && r.done === false
          )
        )
      )
      .subscribe((res) => (this.programados = res.length.toString()));

    this.tasks$
      .pipe(
        take(1),
        map((arr) => arr.filter((r) => r.done === true))
      )
      .subscribe((res) => (this.check = res.length.toString()));

    this.tasks$
      .pipe(
        take(1),
        map((arr) =>
          arr.filter((r) => r.sinalizado === true && r.done === true)
        )
      )
      .subscribe((res) => {
        this.sinalizados = res.length.toString();
        this.contador = [
          this.hoje,
          this.programados,
          this.sinalizados,
          this.todos,
          this.check,
        ];
      });
  }
}
