package dev.gethealthy.app.configs;

import com.fasterxml.jackson.databind.ObjectMapper;
import dev.gethealthy.app.services.JwtUserDetailsService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.AuthorizeHttpRequestsConfigurer;
import org.springframework.security.config.core.GrantedAuthorityDefaults;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import lombok.RequiredArgsConstructor;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.IOException;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfiguration {

    private final CorsConfigurationBean configurationBean;

    private final AuthorizationFilter authorizationFilter;
    private final JwtUserDetailsService jwtUserDetailsService;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity.cors(cors -> cors.configurationSource(configurationBean.corsConfigurationSource()))
                //.authorizeHttpRequests(requests -> requests.anyRequest().permitAll())
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(c -> c.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(this::createRules)
                .userDetailsService(jwtUserDetailsService)
                .addFilterBefore(authorizationFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


    private void createRules(AuthorizeHttpRequestsConfigurer<HttpSecurity>.AuthorizationManagerRequestMatcherRegistry interceptor) {
        AuthorizationRules authorizationRules;
        try {
            authorizationRules = new ObjectMapper().readValue(new ClassPathResource("rules.json").getInputStream(), AuthorizationRules.class);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        interceptor.requestMatchers(HttpMethod.POST, "/login").permitAll();
        interceptor.requestMatchers(HttpMethod.POST, "/register").permitAll();
        interceptor.requestMatchers(HttpMethod.GET, "/swagger-ui/**").permitAll();
        interceptor.requestMatchers(HttpMethod.POST, "/swagger-ui/**").permitAll();
        interceptor.requestMatchers(HttpMethod.PUT, "/swagger-ui/**").permitAll();
        interceptor.requestMatchers(HttpMethod.DELETE, "/swagger-ui/**").permitAll();
        for (Rule rule : authorizationRules.getRules()) {
            if (rule.getMethods().isEmpty())
                interceptor.requestMatchers(rule.getPattern()).hasAnyAuthority(rule.getRoles().toArray(String[]::new));
            else for (String method : rule.getMethods()) {
                interceptor.requestMatchers(HttpMethod.valueOf(method), rule.getPattern()).hasAnyAuthority(rule.getRoles().toArray(String[]::new));
            }
        }
        interceptor.anyRequest().denyAll();
    }

    @Bean
    GrantedAuthorityDefaults grantedAuthorityDefaults() {
        return new GrantedAuthorityDefaults(""); // Remove the ROLE_ prefix
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}
