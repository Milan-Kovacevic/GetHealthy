package dev.gethealthy.app.models.entities;

import dev.gethealthy.app.base.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDate;

@Data
@Entity
@Table(name = "user")
@Inheritance(strategy = InheritanceType.JOINED)
public class User implements BaseEntity<Integer> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "UserId", nullable = false)
    private Integer id;

    @MapsId
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "UserId", nullable = false)
    private UserAccount userAccount;

    @Size(max = 96)
    @NotNull
    @Column(name = "FirstName", nullable = false, length = 96)
    private String firstName;

    @Size(max = 96)
    @NotNull
    @Column(name = "LastName", nullable = false, length = 96)
    private String lastName;

    @NotNull
    @Column(name = "DateOfBirth", nullable = false)
    private LocalDate dateOfBirth;

    @NotNull
    @Column(name = "Gender", nullable = false)
    private Byte gender;

    @Size(max = 192)
    @Column(name = "ProfilePictureFilePath", length = 192)
    private String profilePictureFilePath;

}