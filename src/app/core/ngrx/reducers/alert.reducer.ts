/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { ActionTypes } from '../actions/action-types';
import { ActionModel } from '../models/action.model';

export const alert = [];

export function alertReducer(state = alert, action: ActionModel) {
  switch (action.type) {
    case ActionTypes.AddAlert: {
      return {
        ...state,
        alert: [...state, ...action.payload],
      };
    }

    case ActionTypes.RemoveAlert: {
      state.filter((res: any) => res.id !== action.payload);
      return {
        ...state,
        alert,
      };
    }

    case ActionTypes.ClearAlert: {
      state = [];
      return state;
    }

    default:
      return state;
  }
}
