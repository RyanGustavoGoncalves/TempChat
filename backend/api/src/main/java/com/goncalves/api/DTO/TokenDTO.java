package com.goncalves.api.DTO;

public record TokenDTO(String token, Long id, String username, String email, String picture) {
}
