package dev.gethealthy.app.controllers;

import dev.gethealthy.app.exceptions.BadRequestException;
import dev.gethealthy.app.models.enums.Role;
import dev.gethealthy.app.models.requests.LoginRequest;
import dev.gethealthy.app.models.requests.RegistrationRequest;
import dev.gethealthy.app.models.responses.LoginResponse;
import dev.gethealthy.app.services.AuthService;
import jakarta.validation.Valid;
import jdk.jfr.ContentType;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("${gethealthy.base-url}/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping(path="register")
    public void register(@ModelAttribute @Valid RegistrationRequest registrationRequest) {
        if (registrationRequest.getRole() == Role.TRAINER && registrationRequest.getFile()==null)
            throw new BadRequestException();
        authService.register(registrationRequest);
    }

    @PostMapping("login")
    public LoginResponse login(@RequestBody @Valid LoginRequest loginRequest)
    {
        return authService.login(loginRequest);
    }
}
