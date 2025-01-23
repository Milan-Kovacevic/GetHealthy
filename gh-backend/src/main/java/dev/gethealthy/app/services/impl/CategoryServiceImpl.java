package dev.gethealthy.app.services.impl;

import dev.gethealthy.app.base.CrudJpaService;
import dev.gethealthy.app.models.entities.Category;
import dev.gethealthy.app.models.responses.CategoryResponse;
import dev.gethealthy.app.models.responses.ExerciseResponse;
import dev.gethealthy.app.repositories.CategoryRepository;
import dev.gethealthy.app.services.CategoryService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class CategoryServiceImpl extends CrudJpaService<Category, Integer> implements CategoryService {
    private final CategoryRepository categoryRepository;
    public CategoryServiceImpl(CategoryRepository repository, ModelMapper modelMapper) {
        super(repository, modelMapper, Category.class);
        this.categoryRepository = repository;
    }

    @Override
    public Page<CategoryResponse> getPageableCategories(Pageable page) {
        return categoryRepository.findAll(page).map(e -> modelMapper.map(e, CategoryResponse.class));
    }
}
