package com.reIntern.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.reIntern.model.FileMetadata;
import com.reIntern.repository.FileMetadataRepository;

@Service
public class FileMetadataService {
    @Autowired
    private FileMetadataRepository fileMetadataRepository;

    public void saveAll(List<FileMetadata> fileMetadataList) {
        fileMetadataRepository.saveAll(fileMetadataList);
    }

}
