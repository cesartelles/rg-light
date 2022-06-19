import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from './../../services/user.service'
import { TrafficTimerService } from './../../services/traffic-timer.service'
import { Router } from '@angular/router';

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
                
  }

  ngOnInit(): void {

    this.user = this.userService.getCurrent()

    this.subscription = this.trafficTimerService.getTrafficEvents().subscribe((trafficLightColor)=>{
      this.trafficLightColor = trafficLightColor
    })

    this.start()
  }

  start(){

    this.currentStep = ""
    this.trafficTimerService.start()

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
    this.subscription.unsubscribe()
  }
  
}
