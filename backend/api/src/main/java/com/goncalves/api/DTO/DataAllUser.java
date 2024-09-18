package com.goncalves.api.DTO;

import com.goncalves.api.model.user.User;

import java.util.Date;

public record DataAllUser(Long id,
                          String username,
                          String email,
                          String picture,
                          Date dateCreation) {

    public DataAllUser(User user) {
        this(user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getPicture(),
                user.getDateCreation()
        );
    }
}
