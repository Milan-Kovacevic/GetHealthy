package dev.gethealthy.app.services;

import dev.gethealthy.app.models.requests.LoginRequest;
import dev.gethealthy.app.models.requests.RegistrationRequest;
import dev.gethealthy.app.models.responses.LoginResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface AuthService{
    LoginResponse login(LoginRequest loginRequest);

    boolean logout();

    void register(RegistrationRequest registrationRequest, MultipartFile file) throws IOException;
}
