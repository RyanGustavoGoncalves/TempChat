package com.goncalves.api.controller;

import com.goncalves.api.DTO.DataUser;
import com.goncalves.api.DTO.TokenDTO;
import com.goncalves.api.model.user.User;
import com.goncalves.api.model.user.UserRepository;
import com.goncalves.api.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Map;

@Slf4j
@Tag(name = "/user")
@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;

    public UserController(UserService userService, UserRepository userRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
    }

    /**
     * Endpoint para registrar um novo usuário com criptografia de senha.
     * Este endpoint aceita dados do usuário e um arquivo opcional (por exemplo, uma foto de perfil).
     *
     * @param data                 Os dados do usuário encapsulados em um objeto DataUser.
     * @param file                 Um arquivo opcional (MultipartFile) que pode ser enviado com os dados do usuário.
     * @param uriComponentsBuilder Um UriComponentsBuilder para construir a URI do novo recurso criado.
     * @return ResponseEntity contendo o novo usuário criado ou uma mensagem de erro.
     */
    @PostMapping(value = "/auth/register", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Register a new user with password encryption", method = "POST")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "User saved successfully."),
            @ApiResponse(responseCode = "400", description = "Password field must have at least 9 characters."),
            @ApiResponse(responseCode = "409", description = "User data conflict."),
            @ApiResponse(responseCode = "500", description = "An unexpected error occurred.")
    })
    public ResponseEntity<?> register(@RequestPart(value = "userData") @Valid DataUser data,
                                      @RequestPart(value = "file", required = false) MultipartFile file,
                                      UriComponentsBuilder uriComponentsBuilder) {
        try {
            User newUser = userService.register(data, file);
            userRepository.save(newUser);
            var uri = uriComponentsBuilder.path("/users/{id_User}").buildAndExpand(newUser.getId()).toUri();
            return ResponseEntity.created(uri).body(newUser);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("User data conflict: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
        }
    }

    @PostMapping(value = "/auth/login", consumes = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Authenticate a user and return a JWT token", method = "POST")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Authentication successful. Returns a JWT token."),
            @ApiResponse(responseCode = "400", description = "Credential and password must be provided."),
            @ApiResponse(responseCode = "500", description = "An unexpected error occurred.")
    })
    public ResponseEntity<?> login(@RequestBody @Valid Map<String, String> userLoginData) {
        try {
            // Obtém o nome de usuário ou email do mapa de dados de login
            String crendential = userLoginData.get("username");

            // Obtém a senha do mapa de dados de login
            String password = userLoginData.get("password");

            // Verifica se a credencial ou senha são nulos e retorna uma resposta 400 (Bad Request) se necessário
            if (crendential == null || password == null)
                return ResponseEntity.badRequest()
                        .body("credential and password must be provided.");

            // Autentica o usuário usando o serviço de login e retorna um token JWT na resposta 200 (OK)
            return ResponseEntity.ok().body(new TokenDTO(userService.login(crendential, password)));
        } catch (Exception e) {
            // Captura qualquer exceção inesperada e retorna uma resposta 500 (Internal Server Error) com a mensagem de erro
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
        }
    }


}
