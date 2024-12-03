package dev.gethealthy.app.models.entities;

import dev.gethealthy.app.base.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "registration_request")
public class RegistrationRequest implements BaseEntity<Integer> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "UserId", nullable = false)
    private Integer id;

    @MapsId
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "UserId", nullable = false)
    private UserAccount userAccount;

    @NotNull
    @Column(name = "IssueDate", nullable = false)
    private Instant issueDate;

    @Size(max = 192)
    @NotNull
    @Column(name = "CertificationFilePath", nullable = false, length = 192)
    private String certificationFilePath;

    @Size(max = 512)
    @Column(name = "Description", length = 512)
    private String description;

    @Size(max = 96)
    @NotNull
    @Column(name = "FirstName", nullable = false, length = 96)
    private String firstName;

    @Size(max = 96)
    @NotNull
    @Column(name = "LastName", nullable = false, length = 96)
    private String lastName;

}