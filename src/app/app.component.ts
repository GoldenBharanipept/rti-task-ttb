import { Component, OnInit } from '@angular/core';
import { CommonService } from './common.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  public isShowLoader: boolean = false;
  public currentYear: number = new Date().getFullYear();
  constructor(private commonService: CommonService) {
  }

  ngOnInit() {
    this.commonService.isInitiateLoader.subscribe((data: any) => {
      if (data) {
        this.isShowLoader = data;
      }
    })
  }



}
