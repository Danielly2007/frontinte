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
        // Verifique se o perfume já existe no estoque, por exemplo, pelo nome (ou outro campo único)
        Optional<Model> perfumeExistente = repo.findById(dto.id()); // Supondo que 'nome' seja único
        if (perfumeExistente.isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Perfume já existe no estoque!");
        }

        // Criação do objeto Model a partir do DTO
        Model novoPerfume = new Model(dto);
        
        // Se o ID é gerado automaticamente, não é necessário verificá-lo.
        repo.save(novoPerfume);
        
        return ResponseEntity.status(HttpStatus.CREATED).body(novoPerfume);
    }

    // Método PUT para atualizar os dados de um perfume
    @PutMapping("/{id}")
    public ResponseEntity<?> atualizarProduto(Long id, DTO dto) {
    	Optional<Model>  optionalModel = repo.findById(id);
    	if (optionalModel.isPresent()) {
    	Model prefume = optionalModel.get();
//    	prefume.setMarca(dto.Marca());
//    	prefume.setPreco(dto.Preco());
//    	prefume.setNome(prefume.getNome());
    	
    	
//    	if (dto.Preco() == null) {
//            
//            dto.setPreco(0.0); 
//        }
    	
    	
    	
    	return  ResponseEntity.ok(prefume);
    	}else {
			return ResponseEntity.notFound().build();
		}
    
    
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
