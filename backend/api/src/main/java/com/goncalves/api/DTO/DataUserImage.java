package com.goncalves.api.DTO;

import java.awt.image.BufferedImage;
import java.util.Date;

public record DataUserImage(Long id,
                            String username,
                            String email,
                            BufferedImage picture,
                            Date dateCreation) {
}
