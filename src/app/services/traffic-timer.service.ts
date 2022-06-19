import { Injectable } from '@angular/core';
import { timer, switchMap, Subject, tap } from 'rxjs'
import { UserService } from './user.service'
@Injectable({
  providedIn: 'root'
})
export class TrafficTimerService {

  curTrafficLight:string = "red"
  traffic$ = new Subject<string>();  
  timer$ = new Subject<number>(); 

  constructor(private userService:UserService) { 

    this.timer$.pipe(
      switchMap( value => { return timer( value ) } ), 
        tap(n => {
          let score = this.userService.getCurrent().score
          let min = -1500, max = 1500
          let randNum = Math.floor(Math.random() * (max - min + 1)) + min
          let greenTime = Math.max(10000 - score * 100, 2000) + randNum

          let time = this.curTrafficLight == 'red' ? 3000 : greenTime;
          this.timer$.next(time);
        })
    ).subscribe((t)=>{
      this.traffic$.next(this.curTrafficLight)
      this.curTrafficLight = this.curTrafficLight == 'red' ? 'green' : 'red'
    })

  }
  
  start(){
    this.curTrafficLight = "red"
    console.log("ANTES DE START")
    this.timer$.next(0)
  }

  stop(){
    this.timer$.unsubscribe()
  }

  getTrafficEvents(){
    return this.traffic$;
  }
}
