import { enterAnimation } from './../../animations/animations';
import { Component, OnInit } from '@angular/core';
import * as AppConstant from 'src/app/common/constant/app-constant';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  animations: [
    enterAnimation
  ]
})
export class AboutComponent implements OnInit {

  appName: string;

  constructor() {
    this.appName = AppConstant.APP_NAME;
  }
  enterAnimation: any;

  ngOnInit() {

  }

}
