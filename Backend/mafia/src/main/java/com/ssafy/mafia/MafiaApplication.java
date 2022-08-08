package com.ssafy.mafia;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
@EnableJpaAuditing
@EnableScheduling
public class MafiaApplication {

	public static void main(String[] args) {
		SpringApplication.run(MafiaApplication.class, args);
	}

	// 암호화에 필요한 PasswordEncoder 를 Bean 등록합니다.
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public RestTemplate restTemplate() {
		return new RestTemplate();
	}
}
