package com.goncalves.api.service;

import com.goncalves.api.DTO.DataUser;
import com.goncalves.api.DTO.GenericError;
import com.goncalves.api.model.user.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Date;

@Service
public class UserService {

    private static final String IMAGE_FOLDER = "data_user_image/";

    public User register(DataUser user, MultipartFile file) {
        try {
            // Validação de senha
            GenericError error = validUser(user);
            if (error.code() != 200) {
                throw new IllegalArgumentException(error.message());
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
        if (user.password() == null || user.password().length() < 8) {
            return new GenericError(400, "Password must have at least 8 characters");
        }
        if (user.username() == null || user.username().length() < 3) {
            return new GenericError(400, "Username must have at least 3 characters");
        }
        if (!user.email().contains("@")) {
            return new GenericError(400, "Email must have at least 5 characters");
        }
        return new GenericError(200, "User is valid");
    }
}