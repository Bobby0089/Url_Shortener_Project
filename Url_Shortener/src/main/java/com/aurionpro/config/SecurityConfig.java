//package com.aurionpro.config;
//
//
//import static org.springframework.security.config.Customizer.withDefaults;
//import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.http.HttpMethod;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
//import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//
//import com.aurionpro.security.JwtAuthenticationFilter;
//import com.aurionpro.security.JwtAuthenticationentryPoint;
//
//import lombok.AllArgsConstructor;
//import lombok.RequiredArgsConstructor;
//
//@EnableMethodSecurity
//@Configuration
//@RequiredArgsConstructor
//@AllArgsConstructor
//public class SecurityConfig {
//	
////	private UserDetailsService userDetailsService;
//	@Autowired
//	private JwtAuthenticationFilter jwtAuthenticationFilter;
//	@Autowired
//	private JwtAuthenticationentryPoint authenticationEntryPoint;
//
//	@Bean
//	static PasswordEncoder passwordEncoder() {
//		return new BCryptPasswordEncoder();
//	}
//
//	@Bean
//	AuthenticationManager authenticationManager(AuthenticationConfiguration Configuration)
//			throws Exception {
//		return Configuration.getAuthenticationManager();
//	}
//
//	@Bean
//	SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//		
//		//configuration
//		http.csrf(csrf -> csrf.disable()).cors(withDefaults());
//		http.sessionManagement(session -> session.sessionCreationPolicy(STATELESS));
//
//		http.authorizeHttpRequests(request -> request.requestMatchers("/urlapp/auth/register").permitAll());
//		http.authorizeHttpRequests(request -> request.requestMatchers("/urlapp/auth/login").permitAll());
//		http.authorizeHttpRequests(request -> request.requestMatchers("/urlapp/plan/**").permitAll());
//
//		http.authorizeHttpRequests(request -> request.requestMatchers(HttpMethod.GET, "/urlapp/**").permitAll());
//		http.authorizeHttpRequests(request -> request.requestMatchers(HttpMethod.POST, "/urlapp/plan/create").permitAll());
//		http.authorizeHttpRequests(request -> request.requestMatchers(HttpMethod.PUT, "/urlapp/**").permitAll());
//		http.authorizeHttpRequests(request -> request.requestMatchers(HttpMethod.DELETE, "/urlapp/**"));
//		http.exceptionHandling(exception -> exception.authenticationEntryPoint(authenticationEntryPoint));
//		http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
//		http.authorizeHttpRequests(request -> request.anyRequest().authenticated());
//
//		return http.build();
//	}
//
//}

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

import com.aurionpro.security.JwtAuthenticationFilter;
import com.aurionpro.security.JwtAuthenticationentryPoint;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;

@EnableMethodSecurity
@Configuration
@RequiredArgsConstructor
@AllArgsConstructor
public class SecurityConfig {

	@Autowired
	private JwtAuthenticationFilter jwtAuthenticationFilter;

	@Autowired
	private JwtAuthenticationentryPoint authenticationEntryPoint;

	@Bean
	static PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
		return configuration.getAuthenticationManager();
	}

	@Bean
	SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

	    // configuration
	    http.csrf(csrf -> csrf.disable()).cors(withDefaults());
	    http.sessionManagement(session -> session.sessionCreationPolicy(STATELESS));

	    http.authorizeHttpRequests(request -> request
	        // Public endpoints - no authentication required
	        .requestMatchers("/user/Register").permitAll()
	        .requestMatchers("/auth/**").permitAll()
	        .requestMatchers("/urlapp/transaction/**").permitAll()
	        .requestMatchers("/urlapp/query/**").permitAll()
	        .requestMatchers("/urlapp/buyplan/**").permitAll()
	        .requestMatchers("/urlapp/generateurl/**").permitAll()
	        .requestMatchers(HttpMethod.PUT, "/urlapp/query/adminResponse").permitAll()
	        .requestMatchers(HttpMethod.GET, "/urlapp/plan/view").permitAll()
	        .requestMatchers("/urlapp/auth/**").permitAll()
	        .requestMatchers(HttpMethod.POST, "/urlapp/auth/login").permitAll()
	        .requestMatchers(HttpMethod.POST, "/urlapp/user/register").permitAll()
	        
	        // Admin endpoints - require ADMIN role
	        .requestMatchers(HttpMethod.GET, "/urlapp/admin/**").hasAuthority("ROLE_ADMIN")
	        .requestMatchers(HttpMethod.POST, "/urlapp/admin/**").hasAuthority("ROLE_ADMIN")
	        .requestMatchers(HttpMethod.PUT, "/urlapp/admin/**").hasAuthority("ROLE_ADMIN")
	        .requestMatchers(HttpMethod.DELETE, "/urlapp/admin/**").hasAuthority("ROLE_ADMIN")
//	        .requestMatchers(HttpMethod.GET, "/urlapp/plan/**").hasAuthority("ROLE_ADMIN")
	        .requestMatchers(HttpMethod.POST, "/urlapp/plan/**").hasAuthority("ROLE_ADMIN")
	        .requestMatchers(HttpMethod.PUT, "/urlapp/plan/**").hasAuthority("ROLE_ADMIN")
	        .requestMatchers(HttpMethod.DELETE, "/urlapp/plan/**").hasAuthority("ROLE_ADMIN")
	        
	        // User endpoints - require USER or ADMIN role
	        .requestMatchers(HttpMethod.GET, "/urlapp/user/**").hasAnyAuthority("ROLE_CUSTOMER", "ROLE_ADMIN")
	        .requestMatchers(HttpMethod.POST, "/urlapp/user/**").hasAnyAuthority("ROLE_CUSTOMER", "ROLE_ADMIN")
	        .requestMatchers(HttpMethod.PUT, "/urlapp/user/**").hasAnyAuthority("ROLE_CUSTOMER", "ROLE_ADMIN")
	        .requestMatchers(HttpMethod.DELETE, "/urlapp/user/**").hasAnyAuthority("ROLE_CUSTOMER", "ROLE_ADMIN")
	        
	        // All other requests require authentication
	        .anyRequest().authenticated()
	    );

	    http.exceptionHandling(exception -> exception.authenticationEntryPoint(authenticationEntryPoint));
	    http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

	    return http.build();
	}
}
