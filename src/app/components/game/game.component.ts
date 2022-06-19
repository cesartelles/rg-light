import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from './../../services/user.service'
import { TrafficTimerService } from './../../services/traffic-timer.service'
import { Router } from '@angular/router';
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {

  user:User = { name: "", score:0, hightScore: 0 }
  trafficLightColor?:string;
  currentStep:string = ""
  subscription: any 

  constructor(private userService:UserService,
              private trafficTimerService:TrafficTimerService,
              private router: Router) { 

    this.user = this.userService.getCurrent()
    console.log("CONSTRUCTOR")
  }

  ngOnInit(): void {

    console.log("Antes on init")
    this.subscription = this.trafficTimerService.getTrafficEvents().subscribe((trafficLightColor)=>{
      //console.log("COLOR->", trafficLightColor)
      this.trafficLightColor = trafficLightColor
    })
    console.log("ON INIT")
    this.start()
  }

  start(){

    console.log("START")
    this.currentStep = ""
    this.trafficTimerService.start()
  }

  stop(){
    this.trafficTimerService.stop();
  }

  stepAction(step:string){

    if(this.trafficLightColor == "green")
    {
      if(this.currentStep == step)
        this.user.score--;
      else{
        this.user.score++;

        if(this.user.score > this.user.hightScore)
          this.user.hightScore = this.user.score
      }
    }
    else
      this.user.score--;

    this.userService.update(this.user)
    this.currentStep = step
  }
  
  exit(){
    this.router.navigate(['./home']);
  }

  ngOnDestroy(){
    //this.trafficTimerService.getTrafficEvents().unsubscribe()
    this.subscription.unsubscribe()
  }
  
}
