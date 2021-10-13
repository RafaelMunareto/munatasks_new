export class TasksModel {
  public id: string;
  public title: string;
  public tipo: string;
  public done: boolean;
  public data: any;
  public responsavel: string;
  public sinalizado: boolean;
}
export class TasksModelArray {
  public tasks: TasksModel[] = [];
}
