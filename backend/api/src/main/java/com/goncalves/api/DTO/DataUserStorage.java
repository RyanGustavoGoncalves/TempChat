package com.goncalves.api.DTO;

import java.awt.image.BufferedImage;
import java.util.Date;

public record DataUserStorage(Long id,
                              String username,
                              String email,
                              String picture,
                              Date dateCreation) {
}
