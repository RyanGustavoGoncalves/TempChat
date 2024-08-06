package com.goncalves.api.DTO;

import java.util.Date;

public record DataUser(
        String username,
        String email,
        String password,
        Date dateCreation
) {
}
