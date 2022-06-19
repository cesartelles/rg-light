import { Injectable } from '@angular/core';
import { StorageService } from './../services/storage.service'
import { Storage } from './../models/storage'
import { User } from './../models/user'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private storageService:StorageService) { }

  create(user:User){
    let db:Storage = this.storageService.getDB()
    console.log("DB 1", db)

    if(!db.users.find(el => el.name == user.name))
      db.users.push(user)

    db.currentUser = user.name

    this.storageService.setDB(db)
    console.log("check data base->", this.storageService.getDB())
  }

  getCurrent():User{
    let db:Storage = this.storageService.getDB()
    return this.getByName(db.currentUser)!
  }

  getByName(userName:string):User{
    let db:Storage = this.storageService.getDB()
    return db.users.find(el => el.name == userName)!
  }

  update(userFinded:User){
    let db:Storage = this.storageService.getDB()
    let user:User = db.users.find(el => el.name == userFinded.name)!
    user.score = userFinded.score
    user.hightScore = userFinded.hightScore

    this.storageService.setDB(db)
  }
}
