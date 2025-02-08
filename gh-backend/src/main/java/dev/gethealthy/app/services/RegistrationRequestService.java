package dev.gethealthy.app.services;

import dev.gethealthy.app.models.requests.ProcessRequest;
import dev.gethealthy.app.models.responses.RegistrationRequestResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface RegistrationRequestService {
    Page<RegistrationRequestResponse> getAllRegistrationRequests(Pageable page);
    
    void processRegistrationRequest(Integer id, ProcessRequest request);

    RegistrationRequestResponse getRegistrationRequest(Integer id);
}
