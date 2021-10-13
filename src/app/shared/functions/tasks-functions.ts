export class TasksFunctions {
  corEtiqueta(tipo: string, etiquetas: any[]): string {
    try {
      const cor = etiquetas.find((element) => element.nome === tipo);
      return cor.cor;
    } catch (e) {
      return;
    }
  }

  cor(faseParam: string, color: string): void {
    switch (faseParam) {
      case 'hoje':
        color = 'primary';
        break;
      case 'abertos':
        color = 'success';
        break;
      case 'sinalizados':
        color = 'warning';
        break;
      case 'todos':
        color = 'medium';
        break;
      case 'finalizados':
        color = 'primary';
        break;
    }
  }
}
