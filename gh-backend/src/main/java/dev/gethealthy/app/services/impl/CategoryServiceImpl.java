package dev.gethealthy.app.services.impl;

import dev.gethealthy.app.base.CrudJpaService;
import dev.gethealthy.app.models.entities.Category;
import dev.gethealthy.app.services.CategoryService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class CategoryServiceImpl extends CrudJpaService<Category, Integer> implements CategoryService {
    public CategoryServiceImpl(JpaRepository<Category, Integer> repository, ModelMapper modelMapper) {
        super(repository, modelMapper, Category.class);
    }
}
