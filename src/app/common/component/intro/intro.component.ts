import * as AppConstant from 'src/app/common/constant/app-constant';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-intro',
  // templateUrl: './intro.component.html',
  // styleUrls: ['./intro.component.css']
  templateUrl: './intro.component2.html',
  styleUrls: ['./intro.component2.css']
})
export class IntroComponent implements OnInit {

  appName: string;

  constructor() {
    this.appName = AppConstant.APP_NAME;
  }

  ngOnInit() {
  }

}
