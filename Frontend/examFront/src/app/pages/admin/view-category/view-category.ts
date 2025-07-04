import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/CategoryService/category-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-view-category',
  imports: [CommonModule,RouterLink],
  templateUrl:'./view-category.html',
  styleUrl: './view-category.css'
})
export class ViewCategory implements OnInit {

  constructor(private categoryService:CategoryService) {}

  categories:any[] = [];



  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data:any) => {
      this.categories = data;
      console.log(this.categories);
      
    } ),
    (error:any) => {
       console.log(error);
    }
  }

}
