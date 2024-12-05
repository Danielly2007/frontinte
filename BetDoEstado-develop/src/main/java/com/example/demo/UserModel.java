package com.example.demo;

import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class UserModel {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID id_user;
    private String nome;
    private String preco;
    private String marca;
 
    
	public UserModel(UserDTO user) {
		super();
		this.id_user = user.id();
		this.nome = user.nome();
		this.preco = user.preco();
		this.marca = user.marca();
	
	}

    
}
