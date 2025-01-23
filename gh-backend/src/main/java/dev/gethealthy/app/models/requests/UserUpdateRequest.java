package dev.gethealthy.app.models.requests;

import java.time.LocalDate;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

import dev.gethealthy.app.models.enums.Gender;
import dev.gethealthy.app.models.enums.Role;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@JsonTypeInfo(include = JsonTypeInfo.As.EXISTING_PROPERTY, property = "role", use = JsonTypeInfo.Id.NAME, visible = true)
@JsonSubTypes({
        @JsonSubTypes.Type(value = TraineeUpdateRequest.class, name = "TRAINEE"),
        @JsonSubTypes.Type(value = TrainerUpdateRequest.class, name = "TRAINER")
})
@Data
public class UserUpdateRequest {
    private String firstName;
    private String lastName;
    private LocalDate dateOfBirth;
    private Gender gender;
    @NotNull
    private Role role;
}