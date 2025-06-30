import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SideBar } from '../side-bar/side-bar';


@Component({
  selector: 'app-admin-dashboard',
  imports: [ SideBar,RouterOutlet],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboard {

}
