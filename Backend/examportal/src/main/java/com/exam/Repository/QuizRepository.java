package com.exam.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.exam.entity.exam.Quiz;

public interface QuizRepository extends JpaRepository<Quiz, Long>{

}
