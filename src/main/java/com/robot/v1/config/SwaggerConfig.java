package com.robot.v1.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfig {

    @Bean
    public Docket api(){
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(new ApiInfo("Robot API", "Processes robot data", "v1", null, "Catangiu Bogdan", null, null))
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.robot.v1.api"))
                .paths(PathSelectors.any())
                .build();
    }
}
