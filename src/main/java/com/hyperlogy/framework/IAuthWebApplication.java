package com.hyperlogy.framework;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.ImportResource;

@SpringBootApplication
@ComponentScan("com.hyperlogy")
@ImportResource({"classpath:spring-context.xml", "classpath:spring-dao.xml","classpath:spring-mvc.xml"})
public class IAuthWebApplication extends SpringBootServletInitializer {

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(IAuthWebApplication.class);
    }

    public static void main(String[] args) {
        SpringApplication.run(IAuthWebApplication.class, args);
    }
}