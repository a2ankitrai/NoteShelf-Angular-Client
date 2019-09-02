import { Component, OnInit } from '@angular/core';
import * as AppConstant from 'src/app/common/constant/app-constant';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  today: number = Date.now();
  appName: string;
  constructor() {
    this.appName = AppConstant.APP_NAME;
  }

  ngOnInit() {
  }

}
