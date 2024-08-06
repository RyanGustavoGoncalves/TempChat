CREATE TABLE IF NOT EXISTS users (
    id BIGINT NOT NULL AUTO_INCREMENT,
    username VARCHAR(120) NOT NULL,
    picture LONGTEXT NULL,
    password LONGTEXT NOT NULL,
    email VARCHAR(250) NOT NULL,
    date_creation DATE NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `username_UNIQUE` (`username`),
    UNIQUE INDEX `email_UNIQUE` (`email`)
    ) ENGINE = InnoDB;
