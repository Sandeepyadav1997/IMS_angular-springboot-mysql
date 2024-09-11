package com.reIntern.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.reIntern.model.upload;
import com.reIntern.repository.UploadRepository;
import java.io.File;
import java.io.IOException;

@Service
public class UploadService {

    @Autowired
    private UploadRepository uploadRepository;

    public upload uploadFile(MultipartFile file, String fileType, int internId) {
        // Logic to handle file upload and save details to the database

        String fileName = file.getOriginalFilename();
        String filePath = "uploads/" + fileType + "/" + fileName;

        try {
            file.transferTo(new File(filePath));
            upload uploadedFile = new upload();
            uploadedFile.setFileName(fileName);
            uploadedFile.setFileType(fileType);
            uploadedFile.setInternId(internId);
            return uploadRepository.save(uploadedFile);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}
