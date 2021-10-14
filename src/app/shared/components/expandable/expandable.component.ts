/* eslint-disable @angular-eslint/no-input-rename */
import { Component, AfterViewInit, Input, ViewChild,  ElementRef, Renderer2 } from '@angular/core';
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
          height: '0px',
        })
      ),
      state(
        'out',
        style({
          height: '250px',
        })
      ),
      transition('in => out', animate('600ms ease-in-out')),
      transition('out => in', animate('600ms ease-in-out')),
    ]),
  ],
})
export class ExpandableComponent implements AfterViewInit  {

  @ViewChild('expandWrapper', { read: ElementRef }) expandWrapper: ElementRef;
  @Input('expanded') expanded = false;
  @Input('expandHeight') expandHeight = '150px';
  @Input() isOpen = true;
  constructor(public renderer: Renderer2) {}

  ngAfterViewInit() {
    this.renderer.setStyle(this.expandWrapper.nativeElement, 'max-height', this.expandHeight);
  }



}
