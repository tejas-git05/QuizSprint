package com.exam.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.exam.entity.exam.Category;

public interface CategoryRepository extends JpaRepository<Category,Long> {

}
