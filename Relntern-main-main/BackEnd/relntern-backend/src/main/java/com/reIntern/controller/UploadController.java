//package com.reIntern.controller;
//
//import java.util.ArrayList;
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.multipart.MultipartFile;
//
//import com.reIntern.model.FileMetadata;
//import com.reIntern.model.upload;
//import com.reIntern.service.FileMetadataService;
//import com.reIntern.service.UploadService;
//
//@RestController
//@RequestMapping("/files")
//public class UploadController {
//
//    @Autowired
//    private FileMetadataService fileMetadataService;
//
//    @PostMapping("/upload")
//    public ResponseEntity<?> uploadFiles(@RequestParam("files") MultipartFile[] files,
//                                          @RequestParam("incomingRequestId") int incomingRequestId) {
//        try {
//            List<FileMetadata> fileMetadataList = new ArrayList<>();
//            for (MultipartFile file : files) {
//                String filename = file.getOriginalFilename();
//                // Save the file to the server or a cloud storage
//                String fileUrl = saveFile(file); // Implement saveFile method to handle file saving
//                FileMetadata fileMetadata = new FileMetadata();
//                fileMetadata.setIncomingRequestId(incomingRequestId);
//                fileMetadata.setFilename(filename);
//                fileMetadata.setFileUrl(fileUrl);
//                fileMetadataList.add(fileMetadata);
//            }
//            fileMetadataService.saveAll(fileMetadataList);
//            return ResponseEntity.ok("Files uploaded successfully");
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading files");
//        }
//    }
//
//	private String saveFile(MultipartFile file) {
//		// TODO Auto-generated method stub
//		return null;
//	}
//}
