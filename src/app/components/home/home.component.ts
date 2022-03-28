import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable, Subscription } from 'rxjs';
import { BreakpointService, Media } from 'src/app/services/breakpoint.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  generalSubscriptions = new Subscription();

  media: Observable<Media>;

  @ViewChild('Sidenav') sidenav?: MatSidenav;

  constructor(
    private breakpointService: BreakpointService
  ) {
    this.media = this.breakpointService.currentMediaQuery;
   }

  ngOnInit(): void {
    this.generalSubscriptions.add(this.breakpointService.currentMediaQuery.subscribe(media => {
      if (media == Media.small){
        this.sidenav?.close();
      }else{
        this.sidenav?.open();
      }
    })
    )};

  ngOnDestroy(): void {
    this.generalSubscriptions.unsubscribe();
  }

}
