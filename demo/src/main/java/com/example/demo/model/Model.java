package com.example.demo.model;

//import com.example.demo.dto.DTO;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "perfume")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(of = "Id")
public class Model {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String nome ;
	public String marca;
	private Double preco;
	
	
	public Model(Long id, String nome, String marca, Double preco) {
		super();
		this.id = id;
		this.nome = nome;
		this.marca = marca;
		this.preco = preco;
	}
	
	

	
//	private String imagem;
	
}