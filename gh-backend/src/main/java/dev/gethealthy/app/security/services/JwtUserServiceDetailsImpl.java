package dev.gethealthy.app.security.services;

import dev.gethealthy.app.exceptions.UnauthorizedException;
import dev.gethealthy.app.repositories.UserAccountRepository;
import dev.gethealthy.app.security.models.JwtUser;
import dev.gethealthy.app.security.services.JwtUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JwtUserServiceDetailsImpl implements JwtUserDetailsService {
    private final UserAccountRepository userAccountRepository;
    private final ModelMapper modelMapper;
    @Override
    public JwtUser loadUserByUsername(String usernameOrEmail) throws UsernameNotFoundException {
        var userAccount = userAccountRepository.findByUsernameOrEmail(usernameOrEmail, usernameOrEmail);
        if (userAccount.getEnabled())
            return modelMapper.map(userAccount, JwtUser.class);
        else
            throw new UnauthorizedException();
    }
}
