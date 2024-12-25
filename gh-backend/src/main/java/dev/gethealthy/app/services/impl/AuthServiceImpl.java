package dev.gethealthy.app.services.impl;

import dev.gethealthy.app.exceptions.UnauthorizedException;
import dev.gethealthy.app.models.entities.User;
import dev.gethealthy.app.models.entities.UserAccount;
import dev.gethealthy.app.models.enums.Role;
import dev.gethealthy.app.models.requests.LoginRequest;
import dev.gethealthy.app.models.requests.RegistrationRequest;
import dev.gethealthy.app.models.responses.LoginResponse;
import dev.gethealthy.app.repositories.UserAccountRepository;
import dev.gethealthy.app.repositories.UserRepository;
import dev.gethealthy.app.security.models.JwtUser;
import dev.gethealthy.app.services.AuthService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;

import java.time.Instant;
import java.util.Date;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthServiceImpl implements AuthService {
    private final AuthenticationManager authenticationManager;
    private final UserAccountRepository userAccountRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;

    @Value("${authorization.token.expiration-time}")
    private String tokenExpirationTime;
    @Value("${authorization.token.secret}")
    private String tokenSecret;

    @Override
    public LoginResponse login(LoginRequest request) {
        LoginResponse response;
        try {
            Authentication authenticate = authenticationManager
                    .authenticate(
                            new UsernamePasswordAuthenticationToken(
                                    request.getUsername(), request.getPassword()
                            )
                    );
            JwtUser user = (JwtUser) authenticate.getPrincipal();
            response = modelMapper.map(userAccountRepository.findById(user.getId()), LoginResponse.class)   ;
            response.setToken(generateJwt(user));
        } catch (Exception ex) {
            throw new UnauthorizedException();
        }
        return response;
    }

    private String generateJwt(JwtUser user) {
        return Jwts.builder()
                .id(user.getId().toString())
                .claim("role", user.getRole().name())
                .subject(user.getId().toString())
                .expiration(new Date(System.currentTimeMillis() + Long.parseLong(tokenExpirationTime)))
                .signWith(Keys.hmacShaKeyFor(Decoders.BASE64.decode(tokenSecret)))
                .compact();
    }

    @Override
    public boolean logout() {
        // invalidate JWT
        return false;
    }

    @Override
    public boolean register(RegistrationRequest registrationRequest) {
        var enabled = registrationRequest.getRole() != Role.TRAINER;
        var userAccount = modelMapper.map(registrationRequest, UserAccount.class);
        userAccount.setPassword(passwordEncoder.encode(userAccount.getPassword()));
        userAccount.setEnabled(enabled);
        userAccount.setCreatedAt(Instant.now());
        var createdUserAccount = userAccountRepository.save(userAccount);
        var user = modelMapper.map(registrationRequest, User.class);
        user.setUserAccount(createdUserAccount);
        userRepository.save(user);
        return true;
    }
}
