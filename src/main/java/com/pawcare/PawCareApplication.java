package com.pawcare;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class PawCareApplication {
    public static void main(String[] args) {
        SpringApplication.run(PawCareApplication.class, args);
    }
} 