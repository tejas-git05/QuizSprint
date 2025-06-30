package com.exam.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.exam.entity.exam.Category;
import com.exam.service.CategoryService;

@RestController
@RequestMapping("/category")
@CrossOrigin("*")
public class CategoryController {
	
	@Autowired
	private CategoryService categoryService;
	
	//create category
	@PostMapping("/")
	public ResponseEntity<Category> addCategory(@RequestBody Category category)
	{
		Category category1 = this.categoryService.addCategory(category);
		return ResponseEntity.ok(category1);
	}
	
	// Get Category by ID
	@GetMapping("/{categoryId}")
	public Category getCategoryById(@PathVariable("categoryId") Long categoryId)
	{
		return this.categoryService.getCategoryById(categoryId);
	}
	
	// Get Category
	@GetMapping("/")
	public ResponseEntity<?> getCategory() {
		return ResponseEntity.ok(this.categoryService.getCategory());
	}
	
	// Update category
	@PutMapping("/")
	public Category updateCategory(@RequestBody Category category)
	{
		return this.categoryService.updateCategory(category);
	}
	
	// delete category
	@DeleteMapping("/{cateId}")
	public void deleteCategory(@PathVariable("cateId") Long cateId )
	{
		this.categoryService.deleteCategoryById(cateId);
	}

}
