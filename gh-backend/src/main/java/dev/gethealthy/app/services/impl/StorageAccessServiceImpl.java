package dev.gethealthy.app.services.impl;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.io.Encoders;
import dev.gethealthy.app.models.enums.StorageType;
import dev.gethealthy.app.services.StorageAccessService;
import dev.gethealthy.app.util.Utility;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StorageAccessServiceImpl implements StorageAccessService {
    @Value("${gethealthy.storage.path}")
    private String storagePath;
    @Value("${gethealthy.storage.name}")
    private String storageName;
    @Value("${gethealthy.storage.documents.name}")
    private String documentsName;
    @Value("${gethealthy.storage.pictures.name}")
    private String picturesName;

    private Path documentsPath;
    private Path picturesPath;

    @PostConstruct
    private void postConstruct() {
        Path rootPath = Paths.get(storagePath, storageName).normalize().toAbsolutePath();
        File rootFolder = rootPath.toFile();
        System.out.println("Root storage path: " + rootFolder.getPath());
        if (!rootFolder.exists()) {
            try {
                Files.createDirectories(rootPath);
            } catch (IOException ex) {
                System.out.println(ex.getMessage());
            }
        }

        documentsPath = Paths.get(storagePath, storageName, documentsName).normalize().toAbsolutePath();
        if (!documentsPath.toFile().exists()) {
            try {
                Files.createDirectory(documentsPath);
            } catch (IOException ex) {
                System.out.println(ex.getMessage());
            }
        }

        picturesPath = Paths.get(storagePath, storageName, picturesName).normalize().toAbsolutePath();
        if (!picturesPath.toFile().exists()) {
            try {
                Files.createDirectory(picturesPath);
            } catch (IOException ex) {
                System.out.println(ex.getMessage());
            }
        }
    }

    @Override
    public synchronized String saveToFile(String fileName, byte[] content, StorageType type) {
        String name = new File(fileName).getName();
        String extension = name.substring(name.lastIndexOf('.'));
        try {
            Path filePath = getNewFilePath(extension, type);
            Files.write(filePath, content);
            return filePath.toFile().getName();
        } catch (IOException ex) {
            System.out.println(ex.getMessage());
            return null;
        }
    }

    @Override
    public void deleteFile(String fileName, StorageType type) throws IOException {
        Files.delete(getFilePath(fileName, type));
    }

    @Override
    public Resource getFileAsResource(String fileName, StorageType type) throws IOException {
        Path path = getFilePath(fileName, type);
        if (!Files.exists(path))
            throw new IOException("File doesn't exist!");
        return new UrlResource(path.toUri());
    }

    private Path getFilePath(String fileName, StorageType type) throws IOException {
        Path sourcePath = Paths.get(fileName);

        if (type.equals(StorageType.DOCUMENT)) {
            return resolveAndValidatePath(sourcePath, documentsPath);
        } else if (type.equals(StorageType.PICTURE)) {
            return resolveAndValidatePath(sourcePath, picturesPath);
        } else
            throw new IOException("Invalid storage type specified.");
    }

    private Path resolveAndValidatePath(Path sourcePath, Path basePath) throws IOException {
        Path destinationPath = basePath.resolve(sourcePath).normalize().toAbsolutePath();
        if (!destinationPath.getParent().equals(basePath.toAbsolutePath())) {
            throw new IOException("Cannot access document files outside storage");
        }
        return destinationPath;
    }

    private Path getNewFilePath(String extension, StorageType type) throws IOException {
        String uniqueFileName = Utility.getUtilCurrentDate().getTime() + "_GH";
        String encodedFileName = Encoders.BASE64.encode(uniqueFileName.getBytes());
        if (type.equals(StorageType.DOCUMENT))
            return Path.of(documentsPath.toFile().getPath(), encodedFileName + extension);
        else if (type.equals(StorageType.PICTURE))
            return Path.of(picturesPath.toFile().getPath(), encodedFileName + extension);
        else
            throw new IOException("Invalid storage type specified.");
    }
}
