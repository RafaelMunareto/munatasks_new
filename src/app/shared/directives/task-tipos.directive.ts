import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appTaskTipos]',
})
export class TaskTiposDirective {
  @Input('appTaskTipos') dados: any;

  constructor(private el: ElementRef, private control: NgControl) {}

  @HostListener('ngModelChange', ['$event'])
  onNgModelChange(event) {
    const cor = this.dados.find((element) => element.nome === event);
    if (cor) {
      this.badge(cor.cor);
    }
  }

  badge(dados: string): any {
    switch (dados) {
      case 'danger':
        return (this.el.nativeElement.style.color = '#eb445a');
        break;
      case 'primary':
        return (this.el.nativeElement.style.color = '#3880ff');
        break;
      case 'warning':
        return (this.el.nativeElement.style.color = '#ffc409');
        break;
      case 'secondary':
        return (this.el.nativeElement.style.color = '#3dc2ff');
        break;
      case 'success':
        return (this.el.nativeElement.style.color = '#2dd36f');
        break;
      case 'dark':
        return (this.el.nativeElement.style.color = '#222428');
        break;
      case 'medium':
        return (this.el.nativeElement.style.color = '#92949c');
        break;
      default:
        return (this.el.nativeElement.style.color = '#808080');
        break;
    }
  }
}
