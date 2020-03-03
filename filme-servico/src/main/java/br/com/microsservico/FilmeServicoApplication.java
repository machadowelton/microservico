package br.com.microsservico;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

@SpringBootApplication
@EnableMongoAuditing
public class FilmeServicoApplication {

	public static void main(String[] args) {
		SpringApplication.run(FilmeServicoApplication.class, args);
	}

}
