import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../../../services/CategoryService/category-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-side-bar',
  imports: [CommonModule,RouterLink],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.css'
})
export class SideBarUser implements OnInit {

  categories:any;

  screenWidth: number = window.innerWidth;
  showSidebar: boolean = this.screenWidth >= 640; // show by default on desktop

  constructor(private catSer:CategoryService) {}

  logout(){

  }

  ngOnInit(): void {

  this.catSer.getCategories().subscribe(
  (data:any) => {
    this.categories = data;
  }, (error:any) => {
    Swal.fire('Error','Error in loading categories from server', 'error');
  }
  )

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
