import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appEtiquetasColors]',
})
export class EtiquetaColorsDirective implements OnInit {
  constructor(private el: ElementRef, private control: NgControl) {}

  @HostListener('ngModelChange', ['$event'])
  onNgModelChange(event) {
    this.badge(event);
  }

  ngOnInit(): void {}

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
