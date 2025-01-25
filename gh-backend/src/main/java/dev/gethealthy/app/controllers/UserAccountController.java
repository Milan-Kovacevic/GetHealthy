package dev.gethealthy.app.controllers;

import dev.gethealthy.app.models.responses.UserResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import dev.gethealthy.app.models.requests.EmailChangeRequest;
import dev.gethealthy.app.models.requests.PasswordChangeRequest;
import dev.gethealthy.app.models.responses.UserAccountResponse;
import dev.gethealthy.app.services.UserAccountService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("${gethealthy.base-url}/accounts")
public class UserAccountController {
    private final UserAccountService userAccountService;

    @GetMapping("/{userId}")
    public UserAccountResponse getUserAccount(@PathVariable(name = "userId") Integer userId) {
        return userAccountService.getUserAccount(userId);
    }

    @PostMapping("/{userId}/change-password")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void changePassword(@PathVariable(name = "userId") Integer userId,
            @RequestBody @Valid PasswordChangeRequest request, Authentication auth) {
        // if (auth == null)
        // throw new UnauthorizedException();

        userAccountService.changePassword(userId, request);
    }

    @PostMapping("/{userId}/change-email")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void changeEmail(@PathVariable(name = "userId") Integer userId,
            @RequestBody @Valid EmailChangeRequest request, Authentication auth) {
        // if (auth == null)
        // throw new UnauthorizedException();
        userAccountService.changeEmail(userId, request);
    }
}
