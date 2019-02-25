import { Component, OnInit } from '@angular/core';
import * as AppConstant from 'src/app/common/constant/app-constant';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  appName: string;

  constructor() {
    this.appName = AppConstant.APP_NAME;
  }

  ngOnInit() {
  }

}
