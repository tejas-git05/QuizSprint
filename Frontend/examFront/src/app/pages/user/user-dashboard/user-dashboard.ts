import { Component } from '@angular/core';
import { SideBarUser } from '../side-bar/side-bar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  imports: [SideBarUser,RouterOutlet],
  templateUrl: './user-dashboard.html',
  styleUrl: './user-dashboard.css'
})
export class UserDashboard {

}
