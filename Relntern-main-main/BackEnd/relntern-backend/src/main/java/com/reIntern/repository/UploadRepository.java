package com.reIntern.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.reIntern.model.upload;
import java.util.List;

public interface UploadRepository extends JpaRepository<upload, Integer> {

	List<upload> findByInternId(int internId);
}
