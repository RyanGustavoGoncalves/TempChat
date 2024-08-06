package com.goncalves.api.controller;

import com.goncalves.api.DTO.DataUser;
import com.goncalves.api.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/auth/register")
    public ResponseEntity register(@RequestPart(value = "userData") @Valid DataUser data,
                                   @RequestPart(value = "file") MultipartFile file,
                                   UriComponentsBuilder uriComponentsBuilder) {
        try {
            userService.register(data, file);
        }
    }
}
