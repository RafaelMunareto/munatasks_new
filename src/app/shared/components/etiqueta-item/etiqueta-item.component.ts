import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-etiqueta-item',
  templateUrl: './etiqueta-item.component.html',
  styleUrls: ['./etiqueta-item.component.scss'],
})
export class EtiquetaItemComponent {
  @Input() etiqueta: any;
  @Output() update = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() detail = new EventEmitter<any>();
}
