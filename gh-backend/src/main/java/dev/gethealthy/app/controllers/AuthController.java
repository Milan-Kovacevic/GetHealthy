package dev.gethealthy.app.controllers;

import dev.gethealthy.app.exceptions.BadRequestException;
import dev.gethealthy.app.models.enums.Role;
import dev.gethealthy.app.models.requests.LoginRequest;
import dev.gethealthy.app.models.requests.RegistrationRequest;
import dev.gethealthy.app.models.requests.TokensRequest;
import dev.gethealthy.app.models.responses.LoginResponse;
import dev.gethealthy.app.models.responses.TokensResponse;
import dev.gethealthy.app.services.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("${gethealthy.base-url}/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping(path="register")
    public void register(@RequestPart(name = "data") @Valid RegistrationRequest registrationRequest,
                         @RequestPart(name = "qualification", required = false) MultipartFile file) throws IOException {
        if (registrationRequest.getRole() == Role.TRAINER && file==null)
            throw new BadRequestException();
        authService.register(registrationRequest, file);
    }

    @PostMapping("login")
    public LoginResponse login(@RequestBody @Valid LoginRequest loginRequest)
    {
        return authService.login(loginRequest);
    }

    @PostMapping("refresh")
    public TokensResponse refresh(@RequestBody @Valid TokensRequest request) {
        TokensResponse response = new TokensResponse();
        response.setRefreshToken(request.getRefreshToken());
        response.setAccessToken(request.getRefreshToken());
        return response;
    }
}
