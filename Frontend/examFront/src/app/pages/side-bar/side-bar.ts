import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  imports: [RouterLink],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.css'
})
export class SideBar {


  logout() {
    // Implement logout logic
    console.log('Logout clicked');

  }

}
