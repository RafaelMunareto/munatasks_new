import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-responsaveis-item',
  templateUrl: './responsaveis-item.component.html',
  styleUrls: ['./responsaveis-item.component.scss'],
})
export class ResponsaveisItemComponent implements OnInit {
  @Input() responsaveis: any;
  @Output() update = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}
}
