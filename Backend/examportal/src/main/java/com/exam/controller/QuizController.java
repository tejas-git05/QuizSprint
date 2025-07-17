package com.exam.controller;

import java.util.List;

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
import com.exam.entity.exam.Quiz;
import com.exam.service.QuizService;

@RestController
@RequestMapping("/quiz")
@CrossOrigin("*")
public class QuizController {

	@Autowired
	private QuizService quizService;
	
	// Create Quiz
	@PostMapping("/")
	public ResponseEntity<Quiz> createQuiz(@RequestBody Quiz quiz)
	{
		Quiz quiz1 = this.quizService.addQuiz(quiz);
		return ResponseEntity.ok(quiz1);
	}
	
	//Get Quiz By Id
	@GetMapping("/{quizId}")
	public Quiz getQuizById(@PathVariable("quizId") Long quizId)
	{
		return this.quizService.getQuizById(quizId);
	}
	
	// Get All Quiz
	@GetMapping("/")	
	public ResponseEntity<?> getQuiz() {
		return ResponseEntity.ok(this.quizService.getQuizzes());
	}
	
	// Update Quiz
	@PutMapping("/")
	public Quiz updateQuiz(@RequestBody Quiz quiz) 
	{
		return this.quizService.updateQuiz(quiz);
	}
	
	// Delete Quiz
	@DeleteMapping("/{quizId}")
	public void deleteQuiz(@PathVariable("quizId") Long quizId )
	{
		this.quizService.deleteQuiz(quizId);
	}
	
	//get quizzes category
	@GetMapping("/category/{cid}")
	public List<Quiz> getQuizzesOfCategory(@PathVariable("cid")Long cid ){
		
		Category category = new Category();
		category.setCid(cid);
		return this.quizService.getQuizzesOfCategory(category);
	}
	
}
