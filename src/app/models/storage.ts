import { User } from './user';

export interface Storage {
  users:User[],
  currentUser:string
}
