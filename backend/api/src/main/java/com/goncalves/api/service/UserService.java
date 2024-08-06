package com.goncalves.api.service;

import com.goncalves.api.DTO.DataUser;
import com.goncalves.api.model.user.User;
import com.goncalves.api.model.user.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class UserService {

    private final TokenService tokenService;
    private final AuthenticationManager authenticationManager;

    public UserService(TokenService tokenService, AuthenticationManager authenticationManager) {
        this.tokenService = tokenService;
        this.authenticationManager = authenticationManager;
    }

    public User register(DataUser user, MultipartFile file) {
        try {
            // Validação de senha
            if (user.password() == null || user.password().length() < 8) {
                throw new IllegalArgumentException("Password must have at least 8 characters");
            }

            // Verificar se o arquivo está vazio ou nulo
            if (file == null || file.isEmpty()) {
                throw new IllegalArgumentException("File must not be empty");
            }

            // Codificar a senha
            String encryptedPassword = new BCryptPasswordEncoder().encode(user.password());

            // Obter o nome original do arquivo
            String filename = file.getOriginalFilename();
            if (filename == null || filename.isEmpty()) {
                throw new IllegalArgumentException("File name must not be empty");
            }

            // Criação do novo usuário
            return new User(
                    user.username(),
                    encryptedPassword,
                    user.email(),
                    filename,
                    user.dateCreation()
            );

        } catch (IllegalArgumentException e) {
            // Tratar exceções de argumento ilegal
            throw e;  // Repassar a exceção para ser tratada no controlador
        } catch (Exception e) {
            // Tratar outras exceções
            throw new RuntimeException("An unexpected error occurred during user registration", e);
        }
    }

}
