package dev.gethealthy.app.services.impl;

import dev.gethealthy.app.exceptions.NotFoundException;
import dev.gethealthy.app.models.entities.Qualification;
import dev.gethealthy.app.models.entities.Trainer;
import dev.gethealthy.app.models.requests.ProcessRequest;
import dev.gethealthy.app.models.responses.RegistrationRequestResponse;
import dev.gethealthy.app.models.responses.UserAccountResponse;
import dev.gethealthy.app.repositories.*;
import dev.gethealthy.app.services.RegistrationRequestService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
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
    private final QualificationRepository qualificationRepository;
    private final TrainerRepository trainerRepository;
    private final ModelMapper modelMapper;
    @PersistenceContext
    private EntityManager entityManager;

    public Page<RegistrationRequestResponse> getAllRegistrationRequests(Pageable page)
    {
        return registrationRequestRepository
                .findAll(page)
                .map(e -> modelMapper.map(e, RegistrationRequestResponse.class));
    }

    @Override
    public void processRegistrationRequest(Integer id, ProcessRequest request) {
        var registrationRequest = registrationRequestRepository
                .findById(id)
                .orElseThrow(NotFoundException::new);

        var userAccount = userAccountRepository
                .findById(id)
                .orElseThrow(NotFoundException::new);

        userAccount.setEnabled(request.getApprove());
        var savedUserAccount = userAccountRepository.save(userAccount);
        if(request.getApprove()){
            var trainer = modelMapper.map(registrationRequest, Trainer.class);
            trainer.setId(null);
            trainer.setUserAccount(savedUserAccount);
            trainer = trainerRepository.save(trainer);

            var qualification = new Qualification();
            qualification.setTrainer(trainer);
            qualification.setCertificationFilePath(registrationRequest.getCertificationFilePath());
            qualification.setId(null);
            qualificationRepository.saveAndFlush(qualification);
        }

        registrationRequestRepository.delete(registrationRequest);
    }

    @Override
    public RegistrationRequestResponse getRegistrationRequest(Integer id) {
        var registrationRequest = registrationRequestRepository
                .findById(id)
                .orElseThrow(NotFoundException::new);

        var response = modelMapper.map(registrationRequest, RegistrationRequestResponse.class);
        modelMapper.map(registrationRequest.getUserAccount(), response);

        return response;
    }
}
