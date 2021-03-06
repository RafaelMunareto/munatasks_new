/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { formatDate } from '@angular/common';
import { Tasks } from 'src/app/shared/model/tasks.model';
import { ActionTypes } from '../actions/action-types';
import { ActionModel } from '../models/action.model';
import { CompletoModel } from '../models/completo.model';

export const task = new CompletoModel();

export function taskReducer(state = task, action: ActionModel) {
  switch (action.type) {
    case ActionTypes.AddTasks: {
      const ids = action.payload.map((p) => p.id).filter((v) => v);
      const tasks = [
        ...state.tasks.filter((t: any) => !ids.length || !ids.includes(t.id)),
        ...action.payload,
      ].sort((a, b) => a.data - b.data);
      const contador = [contadorAction(tasks)];
      return {
        ...state,
        contador,
        tasks,
        alert,
      };
    }

    case ActionTypes.RemoveTasks: {
      const tasks = state.tasks.filter((res: any) => res.id !== action.payload);
      const contador = [contadorAction(tasks)];
      return {
        ...state,
        tasks,
        contador,
        alert,
      };
    }

    case ActionTypes.ClearTasks: {
      state = new CompletoModel();
      return state;
    }

    default:
      return state;
  }

  function contadorAction(tasks: Tasks[]) {
    const data = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    const todos = tasks.length.toString();
    const hoje = tasks
      .filter((r) => formatDate(r.data, 'yyyy-MM-dd', 'en') === data && !r.done)
      .length.toString();

    const vencidos = tasks
      .filter(
        (r) =>
          convertData(formatDate(r.data, 'yyyy-MM-dd', 'en')) <
            convertData(data) && !r.done
      )
      .length.toString();

    const abertos = tasks.filter((r) => r.done === false).length.toString();

    const finalizados = tasks.filter((r) => r.done === true).length.toString();

    const sinalizados = tasks
      .filter((r) => r.sinalizado && !r.done)
      .length.toString();

    const resultado = {
      hoje: hoje,
      abertos: abertos,
      sinalizados: sinalizados,
      todos: todos,
      finalizados: finalizados,
      vencidos: vencidos,
    };
    return resultado;
  }

  function convertData(data) {
    const value = new Date(data);

    return value;
  }
}
