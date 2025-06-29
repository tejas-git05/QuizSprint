package com.exam.service;

import java.util.Set;

import com.exam.entity.exam.Category;

public interface CategoryService {
	
	public Category addCategory(Category category);
	public Category updateCategory(Category category);
	public Set<Category> getCategory();
	public Category getCategoryById(Long categoryId);
	public void deleteCategoryById(Long categoryId);
}

