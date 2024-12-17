package dev.gethealthy.app.services.impl;

import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import dev.gethealthy.app.exceptions.BadRequestException;
import dev.gethealthy.app.exceptions.NotFoundException;
import dev.gethealthy.app.models.entities.UserAccount;
import dev.gethealthy.app.models.requests.EmailChangeRequest;
import dev.gethealthy.app.models.requests.PasswordChangeRequest;
import dev.gethealthy.app.models.responses.UserAccountResponse;
import dev.gethealthy.app.repositories.UserAccountRepository;
import dev.gethealthy.app.services.UserAccountService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserAccountServiceImpl implements UserAccountService {

    private final UserAccountRepository userAccountRepository;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;

    @Override
    public UserAccountResponse getUserAccount(Integer userId) {
        UserAccount userAccount = userAccountRepository.findById(userId).orElseThrow(NotFoundException::new);

        return modelMapper.map(userAccount, UserAccountResponse.class);
    }

    @Override
    public void changePassword(Integer userId, PasswordChangeRequest request) {
        UserAccount userAccount = userAccountRepository.findById(userId)
                .orElseThrow(NotFoundException::new);

        String newPassEncrypted = passwordEncoder.encode(request.getNewPassword());

        if (!passwordEncoder.matches(request.getCurrentPassword(),
                userAccount.getPassword()))
            throw new BadRequestException("Invalid current password!");

        if (!request.getNewPassword().equals(request.getConfirmedNewPassword()))
            throw new BadRequestException("Password mismatch!");

        userAccount.setPassword(newPassEncrypted);
        userAccountRepository.saveAndFlush(userAccount);
    }

    @Override
    public void changeEmail(Integer userId, EmailChangeRequest request) {
        UserAccount userAccount = userAccountRepository.findById(userId)
                .orElseThrow(NotFoundException::new);

        if (!passwordEncoder.matches(request.getConfirmedPassword(),
                userAccount.getPassword()))
            throw new BadRequestException("Invalid password!");

        userAccount.setEmail(request.getEmail());
        userAccountRepository.saveAndFlush(userAccount);
    }

}
