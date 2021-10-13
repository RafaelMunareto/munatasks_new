/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/naming-convention */
import { Action } from '@ngrx/store';

export enum ActionTypes {
  //Tasks
  AddTasks = 'addTasks',
  RemoveTasks = 'remTasks',
  ClearTasks = 'clearTasks',
  //Etiquetas
  AddEtiquetas = 'addEtiquetas',
  RemoveEtiquetas = 'remEtiquetas',
  ClearEtiquetas = 'clearEtiquetas',
  //responsavel
  AddResponsavel = 'addResponsavel',
  RemoveResponsavel = 'remResponsavel',
  ClearResponsavel = 'clearResponsavel',
  //selecao
  AddSelectionEtiqueta = 'addSelectionEtiqueta',
  AddSelectionResponsavel = 'addSelectionResponsavel',
  AddSelectionFase = 'addSelectionFase',
}
//tasks
export const AddTasks = (task: any) => {
  return <Action>{ type: ActionTypes.AddTasks, payload: task };
};

export const RemoveTasks = (task: any) => {
  return <Action>{ type: ActionTypes.RemoveTasks, payload: task };
};

export const ClearTasks = () => {
  return <Action>{ type: ActionTypes.ClearTasks, payload: null };
};

//etiquetas
export const AddEtiquetas = (etiqueta: any) => {
  return <Action>{ type: ActionTypes.AddEtiquetas, payload: etiqueta };
};

export const RemoveEtiquetas = (etiqueta: any) => {
  return <Action>{ type: ActionTypes.RemoveEtiquetas, payload: etiqueta };
};

export const ClearEtiquetas = () => {
  return <Action>{ type: ActionTypes.ClearEtiquetas, payload: null };
};

//responsavel

export const AddResponsavel = (responsavel: any) => {
  return <Action>{ type: ActionTypes.AddResponsavel, payload: responsavel };
};

export const RemoveResponsavel = (responsavel: any) => {
  return <Action>{ type: ActionTypes.RemoveResponsavel, payload: responsavel };
};

export const ClearResponsavel = () => {
  return <Action>{ type: ActionTypes.ClearResponsavel, payload: null };
};

//selction

export const AddSelectionEtiqueta = (etiqueta: any) => {
  return <Action>{ type: ActionTypes.AddSelectionEtiqueta, payload: etiqueta };
};

export const AddSelectionResponsavel = (responsavel: any) => {
  return <Action>{
    type: ActionTypes.AddSelectionResponsavel,
    payload: responsavel,
  };
};

export const AddSelectionFase = (fase: any) => {
  return <Action>{
    type: ActionTypes.AddSelectionFase,
    payload: fase,
  };
};
