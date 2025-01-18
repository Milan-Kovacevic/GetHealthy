package dev.gethealthy.app.controllers;

import dev.gethealthy.app.base.CrudController;
import dev.gethealthy.app.models.requests.CategoryRequest;
import dev.gethealthy.app.models.responses.CategoryResponse;
import dev.gethealthy.app.models.responses.ExerciseResponse;
import dev.gethealthy.app.services.CategoryService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${gethealthy.base-url}/categories")
public class CategoryController extends CrudController<Integer, CategoryRequest, CategoryResponse> {
    private final CategoryService categoryService;

    public CategoryController(CategoryService crudService) {
        super(crudService, CategoryResponse.class);
        this.categoryService = crudService;
    }

    @GetMapping("filter")
    public Page<CategoryResponse> getAllExerciseFiltered(Pageable page) {
        return categoryService.getPageableCategories(page);
    }

}
