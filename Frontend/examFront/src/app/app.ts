import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { filter } from 'rxjs';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Navbar],
  standalone:true,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'examFront';

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      window.scrollTo(0, 0);
      
      // Alternative if window scrolling doesn't work
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    });
  }

}


