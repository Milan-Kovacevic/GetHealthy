package dev.gethealthy.app.controllers;

import dev.gethealthy.app.base.CrudController;
import dev.gethealthy.app.models.requests.CategoryRequest;
import dev.gethealthy.app.models.responses.CategoryResponse;
import dev.gethealthy.app.services.CategoryService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${base-url}/categories")
public class CategoryController extends CrudController<Integer, CategoryRequest, CategoryResponse> {
    public CategoryController(CategoryService crudService) {
        super(crudService, CategoryResponse.class);
    }
}
