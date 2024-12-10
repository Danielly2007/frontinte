package com.example.demo.repository;

//import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.Model;

public interface Repository extends JpaRepository<Model, Long> {
	Optional<Model>findAllById(long id);
}
