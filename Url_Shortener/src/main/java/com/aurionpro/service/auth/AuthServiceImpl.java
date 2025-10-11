package com.aurionpro.controller;

import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.aurionpro.dto.auth.JwtAuthResponse;
import com.aurionpro.dto.auth.UserLoginDto;
import com.aurionpro.dto.auth.UserRegisterDto;
import com.aurionpro.entity.User;
import com.aurionpro.service.auth.AuthService;

@RestController
@RequestMapping("/urlapp/auth")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
    
    @Autowired
    private AuthService authService;
    
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody UserRegisterDto dto) {
        try {
            logger.info("📥 Received registration request for username: {}", dto.getUsername());
            
            User registeredUser = authService.register(dto);
            
            logger.info("✅ User registered successfully: {}", registeredUser.getUsername());
            return ResponseEntity.status(HttpStatus.CREATED).body(registeredUser);
            
        } catch (Exception e) {
            logger.error("❌ Registration failed: {}", e.getMessage(), e);
            return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(new ErrorResponse(e.getMessage()));
        }
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody UserLoginDto loginDto) {
        try {
            logger.info("📥 Received login request for username: {}", loginDto.getUsername());
            
            String token = authService.login(loginDto);
            
            JwtAuthResponse jwtAuthResponse = new JwtAuthResponse();
            jwtAuthResponse.setAccessToken(token);
            
            logger.info("✅ Login successful for user: {}", loginDto.getUsername());
            return ResponseEntity.ok(jwtAuthResponse);
            
        } catch (Exception e) {
            logger.error("❌ Login failed: {}", e.getMessage());
            return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(new ErrorResponse(e.getMessage()));
        }
    }
    
    // Simple error response class
    private static class ErrorResponse {
        private String message;
        
        public ErrorResponse(String message) {
            this.message = message;
        }
        
        public String getMessage() {
            return message;
        }
        
        public void setMessage(String message) {
            this.message = message;
        }
    }
}
