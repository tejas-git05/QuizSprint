import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../../services/LoginService/login.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-side-bar',
  imports: [CommonModule,RouterLink],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.css'
})
export class SideBar implements OnInit {

  screenWidth: number = window.innerWidth;
  showSidebar: boolean = this.screenWidth >= 640; // show by default on desktop


  constructor(private loginService:LoginService, private router:Router){

  }
  
  logout() {
   this.loginService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    window.addEventListener('resize', () => {
      this.screenWidth = window.innerWidth;
      // Automatically show sidebar if screen is wide
      if (this.screenWidth >= 640) {
        this.showSidebar = true;
      }
    });
  }
  
  handleSidebarLinkClick(): void {
  if (this.screenWidth < 640) {
    this.showSidebar = false;
  }
  }

  toggleSidebar(): void {
    this.showSidebar = !this.showSidebar;
  }

}
