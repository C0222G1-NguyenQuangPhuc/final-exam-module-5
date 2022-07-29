package com.codegym.spring_final_exam.repository;

import com.codegym.spring_final_exam.model.Bus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface IBusRepository extends JpaRepository<Bus, Integer> {
}
