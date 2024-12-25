package dev.gethealthy.app.services.impl;

import dev.gethealthy.app.repositories.UserAccountRepository;
import dev.gethealthy.app.security.models.JwtUser;
import dev.gethealthy.app.services.JwtUserDetailsService;
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
        return modelMapper.map(userAccountRepository.findByUsernameOrEmailAndEnabled(usernameOrEmail, usernameOrEmail, true), JwtUser.class);
    }
}
