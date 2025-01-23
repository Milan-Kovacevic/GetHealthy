package dev.gethealthy.app.services.impl;

import dev.gethealthy.app.exceptions.NotFoundException;
import dev.gethealthy.app.models.requests.ProcessRequest;
import dev.gethealthy.app.models.responses.RegistrationRequestResponse;
import dev.gethealthy.app.models.responses.UserAccountResponse;
import dev.gethealthy.app.repositories.RegistrationRequestRepository;
import dev.gethealthy.app.repositories.UserAccountRepository;
import dev.gethealthy.app.repositories.UserRepository;
import dev.gethealthy.app.services.RegistrationRequestService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class RegistrationRequestServiceImpl implements RegistrationRequestService {

    private final RegistrationRequestRepository registrationRequestRepository;
    private final UserAccountRepository userAccountRepository;
    private final ModelMapper modelMapper;

    public Page<RegistrationRequestResponse> getRequests(Pageable page)
    {
        return registrationRequestRepository.findAll(page).map(registrationRequest -> modelMapper.map(registrationRequest, RegistrationRequestResponse.class));
    }

    @Override
    public void processRequest(Integer id, ProcessRequest request) {
        var registrationRequest = registrationRequestRepository.findById(id).orElse(null);
        if (registrationRequest == null) {
            throw new NotFoundException();
        }
        var userAccount = userAccountRepository.findById(id).orElse(null);
        if (userAccount == null) {
            throw new NotFoundException();
        }
        userAccount.setEnabled(request.getApprove());
        registrationRequestRepository.delete(registrationRequest);
        userAccountRepository.save(userAccount);
    }

    @Override
    public RegistrationRequestResponse getRequest(Integer id) {
        var registrationRequest = registrationRequestRepository.findById(id).orElse(null);
        if (registrationRequest == null) {
            throw new NotFoundException();
        }
        return modelMapper.map(registrationRequest, RegistrationRequestResponse.class);
    }
}
