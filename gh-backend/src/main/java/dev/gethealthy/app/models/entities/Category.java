package dev.gethealthy.app.models.entities;

import dev.gethealthy.app.base.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "category")
public class Category implements BaseEntity<Integer> {
    @Id
    @Column(name = "CategoryId", nullable = false)
    private Integer id;

    @Column(name = "CategoryName", nullable = false, length = 128)
    private String categoryName;

}