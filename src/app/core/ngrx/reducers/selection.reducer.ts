import { CompletoModel } from 'src/app/core/ngrx/models/completo.model';
/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { ActionTypes } from '../actions/action-types';
import { ActionModel } from '../models/action.model';

export const select = new CompletoModel();

export function selectionReducer(state = select, action: ActionModel) {
  switch (action.type) {
    case ActionTypes.AddSelectionResponsavel: {
      return { ...state, responsavel: action.payload };
    }
    case ActionTypes.AddSelectionFase: {
      return { ...state, fase: action.payload };
    }
    case ActionTypes.AddSelectionEtiqueta: {
      return { ...state, etiqueta: action.payload };
    }

    default:
      return state;
  }
}
