package dev.gethealthy.app.services.impl;

import org.springframework.stereotype.Service;

import dev.gethealthy.app.exceptions.BadRequestException;
import dev.gethealthy.app.exceptions.NotFoundException;
import dev.gethealthy.app.models.entities.UserAccount;
import dev.gethealthy.app.models.requests.ChangeEmailRequest;
import dev.gethealthy.app.models.requests.ChangePasswordRequest;
import dev.gethealthy.app.repositories.UserAccountRepository;
import dev.gethealthy.app.services.UserAccountService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserAccountImpl implements UserAccountService {

    private final UserAccountRepository userAccountRepository;

    @Override
    public void changePassword(ChangePasswordRequest request) {
        UserAccount userAccount = userAccountRepository.findById(request.getUserAccountId())
                .orElseThrow(NotFoundException::new);

        if (userAccount.getPassword().equals(request.getCurrentPassword())
                && request.getNewPassword().equals(request.getConfirmedNewPassword())) {
            userAccount.setPassword(request.getNewPassword());
            userAccountRepository.saveAndFlush(userAccount);
        }
    }

    @Override
    public void changeEmail(ChangeEmailRequest request) {
        UserAccount userAccount = userAccountRepository.findById(request.getUserAccountId())
                .orElseThrow(NotFoundException::new);

        if (userAccount.getPassword().equals(request.getConfirmedPassword())) {
            userAccount.setEmail(request.getEmail());
            userAccountRepository.saveAndFlush(userAccount);
        } else {
            throw new BadRequestException("Wrong password!");
        }
    }

}
