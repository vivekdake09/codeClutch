package com.cloud.play.app;

import jakarta.servlet.MultipartConfigElement;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.util.unit.DataSize;

@SpringBootApplication
public class CloudPlayApplication {

	public static void main(String[] args) {
		SpringApplication.run(CloudPlayApplication.class, args);
	}
	@Bean
	public MultipartConfigElement multipartConfigElement() {
		MultipartConfigFactory factory = new MultipartConfigFactory();
		factory.setMaxFileSize(DataSize.parse("100MB"));
		factory.setMaxRequestSize(DataSize.parse("100MB"));
		return factory.createMultipartConfig();
	}
}
