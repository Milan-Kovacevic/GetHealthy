package dev.gethealthy.app.controllers;

import dev.gethealthy.app.models.requests.ProcessRequest;
import dev.gethealthy.app.models.responses.RegistrationRequestResponse;
import dev.gethealthy.app.services.RegistrationRequestService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${gethealthy.base-url}/requests")
@RequiredArgsConstructor
public class RegistrationRequestController {
    private final RegistrationRequestService registrationRequestService;

    @GetMapping
    public Page<RegistrationRequestResponse> getRequests(Pageable page)
    {
        return registrationRequestService.getRequests(page);
    }

    @GetMapping("/{id}")
    public RegistrationRequestResponse getRequest(@PathVariable Integer id)
    {
        return registrationRequestService.getRequest(id);
    }

    @PostMapping("/{id}/process")
    public void processRequest(@PathVariable(name="id") Integer id, @RequestBody @Valid ProcessRequest processRequest)
    {
        registrationRequestService.processRequest(id, processRequest);
    }
}
