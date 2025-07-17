package com.exam.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.exam.entity.exam.Category;
import com.exam.entity.exam.Quiz;

public interface QuizRepository extends JpaRepository<Quiz, Long>{
	
	public List<Quiz> findBycategory(Category category);

	
}
