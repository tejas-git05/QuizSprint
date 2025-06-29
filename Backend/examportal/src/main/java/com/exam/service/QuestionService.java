package com.exam.service;

import java.util.Set;

import com.exam.entity.exam.Questions;
import com.exam.entity.exam.Quiz;

public interface QuestionService  {
	
	public Questions addQuestions(Questions questions);
	public Questions updateQuestions(Questions questions);
	public Set<Questions> getQuestions();
	public Questions getQuestionById(Long queId);
	public Set<Questions> getQuestionsOfQuiz(Quiz quiz);
	public void deleteQuestions(Long queId);

}
