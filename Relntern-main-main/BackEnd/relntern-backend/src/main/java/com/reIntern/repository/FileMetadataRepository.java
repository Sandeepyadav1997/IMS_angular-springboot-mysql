package com.reIntern.repository;

import com.reIntern.model.FileMetadata;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FileMetadataRepository extends JpaRepository<FileMetadata, Integer> {
    // Additional custom queries can be added here if needed
}
