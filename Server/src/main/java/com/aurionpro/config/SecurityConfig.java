package com.aurionpro.config;

import static org.springframework.security.config.Customizer.withDefaults;
import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.aurionpro.security.JwtAuthenticationFilter;
import com.aurionpro.security.JwtAuthenticationentryPoint;

import java.util.List;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Autowired
    private JwtAuthenticationentryPoint authenticationEntryPoint;

    // ✅ Password Encoder Bean
    @Bean
    public static PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // ✅ Authentication Manager Bean
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    // ✅ Global CORS Configuration
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of(
                "http://localhost:4200",                         // Angular Dev
                "https://urlshortener-bobby.netlify.app"         // ✅ Your deployed Angular app
        ));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setExposedHeaders(List.of("Authorization"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    // ✅ Security Filter Chain
  @Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

    http.csrf(csrf -> csrf.disable())
        .cors(withDefaults())
        .sessionManagement(session -> session.sessionCreationPolicy(STATELESS))
        .authorizeHttpRequests(request -> request

            // ✅ PUBLIC ENDPOINTS - Most specific first!
            .requestMatchers("/urlapp/auth/**").permitAll()  // Covers /register and /login
            .requestMatchers(HttpMethod.GET, "/urlapp/plan/view").permitAll()
            .requestMatchers(HttpMethod.PUT, "/urlapp/query/adminResponse").permitAll()
            .requestMatchers("/urlapp/query/**").permitAll()
            .requestMatchers("/urlapp/transaction/**").permitAll()
            .requestMatchers("/urlapp/buyplan/**").permitAll()
            .requestMatchers("/urlapp/generateurl/**").permitAll()

            // ✅ ADMIN ENDPOINTS
            .requestMatchers("/urlapp/admin/**").hasAuthority("ROLE_ADMIN")
            .requestMatchers("/urlapp/plan/**").hasAuthority("ROLE_ADMIN")

            // ✅ CUSTOMER/USER ENDPOINTS - Put AFTER specific public paths
            .requestMatchers("/urlapp/user/**").hasAnyAuthority("ROLE_CUSTOMER", "ROLE_ADMIN")

            // ✅ ALL OTHER ENDPOINTS
            .anyRequest().authenticated()
        )
        .exceptionHandling(exception -> exception.authenticationEntryPoint(authenticationEntryPoint))
        .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

    return http.build();
}
}
