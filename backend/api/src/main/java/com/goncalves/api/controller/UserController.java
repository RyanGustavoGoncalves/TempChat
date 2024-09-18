package com.goncalves.api.controller;

import com.goncalves.api.DTO.*;
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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;


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
     * Endpoint para retornar todos os usuários cadastrados no banco de dados.
     * Este endpoint retorna uma lista de usuários limpando o campo password em um ResponseEntity com status 200 (OK).
     *
     * @return ResponseEntity<List < User>> Um ResponseEntity contendo a lista de usuários cadastrados no banco de dados.
     * @see UserService#getAll(List) Método que limpa o campo password de uma lista de usuários.
     * @see UserRepository#findAll() Método que retorna todos os usuários cadastrados no banco de dados.
     * @see User Classe que representa um usuário no sistema.
     */
    @GetMapping("/get/all")
    @Operation(summary = "Get all users", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Returns a list of all users."),
            @ApiResponse(responseCode = "500", description = "An unexpected error occurred.")
    })
    public ResponseEntity<Page<DataAllUser>> getAll(@PageableDefault(size = Integer.MAX_VALUE, sort = {"creationAccount"}) Pageable paginacao) {
        var user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        // Obtém a página de usuários paginada a partir do repositório e mapeia para DTOs correspondentes
        var page = userRepository.findAllByUsernameIsNot(user.getUsername(),paginacao).map(DataAllUser::new);
        // Retorna a página de usuários paginada dentro de um ResponseEntity
        return ResponseEntity.ok(page);
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
            return ResponseEntity.badRequest()
                    .body(new GenericReturnError("Register", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
        }
    }

    /**
     * Endpoint para autenticar um usuário e retornar um token JWT.
     *
     * @param userLoginData Dados de login do usuário, recebidos no corpo da requisição como JSON.
     * @return ResponseEntity<?> Um ResponseEntity contendo o token JWT em caso de sucesso,
     * ou uma mensagem de erro em caso de falha.
     * <p>
     * O método realiza as seguintes operações:
     * <p>
     * 1. Validação de Dados:
     * - Verifica se a credencial ou senha são nulos.
     * - Se algum desses campos estiver nulo, retorna uma resposta 400 (Bad Request) com a mensagem:
     * "credential and password must be provided."
     * <p>
     * 2. Autenticação do Usuário:
     * - Chama o serviço de login para autenticar o usuário com a credencial e senha fornecidas.
     * - Se a autenticação for bem-sucedida, retorna uma resposta 200 (OK) contendo o token JWT.
     * <p>
     * 3. Tratamento de Erros:
     * - Se ocorrer qualquer exceção inesperada durante a execução do método, retorna uma resposta 500
     * (Internal Server Error) com a mensagem de erro.
     * @throws IllegalArgumentException Se os dados de login não forem válidos.
     * @see DataUserLogin Classe que encapsula os dados de login do usuário.
     * @see TokenDTO Classe que encapsula o token JWT a ser retornado.
     * @see UserService Serviço responsável pela autenticação do usuário.
     */
    @PostMapping(value = "/auth/login", consumes = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Authenticate a user and return a JWT token", method = "POST")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Authentication successful. Returns a JWT token."),
            @ApiResponse(responseCode = "401", description = "Credential and password must be provided."),
            @ApiResponse(responseCode = "500", description = "An unexpected error occurred.")
    })
    public ResponseEntity<?> login(@RequestBody @Valid DataUserLogin userLoginData) {
        try {

            // Verifica se a credencial ou senha são nulos e retorna uma resposta 400 (Bad Request) se necessário
            if (userLoginData.credential() == null || userLoginData.password() == null)
                return ResponseEntity.badRequest()
                        .body(new GenericReturnError("Login", "credential and password must be provided."));

            // Autentica o usuário usando o serviço de login e retorna um token JWT na resposta 200 (OK)
            return ResponseEntity.ok()
                    .body(userService.login(userLoginData.credential(), userLoginData.password()));

        } catch (IllegalArgumentException e) {
            // Captura exceções de validação de dados e retorna uma resposta 400 (Bad Request) com a mensagem de erro
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new GenericReturnError("Login", e.getMessage()));
        } catch (Exception e) {
            // Captura qualquer exceção inesperada e retorna uma resposta 500 (Internal Server Error) com a mensagem de erro
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
        }
    }


}
