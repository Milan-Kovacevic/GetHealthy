package dev.gethealthy.app.base;

import dev.gethealthy.app.exceptions.NotFoundException;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.io.Serializable;
import java.util.List;

@Getter
public abstract class CrudController<ID extends Serializable, REQ, RESP> {

    private final Class<RESP> respClass;
    private final CrudService<ID> crudService;

    public CrudController(CrudService<ID> crudService, Class<RESP> respClass) {
        this.crudService = crudService;
        this.respClass = respClass;
    }

    @GetMapping
    List<RESP> findAll() {
        return crudService.findAll(respClass);
    }

    @GetMapping("/{id}")
    public RESP findById(@PathVariable ID id) throws NotFoundException {
        return crudService.findById(id, respClass);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable ID id) {
        crudService.delete(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public RESP insert(@RequestBody REQ object) throws NotFoundException {
        return crudService.insert(object, respClass);
    }

    @PutMapping("/{id}")
    public RESP update(@PathVariable ID id, @RequestBody REQ object) throws NotFoundException {
        return crudService.update(id, object, respClass);
    }
}