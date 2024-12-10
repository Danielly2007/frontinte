package com.example.demo.dto;

import jakarta.validation.constraints.NotBlank;

public record Resquest(Long id,String marca, String nome, @NotBlank double preco)  {
	
	
	
}
