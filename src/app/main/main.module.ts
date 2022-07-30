import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatBadgeModule} from "@angular/material/badge";
import {MainComponent} from "./main.component";
import {SharedModule} from "../shared/shared.module";

const routes: Routes = [
  {path: '', component: MainComponent}
]

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FontAwesomeModule,
    MatToolbarModule,
    MatBadgeModule,
    SharedModule,
  ]
})
export class MainModule { }
