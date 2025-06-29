package com.exam.service.impl;

import java.util.LinkedHashSet;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exam.Repository.QuestionRepository;
import com.exam.entity.exam.Questions;
import com.exam.entity.exam.Quiz;
import com.exam.service.QuestionService;


@Service
public class QuestionServiceImpl implements QuestionService  {

	@Autowired
	private QuestionRepository questionRepo;
	
	@Override
	public Questions addQuestions(Questions questions) {
		return this.questionRepo.save(questions);
	}

	@Override
	public Questions updateQuestions(Questions questions) {
		return this.questionRepo.save(questions);
	}

	@Override
	public Set<Questions> getQuestions() {
		return new LinkedHashSet<>(this.questionRepo.findAll());
	}

	@Override
	public Questions getQuestionById(Long queId) {
		return this.questionRepo.getById(queId);
	}

	@Override
	public Set<Questions> getQuestionsOfQuiz(Quiz quiz) {
		return this.questionRepo.findByQuiz(quiz);
	}

	@Override
	public void deleteQuestions(Long queId) {
		this.questionRepo.deleteById(queId);
	}

}
