import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-versao',
  templateUrl: './versao.component.html',
  styleUrls: ['./versao.component.scss'],
})
export class VersaoComponent implements OnInit {

  @Input() versao;
  versaoAtual = environment.versao;

  constructor() { }

  ngOnInit() {

  }

}
