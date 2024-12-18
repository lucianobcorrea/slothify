package tcc.com;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class Slothify {

	public static void main(String[] args) {
		SpringApplication.run(Slothify.class, args);
	}

}
