package com.goncalves.api.controller;

import com.goncalves.api.DTO.DataUser;
import com.goncalves.api.model.user.User;
import com.goncalves.api.model.user.UserRepository;
import com.goncalves.api.service.UserService;
import jakarta.validation.Valid;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;

    public UserController(UserService userService, UserRepository userRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
    }

    @PostMapping("/auth/register")
    public ResponseEntity<?> register(@RequestPart(value = "userData") @Valid DataUser data,
                                      @RequestPart(value = "file") MultipartFile file,
                                      UriComponentsBuilder uriComponentsBuilder) {
        try {
            User newUser = userService.register(data, file);
            userRepository.save(newUser);
            var uri = uriComponentsBuilder.path("/users/{id_User}").buildAndExpand(newUser.getId()).toUri();
            return ResponseEntity.created(uri).body(newUser);
        } catch (IllegalArgumentException e) {
            // Erros de validação de dados
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (DataIntegrityViolationException e) {
            // Violação de integridade de dados (por exemplo, duplicação de e-mail ou nome de usuário)
            return ResponseEntity.status(HttpStatus.CONFLICT).body("User data conflict: " + e.getMessage());
        } catch (Exception e) {
            // Outras exceções não previstas
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred: " + e.getMessage());
        }
    }

}
