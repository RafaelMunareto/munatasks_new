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

  async slideChanged(fase: string) {
    const el = document.getElementById(`${fase}`);
    await el?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });
  }

  scrollTo(idGrupo: string): void {
    const idEl = document.getElementById(`${idGrupo}`);
      const y = idEl.getBoundingClientRect().top + window.scrollY;
      idEl.scroll({
        top: y,
        left: 100,
        behavior: 'smooth'
      });
  }
}
