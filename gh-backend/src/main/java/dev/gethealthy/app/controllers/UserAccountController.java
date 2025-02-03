package dev.gethealthy.app.controllers;

import dev.gethealthy.app.models.requests.EmailChangeRequest;
import dev.gethealthy.app.models.requests.PasswordChangeRequest;
import dev.gethealthy.app.models.responses.UserAccountResponse;
import dev.gethealthy.app.services.UserAccountService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("${gethealthy.base-url}/accounts")
public class UserAccountController {
    private final UserAccountService userAccountService;

    @GetMapping("{userId}")
    public UserAccountResponse getUserAccount(@PathVariable(name = "userId") Integer userId) {
        return userAccountService.getUserAccount(userId);
    }

    @PostMapping("{userId}/change-password")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void changePassword(@PathVariable(name = "userId") Integer userId,
                               @RequestBody @Valid PasswordChangeRequest request) {
        userAccountService.changePassword(userId, request);
    }

    @PostMapping("{userId}/change-email")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void changeEmail(@PathVariable(name = "userId") Integer userId,
                            @RequestBody @Valid EmailChangeRequest request) {
        userAccountService.changeEmail(userId, request);
    }

    @PostMapping("{userId}/suspend")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void suspendUserAccount(@PathVariable(name = "userId") Integer userId) {
        userAccountService.suspendAccount(userId);
    }
}
