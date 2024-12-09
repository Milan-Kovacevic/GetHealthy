package dev.gethealthy.app.services;

import dev.gethealthy.app.models.requests.ChangeEmailRequest;
import dev.gethealthy.app.models.requests.ChangePasswordRequest;

public interface UserAccountService {
    void changePassword(ChangePasswordRequest request);

    void changeEmail(ChangeEmailRequest request);
}
