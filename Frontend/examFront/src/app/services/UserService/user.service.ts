import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../baseUrl';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  // add user
  public adduser(user:any){
    return this.http.post(`${baseUrl}/user/create-user`,user);
  }

}



