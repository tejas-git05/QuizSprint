package com.exam.controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Set;

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

import com.exam.entity.exam.Questions;
import com.exam.entity.exam.Quiz;
import com.exam.service.QuestionService;
import com.exam.service.QuizService;

@RestController
@RequestMapping("questions")
@CrossOrigin("*")
public class QuestionCategory {

	@Autowired
	private QuestionService questionService;
	
	@Autowired
	private QuizService quizService;
	
	// Create questions
	@PostMapping("/")
	public ResponseEntity<Questions> createQuestions(@RequestBody Questions questions)
	{
		Questions que = this.questionService.addQuestions(questions);
		return ResponseEntity.ok(que);
	}
	
	// Get All questions of any quizId
	@GetMapping("/quiz/{questionId}")
	public ResponseEntity<?> getQuestionsOfQuiz(@PathVariable ("questionId")Long questionId)
	{
		Quiz quiz = this.quizService.getQuizById(questionId);
		Set<Questions> questions =  quiz.getQuestions();
		ArrayList<Questions> list = new ArrayList<>(questions);
		
		if(list.size() > quiz.getNumberOfQuestions())
		{
			list.subList(0, quiz.getNumberOfQuestions() + 1 );
		}
		Collections.shuffle(list);
		return ResponseEntity.ok(list);
	}
	
	// Get quiz by Id
	@GetMapping("/{questionId}")
	public Questions getQuestionById(@PathVariable("questionId") Long questionId)
	{
		return this.questionService.getQuestionById(questionId);
	}
	
	//Update Questions
	@PutMapping("/")
	public ResponseEntity<Questions> updateQuestion(@RequestBody Questions questions)
	{
		return ResponseEntity.ok(this.questionService.updateQuestions(questions)) ;
	}
	
	// delete questions
	@DeleteMapping("/{questionId}")
	public void deleteQuestion(@PathVariable("questionId")Long questionId)
	{
		this.questionService.deleteQuestions(questionId);
	}
		
}
