package com.exam.service;

import java.util.Set;

import com.exam.entity.exam.Quiz;

public interface QuizService {
	
	public Quiz addQuiz(Quiz quiz);
	public Quiz updateQuiz(Quiz quiz);
	public Set<Quiz> getQuizzes();
	public Quiz getQuizById(Long quizId);
	public void deleteQuiz(Long quizId);

}
