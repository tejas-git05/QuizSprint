import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/LoginService/login.service';
import {User} from '../../models/user.model'
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-profile',
  imports: [CommonModule,],
  templateUrl:'./profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit {

   user: User | null = null;
  isLoading = true;
  error: string | null = null;

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    try {
      const userData = this.loginService.getUser();
      this.user = userData;
      
      if (!this.user) {
        this.error = 'No user data found. Please login again.';
      }
    } catch (err) {
      this.error = 'Failed to load user data.';
      console.error('Error loading user:', err);
    } finally {
      this.isLoading = false;
    }
  }

  get safeUser(): User {
    return this.user || {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      profile: 'assets/default-profile.png',
      role: 'USER',
      userId: 0,
      userName: '',
      isEnabled:true
    };
  }

  getRoleBadgeClass(role: string): string {
    const baseClass = 'inline-flex items-center px-3 py-1 rounded-full';
    switch(role?.toLowerCase()) {
      case 'admin': return `${baseClass} bg-purple-500/30 text-purple-100`;
      case 'user': return `${baseClass} bg-blue-500/30 text-blue-100`;
      default: return `${baseClass} bg-gray-500/30 text-gray-100`;
    }
  }

  editProfile(): void {
    console.log('Edit profile clicked');
  }
}
