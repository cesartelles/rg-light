import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from './../../models/user'
import { UserService } from './../../services/user.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user:User = { name: "", score:0, hightScore:0 };
 
  public registerForm = new FormGroup({
    name: new FormControl('', [ Validators.required, 
                                Validators.minLength(3), 
                                Validators.maxLength(10)
                              ]),
  });
  

  constructor(private userService:UserService,
              private router: Router) { }

  get name() { return this.registerForm.get('name'); }

  ngOnInit(): void {
  }

  register(){

    if(this.registerForm.valid){
      console.log("VALUE->",this.registerForm.value)
      this.user.name = this.registerForm.value.name;
      this.userService.create(this.user)
      this.router.navigate(['./game']);
    }
  }
}
