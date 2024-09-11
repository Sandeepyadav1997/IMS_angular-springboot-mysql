package com.reIntern.service;

import com.reIntern.model.FileEntity;
import com.reIntern.repository.FileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FileService {

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Autowired
    private FileRepository fileRepository;

    public void saveFiles(List<MultipartFile> files, Long internId) throws IOException {
        for (MultipartFile file : files) {
            saveFile(file, internId);
        }
    }

    public void saveFile(MultipartFile file, Long internId) throws IOException {
        if (file.isEmpty()) {
            throw new IOException("Cannot save empty file");
        }

        Path path = Paths.get(uploadDir, file.getOriginalFilename());
        Files.createDirectories(path.getParent()); 
        Files.write(path, file.getBytes());

        FileEntity fileEntity = new FileEntity(file.getOriginalFilename(), file.getSize(), file.getBytes(), internId);
        fileRepository.save(fileEntity);
    }

    public List<String> getAllFileNames() {
        try {
            return Files.list(Paths.get(uploadDir))
                    .map(Path::getFileName)
                    .map(Path::toString)
                    .collect(Collectors.toList());
        } catch (IOException e) {
            throw new RuntimeException("Failed to read files from storage directory", e);
        }
    }

    public Path getFile(String fileName) {
        Path filePath = Paths.get(uploadDir, fileName);
        if (Files.exists(filePath) && Files.isReadable(filePath)) {
            return filePath;
        } else {
            throw new RuntimeException("File not found or not readable: " + fileName);
        }
    }

    @Transactional
    public void deleteFile(String fileName) throws IOException {
        Path filePath = Paths.get(uploadDir, fileName);
        if (Files.exists(filePath)) {
            Files.delete(filePath);
            fileRepository.deleteByFileName(fileName);
        } else {
            throw new IOException("File not found: " + fileName);
        }
    }
}
