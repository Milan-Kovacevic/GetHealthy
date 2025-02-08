package dev.gethealthy.app.controllers;

import java.io.IOException;
import java.nio.file.Files;

import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.gethealthy.app.exceptions.NotFoundException;
import dev.gethealthy.app.models.enums.StorageType;
import dev.gethealthy.app.services.StorageAccessService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("${gethealthy.base-url}/${gethealthy.storage.name}")
public class StorageAccessController {
    private final StorageAccessService storageAccessService;

    @GetMapping("documents/{fileName}")
    public ResponseEntity<Resource> getDocumentFile(@PathVariable("fileName") String fileName) {
        final Resource resource;
        try {
            resource = storageAccessService.getFileAsResource(fileName, StorageType.DOCUMENT);
        } catch (IOException e) {
            throw new NotFoundException();
        }

        if (resource == null || !resource.exists() || !resource.isReadable())
            throw new NotFoundException();
        return ResponseEntity
                .ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .header(HttpHeaders.ACCESS_CONTROL_EXPOSE_HEADERS, "Content-Disposition")
                .body(resource);
    }

    @GetMapping("pictures/{fileName}")
    public ResponseEntity<Resource> getPictureFile(@PathVariable("fileName") String fileName) {
        final Resource resource;
        try {
            resource = storageAccessService.getFileAsResource(fileName, StorageType.PICTURE);
        } catch (IOException e) {
            throw new NotFoundException();
        }

        if (resource == null || !resource.exists() || !resource.isReadable())
            throw new NotFoundException();
        return ResponseEntity
                .ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(resource);
    }
}