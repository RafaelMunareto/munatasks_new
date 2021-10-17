/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @angular-eslint/no-input-rename */
import { Component, AfterViewInit, Input, ViewChild,  ElementRef, Renderer2, Output, EventEmitter } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-expandable',
  templateUrl: './expandable.component.html',
  styleUrls: ['./expandable.component.scss'],
  animations: [
    trigger('slideInOut', [
      state(
        'in',
        style({
          height: '0%',
          opacity: 0
        })
      ),
      state(
        'out',
        style({
          height: '100%',
          opacity: 1
        })
      ),
      transition('out => in', animate('600ms ease-in-out')),
      transition('in => out', animate('600ms ease-in-out')),

    ]),
  ],
})
export class ExpandableComponent implements AfterViewInit  {

  @ViewChild('expandWrapper', { read: ElementRef }) expandWrapper: ElementRef;
  @Input('expanded') expanded = false;
  @Input('expandHeight') expandHeight = '100%';
  currentState = 'in';
  responsaveis = false;
  constructor(public renderer: Renderer2) {}
  ngAfterViewInit() {
    this.renderer.setStyle(this.expandWrapper.nativeElement, 'height', this.expandHeight);
    this.renderer.setStyle(this.expandWrapper.nativeElement, 'height', '100%');
  }

  toggleAccordion(event: any) {
    if(event.detail.checked){
      this.currentState = 'out';
      this.expanded = event.detail.checked;
    }else{
      this.currentState = 'in';
      this.expanded = !event.detail.checked;
    }
  }


}
