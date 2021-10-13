import { ContadorModel } from './contador.model';
import { EtiquetasModel } from './etiquetas.model';
import { ResponsaveisModel } from './responsaveis.model';
import { TasksModel } from './tasks.model';

export class CompletoModel {
  public tasks: TasksModel[] = [];
  public etiquetas: EtiquetasModel[] = [];
  public responsaveis: ResponsaveisModel[] = [];
  public contador: ContadorModel[] = [];
  public etiqueta = 'todos';
  public responsavel = 'todos';
  public fase = 'todos';
}
