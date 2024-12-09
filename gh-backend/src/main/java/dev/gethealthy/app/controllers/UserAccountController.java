package dev.gethealthy.app.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import dev.gethealthy.app.exceptions.UnauthorizedException;
import dev.gethealthy.app.models.requests.ChangeEmailRequest;
import dev.gethealthy.app.models.requests.ChangePasswordRequest;
import dev.gethealthy.app.services.UserAccountService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("${gethealthy.base-url}/accounts")
public class UserAccountController {
    private final UserAccountService userAccountService;

    @PostMapping("/change-password")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void changePassword(@RequestBody @Valid ChangePasswordRequest request, Authentication auth) {
        if (auth == null)
            throw new UnauthorizedException();
        userAccountService.changePassword(request);
    }

    @PostMapping("/change-email")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void changeEmail(@RequestBody @Valid ChangeEmailRequest request, Authentication auth) {
        if (auth == null)
            throw new UnauthorizedException();
        userAccountService.changeEmail(request);
    }
}
