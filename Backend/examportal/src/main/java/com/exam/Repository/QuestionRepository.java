package com.exam.Repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.exam.entity.exam.Questions;
import com.exam.entity.exam.Quiz;

public interface QuestionRepository extends JpaRepository<Questions,Long> {
	
	Set<Questions> findByQuiz(Quiz quiz);
	
}
