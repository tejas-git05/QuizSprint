import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Navbar],
  standalone:true,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'examFront';
}


