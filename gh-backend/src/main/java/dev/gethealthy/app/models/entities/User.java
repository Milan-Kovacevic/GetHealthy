package dev.gethealthy.app.models.entities;

import java.time.LocalDate;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import dev.gethealthy.app.base.BaseEntity;
import dev.gethealthy.app.models.enums.Gender;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

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

    // @NotNull
    // @Column(name = "Gender", nullable = false)
    // private Byte gender;

    @NotNull
    @Enumerated(EnumType.ORDINAL)
    @Column(name = "Gender", nullable = false)
    private Gender gender;

    @Size(max = 192)
    @Column(name = "ProfilePictureFilePath", length = 192)
    private String profilePictureFilePath;

}