import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/LoginService/login.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { User } from '../../models/user.model'; // Import the interface

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit, OnDestroy {
  isLoggedIn = false;
  user: User | null = null; // Properly type the user
  private loginSubscription!: Subscription;
  showDropdown = false; // Add this for dropdown state

  constructor(public loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.loginService.initializeLoginStatus();
    this.updateLoginState();
    
    this.loginSubscription = this.loginService.loginStatus$.subscribe(() => {
      this.updateLoginState();
    });
  }

  ngOnDestroy(): void {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }

  private updateLoginState(): void {
    this.isLoggedIn = this.loginService.isLoggedIn();
    this.user = this.loginService.getUser();
  }

  //for logo and title redirect role based
  getHomeLink(){
    
    let role = this.loginService.getUserRole();
    
    if(role=="NORMAL"){
      return '/user/0'
    } else if (role=="ADMIN") {
      return '/admin/'
    }
    
    return ''
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  closeDropdown(): void {
    this.showDropdown = false;
  }

  // Close dropdown when clicking outside
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.user-dropdown')) {
      this.closeDropdown();
    }
  }

}