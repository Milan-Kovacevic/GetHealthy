package dev.gethealthy.app.services.impl;

import dev.gethealthy.app.exceptions.UnauthorizedException;
import dev.gethealthy.app.models.entities.*;
import dev.gethealthy.app.models.enums.Role;
import dev.gethealthy.app.models.enums.StorageType;
import dev.gethealthy.app.models.requests.LoginRequest;
import dev.gethealthy.app.models.requests.UserRegistrationRequest;
import dev.gethealthy.app.models.responses.AuthUserResponse;
import dev.gethealthy.app.models.responses.LoginResponse;
import dev.gethealthy.app.models.responses.TokensResponse;
import dev.gethealthy.app.repositories.*;
import dev.gethealthy.app.security.models.JwtUser;
import dev.gethealthy.app.services.AuthService;
import dev.gethealthy.app.services.StorageAccessService;
import dev.gethealthy.app.util.Utility;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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
    private final StorageAccessService storageAccessService;
    private final TraineeRepository traineeRepository;
    private final RegistrationRequestRepository registrationRequestRepository;

    @Value("${authorization.token.expiration-time}")
    private String tokenExpirationTime;
    @Value("${authorization.token.secret}")
    private String tokenSecret;

    @Override
    public LoginResponse login(LoginRequest request) {
        LoginResponse response = new LoginResponse();
        try {
            Authentication authenticate = authenticationManager
                    .authenticate(
                            new UsernamePasswordAuthenticationToken(
                                    request.getUsername(), request.getPassword()));
            JwtUser user = (JwtUser) authenticate.getPrincipal();
            AuthUserResponse userResponse = modelMapper.map(userRepository.findById(user.getId()),
                    AuthUserResponse.class);
            userResponse.setRole(user.getRole());
            TokensResponse tokens = new TokensResponse();
            tokens.setAccessToken(generateJwt(user));
            tokens.setRefreshToken(generateJwt(user));
            response.setTokens(tokens);
            response.setUser(userResponse);
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
    public void register(UserRegistrationRequest registrationRequest, MultipartFile file) throws IOException {
        var isTrainer = registrationRequest.getRole() == Role.TRAINER;
        var enabled = !isTrainer;
        var userAccount = modelMapper.map(registrationRequest, UserAccount.class);
        userAccount.setPassword(passwordEncoder.encode(userAccount.getPassword()));
        userAccount.setEnabled(enabled);
        userAccount.setCreatedAt(Utility.getInstantCurrentDate());
        var createdUserAccount = userAccountRepository.save(userAccount);

        if (isTrainer) {
            var qualificationPath = storageAccessService.saveToFile(file.getOriginalFilename(), file.getBytes(),
                    StorageType.DOCUMENT);
            var request = modelMapper.map(registrationRequest, RegistrationRequest.class);
            request.setIssueDate(Utility.getInstantCurrentDate());
            request.setCertificationFilePath(qualificationPath);
            request.setUserAccount(createdUserAccount);
            request.setId(null);

            registrationRequestRepository.save(request);
        } else {
            var trainee = modelMapper.map(registrationRequest, Trainee.class);
            trainee.setUserAccount(createdUserAccount);
            traineeRepository.save(trainee);
        }
    }
}
