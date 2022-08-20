import {AfterViewInit, Component, OnInit} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {NavigationStart, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'laqua';


  constructor(
    private ngx: NgxSpinnerService,
    private router: Router
  ) {
  }

  ngAfterViewInit(): void {
    // this.router.events.subscribe((e: any) => {
    //   if (e instanceof NavigationStart) {
    //   this.ngx.show();
    //   }
    // })
    // setTimeout(() => {
    //   this.ngx.hide();
    // }, 3000)
  }
}
