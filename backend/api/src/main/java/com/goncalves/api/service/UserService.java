package com.goncalves.api.service;

import com.goncalves.api.DTO.DataUser;
import com.goncalves.api.DTO.DataUserStorage;
import com.goncalves.api.DTO.GenericError;
import com.goncalves.api.DTO.TokenDTO;
import com.goncalves.api.model.user.User;
import com.goncalves.api.model.user.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.security.auth.login.AccountLockedException;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.regex.Pattern;

@Service
public class UserService {

    private static final String IMAGE_FOLDER = "data_user_image/";
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;

    public UserService(UserRepository userRepository, AuthenticationManager authenticationManager, TokenService tokenService) {
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
    }

    public User register(DataUser user, MultipartFile file) {
        try {
            // Validação de senha
            GenericError error = validUser(user);
            if (error.code() != 200) {
                throw new IllegalArgumentException(error.message());
            }

            GenericError state = UserChecker(user.username(), user.email());
            if (state.code() != 200) {
                throw new IllegalArgumentException(state.message());
            }

            GenericError passwordSate = CheckingSpecialCharacters(user.password());
            if (passwordSate.code() != 200) {
                throw new IllegalArgumentException(passwordSate.message());
            }

            // Verificar se o arquivo não está vazio ou nulo
            String filePath = null;
            if (file != null && !file.isEmpty()) {

                // Criar a pasta se não existir
                File directory = new File(IMAGE_FOLDER);
                if (!directory.exists()) {
                    if (!directory.mkdirs()) {
                        throw new RuntimeException("Failed to create directory");
                    }
                }

                // Obter o nome original do arquivo
                String originalFilename = file.getOriginalFilename();
                if (originalFilename == null || originalFilename.isEmpty()) {
                    throw new IllegalArgumentException("File name must not be empty");
                }

                // Definir o caminho completo para salvar o arquivo
                filePath = IMAGE_FOLDER + System.currentTimeMillis() + "_" + originalFilename;
                File destinationFile = new File(filePath);

                // Salvar o arquivo
                file.transferTo(destinationFile.getAbsoluteFile());

            }

            // Codificar a senha
            String encryptedPassword = new BCryptPasswordEncoder().encode(user.password());

            // Criação do novo usuário com o caminho do arquivo
            return new User(
                    user.username(),
                    encryptedPassword,
                    user.email(),
                    filePath,
                    new Date()
            );

        } catch (IOException e) {
            // Logar o erro detalhado
            e.printStackTrace();
            throw new RuntimeException("Failed to save file", e);
        } catch (IllegalArgumentException e) {
            // Tratar exceções de argumento ilegal
            throw e;
        } catch (Exception e) {
            // Tratar outras exceções
            throw new RuntimeException("An unexpected error occurred during user registration", e);
        }
    }

    public static GenericError validUser(DataUser user) {

        if (user.username() == null || user.username().length() < 3) {
            return new GenericError(400, "Username must have at least 3 characters");
        }
        if (!user.email().contains("@")) {
            return new GenericError(400, "Email must have at least 5 characters");
        }
        return new GenericError(200, "User is valid");
    }

    public GenericError UserChecker(String username, String email) {
        UserDetails user = userRepository.findByUsername(username);
        if (user != null) {
            return new GenericError(409, "Username already exists");
        }
        User user2 = userRepository.findByEmail(email);
        if (user2 != null) {
            return new GenericError(409, "Email already exists");
        }
        return new GenericError(200, "User is valid");
    }

    public static GenericError CheckingSpecialCharacters(String password) {
        List<String> errors = new ArrayList<>();
        String templateMessage = "The password must contain at least";

        // Verifica o comprimento mínimo
        if (password.length() < 8) {
            errors.add("8 characters.");
        }

        // Verifica se contém letra maiúscula
        if (!password.matches(".*[A-Z].*")) {
            errors.add("a capital letter.");
        }

        // Verifica se contém letra minúscula
        if (!password.matches(".*[a-z].*")) {
            errors.add("a lowercase letter.");
        }

        // Verifica se contém número
        if (!password.matches(".*[0-9].*")) {
            errors.add("a number.");
        }

        // Verifica se contém caractere especial
        if (!password.matches(".*[!@#$%^&+=].*")) {
            errors.add("a special character (!@#$%^&+=).");
        }

        // Verifica se contém espaços em branco
        if (password.matches(".*\\s.*")) {
            errors.add("The password should not contain blank spaces.");
        }

        // Retorna os erros específicos ou valida a senha
        if (errors.isEmpty()) {
            return new GenericError(200, "Senha válida.");
        } else {
            // Retorna somente os erros referentes aos critérios não atendidos
            String errorMessage = String.join(" ", errors);
            return new GenericError(400, templateMessage + " " + errorMessage);
        }
    }


    /**
     * Autentica um usuário com base em suas credenciais (email ou nome de usuário) e senha,
     * e gera um token JWT se a autenticação for bem-sucedida.
     *
     * @param credential O email ou nome de usuário fornecido pelo usuário.
     * @param password   A senha fornecida pelo usuário.
     * @return Um token JWT se a autenticação for bem-sucedida.
     */
    public TokenDTO login(String credential, String password) {
        try {
            // Tenta localizar o usuário pelo email fornecido
            var user = userRepository.findByEmail(credential);
            UserDetails userDetails;

            // Se o usuário for encontrado pelo email, usa o nome de usuário associado
            if (user != null) {
                userDetails = userRepository.findByUsername(user.getUsername());
            } else {
                // Caso contrário, tenta localizar o usuário pelo nome de usuário diretamente
                userDetails = userRepository.findByUsername(credential);
            }

            // Se o usuário não for encontrado, lança uma exceção
            if (userDetails == null) {
                throw new IllegalArgumentException("User not found with credential: " + credential);
            }

            // Cria um token de autenticação baseado no nome de usuário e senha fornecidos
            var authenticationToken = new UsernamePasswordAuthenticationToken(userDetails, password);

            // Autentica o token usando o authenticationManager
            var authentication = authenticationManager.authenticate(authenticationToken);

            // Gera um token JWT para o usuário autenticado
            return new TokenDTO(
                    tokenService.generateToken((User) authentication.getPrincipal()),
                    new DataUserStorage(
                            ((User) authentication.getPrincipal()).getId(),
                            userDetails.getUsername(),
                            ((User) authentication.getPrincipal()).getEmail(),
                            ((User) authentication.getPrincipal()).getPicture(),
                            ((User) authentication.getPrincipal()).getDateCreation()
                    )
            );

        } catch (IllegalArgumentException e) {
            throw e;
        } catch (AuthenticationException e) {
            throw new IllegalArgumentException("Credential or password is invalid");
        } catch (Exception e) {
            // Tratar outras exceções
            throw new RuntimeException("An unexpected error occurred during user login", e);
        }
    }

    public List<User> getAll(List<User> users) {
        List<User> userFormatted = new ArrayList<>();

        for (User user : users) {
            user.setPassword("");
            userFormatted.add(user);
        }

        return userFormatted;
    }
}