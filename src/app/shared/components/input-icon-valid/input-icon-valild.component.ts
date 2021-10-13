import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-icon-valild',
  template: `
    <form [formGroup]="form">
      <ion-item>
        <ion-icon [name]="icone" [color]="color" [slot]="slot"></ion-icon>
        <ion-input
          [type]="type"
          [placeholder]="placeholder"
          [inputmode]="inputmode"
          [formControlName]="name"
          [autofocus]="autofocus"
        >
        </ion-input>
        <app-validator-note
          [form-control]="$any(form.get(name))"
        ></app-validator-note>
      </ion-item>
    </form>
  `,
})
export class InputIconValildComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() icone;
  @Input() inputmode = 'text';
  @Input() name;
  @Input() placeholder;
  @Input() type = 'text';
  @Input() autofocus = false;
  @Input() color = 'primary';
  @Input() slot = 'start';

  ngOnInit(): void {
    switch (this.name) {
      case 'email':
        this.icone = 'mail';
        this.type = 'email';
        this.inputmode = 'text';
        this.placeholder = 'E-mail';
        break;
      case 'password':
        this.icone = 'lock-closed-outline';
        this.inputmode = 'password';
        this.type = 'password';
        this.placeholder = 'Senha';
        break;
      case 'confirmPassword':
        this.icone = 'lock-closed';
        this.inputmode = 'password';
        this.type = 'password';
        this.placeholder = 'Confirma Senha';
        break;
      case 'name':
        this.icone = 'person';
        this.inputmode = 'text';
        this.placeholder = 'Nome';
        break;
      default:
        this.icone = 'document-text-outline';
        this.inputmode = 'text';
        this.placeholder = this.name;
    }
  }
}
