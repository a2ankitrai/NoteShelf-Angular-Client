import { enterAnimation } from './../../animations/animations';
import { Component, OnInit } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { bounceIn, fadeOutRight } from 'ng-animate';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  animations: [
    enterAnimation
  ]
})
export class AboutComponent implements OnInit {

  constructor() { }
  enterAnimation: any;

  ngOnInit() {
  }

}
