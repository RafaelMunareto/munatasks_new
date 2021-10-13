/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { ActionTypes } from '../actions/action-types';
import { ActionModel } from '../models/action.model';
import { CompletoModel } from '../models/completo.model';

export const responsavel = new CompletoModel();

export function responsaveisReducer(state = responsavel, action: ActionModel) {
  switch (action.type) {
    case ActionTypes.AddResponsavel: {
      return {
        ...state,
        responsaveis: [...state.responsaveis, ...action.payload],
      };
    }

    case ActionTypes.RemoveResponsavel: {
      const responsaveis = state.responsaveis.filter(
        (res: any) => res.id !== action.payload
      );
      return {
        ...state,
        responsaveis
      };
    }

    case ActionTypes.ClearResponsavel: {
      state = new CompletoModel();
      return state;
    }

    default:
      return state;
  }
}
