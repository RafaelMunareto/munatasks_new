import { Etiqueta } from './../../../shared/model/etiquetas.model';
import { ActionTypes } from '../actions/action-types';
import { ActionModel } from '../models/action.model';
import { CompletoModel } from '../models/completo.model';

export const etiqueta = new CompletoModel();

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function etiquetasReducer(state = etiqueta, action: ActionModel) {
  switch (action.type) {
    case ActionTypes.AddEtiquetas: {
      const idsPayload = action.payload.map((e) => e.id).filter((v) => v);
      return {
        etiquetas: [
          ...state.etiquetas.filter(
            (e) => !idsPayload.length || !idsPayload.includes(e.id)
          ),
          ...action.payload,
        ].sort((a, b) => a.nome.localeCompare(b.nome)),
      };
    }

    case ActionTypes.RemoveEtiquetas: {
      const etiquetas = state.etiquetas.filter(
        (res: any) => res.id !== action.payload
      );
      return {
        ...state,
        etiquetas,
      };
    }

    case ActionTypes.ClearEtiquetas: {
      state = new CompletoModel();
      return state;
    }

    default:
      return state;
  }
}
