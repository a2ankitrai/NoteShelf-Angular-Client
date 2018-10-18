import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NsCommonService } from 'src/app/common/service/ns-common.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  username: string;
  responseMessage: any;

  constructor(private route: ActivatedRoute, private commonService: NsCommonService) { }

  ngOnInit() {

    this.username = '<b>Ankit</b>';
    this.responseMessage = this.commonService.loginResponse;

    // this.responseMessage = this.route.queryParamMap.pipe(map(params => {

    //   console.log(params.get('response'));
    //   return params.get('response') || 'Empty response';
    // }));

    // this.route.paramMap.pipe(
    //   switchMap((params: ParamMap) => {
    //     this.responseMessage = params.get('response');
    //   });
    //  );

    // this.route.params.subscribe(
    //   params => {
    //     console.log(params);
    //     this.responseMessage = params;
    //   },
    //   err => {
    //     this.responseMessage = 'Error';
    //   }
    // );

    // this.route.paramMap.pipe(
    //   switchMap(params => {
    //     this.responseMessage = params.get('response');
    //     console.log(this.responseMessage);
    //     // find other alternative..
    //     return Observable.create(0);
    //   })
    // );
  }

}
