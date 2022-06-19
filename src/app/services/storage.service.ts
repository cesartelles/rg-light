import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Storage } from './../models/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  db:Storage;

  constructor() { 

    let storage = localStorage.getItem(environment.keyStorage)
    this.db = storage ? JSON.parse(storage) : this.getDefaultDB()
  }

  getDefaultDB():Storage{
    return { users:[], currentUser: "" };
  }

  getDB():Storage{
    let storage = localStorage.getItem(environment.keyStorage)
    this.db = storage ? JSON.parse(storage) : this.getDefaultDB()
    return this.db;
  }

  setDB(db:Storage ){
    this.db = db
    localStorage.setItem(environment.keyStorage, JSON.stringify(db))
  }

}
