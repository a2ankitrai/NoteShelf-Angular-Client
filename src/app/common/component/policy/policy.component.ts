import { enterAnimation } from './../../animations/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css'],
  animations: [
    enterAnimation
  ],
})
export class PolicyComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
