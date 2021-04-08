import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: '[dev-together-button-retro]',
  templateUrl: './button-retro.component.html',
  styleUrls: ['./button-retro.component.scss']
})
export class ButtonRetroComponent {
  @Input() text: string = '';
  @Input() insideColor: string = '#2acdc1'
  
  @HostBinding("style.--hoverColor")
  @Input()
  hoverColor: string;

  constructor() { }
}
