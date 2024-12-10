package com.example.demo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

import com.example.demo.dto.DTO;
import com.example.demo.model.Model;
import com.example.demo.repository.Repository;

@RestController
@RequestMapping("perfumaria")
@CrossOrigin(origins = "*")  // Permitindo qualquer origem para o frontend
public class Controller {

    @Autowired
    private Repository repo;

    // Método GET para listar todos os perfumes
    @GetMapping
    public ResponseEntity<List<Model>> obterPerfumes() {
        List<Model> perfumes = repo.findAll();
        if (perfumes.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        return ResponseEntity.ok(perfumes);
    }

    // Método POST para cadastrar um novo perfume
    @PostMapping("/perfume")
    public ResponseEntity<?> cadastrarPerfume(@RequestBody DTO dto) {
        // Verificando se o perfume já existe
        Model perfumeExistente = new Model(dto);
        if (repo.existsById(perfumeExistente.getId())) {  // Ajuste para verificar se já existe
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Perfume já existe no estoque!");
        }

        // Salvando novo perfume
        repo.save(perfumeExistente);
        return ResponseEntity.status(HttpStatus.CREATED).body(perfumeExistente);
    }

    // Método PUT para atualizar os dados de um perfume
    @PutMapping("/{id}")
    public ResponseEntity<?> atualizarPerfume(@PathVariable Long id, @RequestBody DTO dto) {
        // Verifica se o perfume existe antes de tentar atualizar
        Optional<Model> optionalPerfume = repo.findById(id);
        if (optionalPerfume.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Perfume não encontrado!");
        }

        Model perfume = optionalPerfume.get();
        perfume.updateDTO(dto);  // Atualiza com os dados do DTO
        repo.save(perfume);

        return ResponseEntity.ok(perfume);
    }

    // Método DELETE para remover um perfume
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletarPerfume(@PathVariable Long id) {
        Optional<Model> optionalPerfume = repo.findById(id);
        if (optionalPerfume.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Perfume não encontrado para excluir!");
        }

        repo.deleteById(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Perfume excluído com sucesso!");
    }
}
