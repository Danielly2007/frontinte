package com.example.demo.dto;

import jakarta.validation.constraints.NotNull;

public record DTO (String Nome, String Marca, @NotNull Double Preco,long id) {

//	public Object getNome() {
//		// TODO Auto-generated method stub
//		return null;
//	}
//
//	public void setPreco(double d) {
//		// TODO Auto-generated method stub
//		
//		
//		
//	}
}