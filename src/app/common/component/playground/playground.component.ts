import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../service/local-storage.service';
import * as AppConstant from 'src/app/common/constant/app-constant';
import { enterAnimation } from '../../animations/animations';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css'],
  animations: [
    enterAnimation
  ]
})
export class PlaygroundComponent implements OnInit {

  message: string;

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.message = 'Rx in Action';
  }

  clearStorage() {
    localStorage.clear();
    sessionStorage.clear();
    this.localStorageService.removeItem(AppConstant.SESSION_TOKEN);
    this.localStorageService.clear();
  }

}
