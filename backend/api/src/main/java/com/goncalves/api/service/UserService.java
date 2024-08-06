package com.goncalves.api.service;

import com.goncalves.api.DTO.DataUser;
import com.goncalves.api.model.user.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@Service
public class UserService {

    private static final String IMAGE_FOLDER = "data_user_image/";

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

            // Criar a pasta se não existir
            File directory = new File(IMAGE_FOLDER);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            // Obter o nome original do arquivo
            String originalFilename = file.getOriginalFilename();
            if (originalFilename == null || originalFilename.isEmpty()) {
                throw new IllegalArgumentException("File name must not be empty");
            }

            // Definir o caminho completo para salvar o arquivo
            String filePath = IMAGE_FOLDER + System.currentTimeMillis() + "_" + originalFilename;
            File destinationFile = new File(filePath);
            file.transferTo(destinationFile);

            // Codificar a senha
            String encryptedPassword = new BCryptPasswordEncoder().encode(user.password());

            // Criação do novo usuário com o caminho do arquivo
            User newUser = new User(
                    user.username(),
                    encryptedPassword,
                    user.email(),
                    filePath,
                    null
            );

            // Salvar o usuário no banco de dados (presume que existe um método saveUser)
            saveUser(newUser);

            return newUser;

        } catch (IOException e) {
            // Tratar erro de entrada/saída
            throw new RuntimeException("Failed to save file", e);
        } catch (IllegalArgumentException e) {
            // Tratar exceções de argumento ilegal
            throw e;
        } catch (Exception e) {
            // Tratar outras exceções
            throw new RuntimeException("An unexpected error occurred during user registration", e);
        }
    }

    private void saveUser(User user) {
        // Implementação para salvar o usuário no banco de dados
    }
}
