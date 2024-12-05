package com.example.demo;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@CrossOrigin(origins = "*" )
@RestController
@RequestMapping("/api")
public class UserController {

	@Autowired
	private UserRepository repository; // Supondo que você tenha um serviço para gerenciar usuários
	
	@GetMapping("/oi")
	public String oi() {
		return "Teste";
	}

	@PostMapping("/cadastrar")
	public ResponseEntity<?> cadastrarUsuario(@RequestBody UserDTO user) {
		try {
			UserModel userdata = new UserModel(user);
			repository.save(userdata);
			return ResponseEntity.ok("Usuário cadastrado com sucesso!");
		} catch (Exception e) {
			return ResponseEntity.status(400).body("Erro ao cadastrar usuário: " + e.getMessage());
		}
	}
}

