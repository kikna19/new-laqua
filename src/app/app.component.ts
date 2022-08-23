import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NavigationEnd, NavigationStart, Router } from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'laqua';
  loaded: boolean = false;

  constructor(
    private ngx: NgxSpinnerService,
    private router: Router
  ) {
  }

  ngAfterViewInit(): void {
    this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationStart) {
        this.ngx.show();
        this.loaded = false;
      }
      if (e instanceof NavigationEnd) {
        setTimeout(() => {
          this.ngx.hide();
          this.loaded = true;
        }, 2000)
      }
    })
  }
}
