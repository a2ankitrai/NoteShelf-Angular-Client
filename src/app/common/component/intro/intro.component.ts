import * as AppConstant from 'src/app/common/constant/app-constant';
import { Component, OnInit } from '@angular/core';
import { zoomInAnimation } from '../../animations/animations';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component2.html',
  styleUrls: ['./intro.component2.css'],
  animations: [
    zoomInAnimation
  ]
})
export class IntroComponent implements OnInit {

  appName: string;

  constructor() {
    this.appName = AppConstant.APP_NAME;
  }

  ngOnInit() {
  }

}
