package com.goncalves.api.infra.configurations;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.PathMatchConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    private final String prefix = "api/v1";

    /**
     * This method configures the path match.
     * It adds a path prefix to the path match configuration.
     *
     * @param configurer The PathMatchConfigurer object to be configured.
     */
    @Override
    public void configurePathMatch(PathMatchConfigurer configurer) {
        configurer.addPathPrefix(prefix, c -> c.isAnnotationPresent(RestController.class));
    }

    public String getPrefix() {
        return prefix;
    }
}

