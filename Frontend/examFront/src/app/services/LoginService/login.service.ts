import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../baseUrl';
import { BehaviorSubject, Observable, retry, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginStatusSubject = new BehaviorSubject<boolean>(false);
  public loginStatus$ = this.loginStatusSubject.asObservable();

  constructor(private http: HttpClient){ }

  // get current user
  public getCurrentUser(){
    return this.http.get(`${baseUrl}/current-user`);
  }

  // Login user with username and password
  public login(loginData:any): Observable<any> {
    return this.http.post(`${baseUrl}/user/login`, loginData);
  }

  // Store user data in local storage 
  public setUser(user:any):void {
    localStorage.setItem('user',JSON.stringify(user));
    this.loginStatusSubject.next(true); // Notify subscribers
  }

  // Get current user
  public getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  //check if user is logged in
  public isLoggedIn():boolean {
    return !!this.getUser();
  }

  // Get user role
  public getUserRole():string {
    const user = this.getUser();
    console.log('Full user object',user);
  
    return user?.role || '';
  }
  
  // Add this to handle redirect after login
  public redirectUrl: string | null = null;

  // Logout user
  public logout():void {
    localStorage.removeItem('user');
    this.loginStatusSubject.next(false); // Notify subscribers
  }
  
 // Initialize login status
  public initializeLoginStatus(): void {
    this.loginStatusSubject.next(this.isLoggedIn());
  } 

}
