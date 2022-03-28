import { Injectable } from '@angular/core';
import {BreakpointObserver, Breakpoints, MediaMatcher } from '@angular/cdk/layout';
import { BehaviorSubject, Observable } from 'rxjs';

 export enum Media{
    mid = 'md',
    small = 'sm',
    none = ''
  }
@Injectable({
  providedIn: 'root'
})

export class BreakpointService {
  
  breakpointObserver: any;

  private $currentMediaQuery: BehaviorSubject<Media> = new BehaviorSubject<Media>(Media.none);

  constructor(
    breakpointObserver: BreakpointObserver,
    mediaMatcher: MediaMatcher
    ) { 
      
      const customMediaQuery = mediaMatcher.matchMedia('(min-width: 248px)');

      breakpointObserver.observe([
        Breakpoints.XSmall,
        Breakpoints.Medium,
      ]).subscribe((result:any) => {
        const isXSmall = breakpointObserver.isMatched(Breakpoints.XSmall);
        const isMediumScreen = breakpointObserver.isMatched('(min-width: 600px) and (max-width: 959px)');
        
       /* console.log(isXSmall);
        console.log('000000');
        console.log(isMediumScreen) */
        
        this.$currentMediaQuery.next(isXSmall ? Media.small : Media.mid);
  })};

  get currentMediaQuery(): Observable<Media> {
    return this.$currentMediaQuery.asObservable();
  }
}