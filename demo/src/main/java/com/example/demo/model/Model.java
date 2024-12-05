package com.example.demo.model;

import com.example.demo.dto.DTO;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "ana")

public class Model {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String Nome;
	public String Marca;
	public double Preco;
	private int Estoque;
	private String imagem;
	
	public Model() {
		
	}
	
	public Model(Long id, String nome, String marca, double preco, int estoque, String imagem) {

		Nome = nome;
		Marca = marca;
		Preco = preco;
		Estoque = estoque;
		this.imagem = imagem;
	}
	public Model(DTO d) {

		this.Nome = d.Nome();
		this.Marca = d.Marca();
		this.Preco = d.Preco();
		this.Estoque = d.Estoque();
		this.imagem = d.imagem();
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getNome() {
		return Nome;
	}
	public void setNome(String nome) {
		Nome = nome;
	}
	public String getMarca() {
		return Marca;
	}
	public void setMarca(String marca) {
		Marca = marca;
	}
	public double getPreco() {
		return Preco;
	}
	public void setPreco(double preco) {
		Preco = preco;
	}
	public int getEstoque() {
		return Estoque;
	}
	public void setEstoque(int estoque) {
		Estoque = estoque;
	}
	public String getImagem() {
		return imagem;
	}
	public void setImagem(String imagem) {
		this.imagem = imagem;
	}
	public void updateDTO(DTO dto) {
		// TODO Auto-generated method stub
		
	}

}
