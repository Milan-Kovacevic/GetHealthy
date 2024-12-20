package dev.gethealthy.app.services;

import java.io.IOException;
import org.springframework.core.io.Resource;
import dev.gethealthy.app.models.enums.StorageType;

public interface StorageAccessService {

    String saveToFile(String fileName, byte[] content, StorageType type);

    void deleteFile(String fileName, StorageType type) throws IOException;

    Resource getFileAsResource(String fileName, StorageType type) throws IOException;
}
