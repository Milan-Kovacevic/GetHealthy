package dev.gethealthy.app.controllers;

import dev.gethealthy.app.exceptions.ForbiddenException;
import dev.gethealthy.app.models.entities.TrainingProgramOnSchedule;
import dev.gethealthy.app.models.enums.Role;
import dev.gethealthy.app.models.requests.TrainingScheduleRequest;
import dev.gethealthy.app.models.responses.TrainingScheduleResponse;
import dev.gethealthy.app.security.models.JwtUser;
import dev.gethealthy.app.services.TrainingScheduleService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static dev.gethealthy.app.util.Utility.getJwtUser;

@RestController
@RequestMapping("${gethealthy.base-url}/schedules")
public class TrainingScheduleController {
    private final TrainingScheduleService scheduleService;

    public TrainingScheduleController(TrainingScheduleService scheduleService) {
        this.scheduleService = scheduleService;
    }

    @GetMapping
    public List<TrainingScheduleResponse> getSchedules()
    {
        JwtUser jwtUser = getJwtUser().orElseThrow(ForbiddenException::new);
        var role = jwtUser.getRole();

        if (role == Role.TRAINER)
            return scheduleService.getScheduleForTrainer(jwtUser.getId());
        else
            return scheduleService.getScheduleForTrainee(jwtUser.getId());
    }

    @PostMapping
    public void createSchedule(TrainingScheduleRequest request) {
        scheduleService.insert(request, TrainingProgramOnSchedule.class);
    }

    @DeleteMapping
    public void deleteSchedule(Integer id) {
        scheduleService.delete(id);
    }
}
