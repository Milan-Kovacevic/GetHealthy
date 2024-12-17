package dev.gethealthy.app.services;

import dev.gethealthy.app.models.requests.EmailChangeRequest;
import dev.gethealthy.app.models.requests.PasswordChangeRequest;
import dev.gethealthy.app.models.responses.UserAccountResponse;

public interface UserAccountService {

    UserAccountResponse getUserAccount(Integer userId);

    void changePassword(Integer userId, PasswordChangeRequest request);

    void changeEmail(Integer userId, EmailChangeRequest request);
}
