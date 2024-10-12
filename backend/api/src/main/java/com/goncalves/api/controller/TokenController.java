package com.goncalves.api.controller;

import com.goncalves.api.DTO.GenericReturnError;
import com.goncalves.api.model.user.User;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Tag(name = "/token")
@RestController
@RequestMapping("/token")
public class TokenController {

    @GetMapping
    @Operation(summary = "Check if the token is valid", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Token is valid."),
            @ApiResponse(responseCode = "400", description = "Token is invalid or expired.")
    })
    public ResponseEntity<GenericReturnError> token() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if(user != null) {
            return ResponseEntity.ok(new GenericReturnError("Token", "Valid Token"));
        } else {
            return ResponseEntity.badRequest()
                    .body(new GenericReturnError("Token", "Invalid Token or Expired Token"));
        }
    }
}
