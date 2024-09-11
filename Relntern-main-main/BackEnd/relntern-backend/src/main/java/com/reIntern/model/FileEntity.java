package com.reIntern.model;



import jakarta.persistence.Column;

import jakarta.persistence.Entity;

import jakarta.persistence.GeneratedValue;

import jakarta.persistence.GenerationType;

import jakarta.persistence.Id;

import jakarta.persistence.Lob;

import jakarta.persistence.Table;



@Entity

@Table(name = "interns_files")

public class FileEntity {



 @Id

 @GeneratedValue(strategy = GenerationType.IDENTITY)

 private Long id;



 @Column(name = "file_name", nullable = false)

 private String fileName;



 @Column(name = "size")

 private long size;



 @Lob

 @Column(name = "file_data", nullable = false)

 private byte[] file_data;

 

 @Column(name = "intern_id", nullable = false)

 private Long intern_id;



 // Default constructor

 public FileEntity() {

 }



 // Constructor to initialize fields

 public FileEntity(String fileName, long size, byte[] file_data, Long intern_id) {

 this.fileName = fileName;

 this.size = size;

 this.file_data = file_data;

 this.intern_id = intern_id;

 }


 
 public Long getId() {

 return id;

 }



 public void setId(Long id) {

 this.id = id;

 }



 public String getFileName() {

 return fileName;

 }



 public void setFileName(String fileName) {

 this.fileName = fileName;

 }



 public long getSize() {

 return size;

 }



 public void setSize(long size) {

 this.size = size;

 }



 public byte[] getFile_data() {

 return file_data;

 }



 public void setFile_data(byte[] file_data) {

 this.file_data = file_data;

 }



 public Long getIntern_id() {

 return intern_id;

 }



 public void setIntern_id(Long intern_id) {

 this.intern_id = intern_id;

 }

}