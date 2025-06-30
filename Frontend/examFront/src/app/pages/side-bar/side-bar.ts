import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/LoginService/login.service';

@Component({
  selector: 'app-side-bar',
  imports: [RouterLink],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.css'
})
export class SideBar {

  constructor(private loginService:LoginService, private router:Router){

  }
  
  logout() {
   this.loginService.logout();
    this.router.navigate(['/login']);
  }

}
