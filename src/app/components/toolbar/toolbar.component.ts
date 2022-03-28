import { Component, OnInit, OnDestroy, Output, EventEmitter} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Observable, Subscription } from 'rxjs';
import { BreakpointService, Media } from 'src/app/services/breakpoint.service'; 

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

    @Output() buttonMenu: EventEmitter<void> = new EventEmitter<void>();

  generalSubscriptions = new Subscription();

  media!: Media;

  constructor(private breakpointService : BreakpointService) { }

  ngOnInit(): void {
    this.generalSubscriptions.add(this.breakpointService.currentMediaQuery.subscribe(media => {
      this.media = media;

  }))};

  ngOnDestroy(): void {
    this.generalSubscriptions.unsubscribe();
  }


  closeSidenav(){
    this.buttonMenu.emit();
  }
}