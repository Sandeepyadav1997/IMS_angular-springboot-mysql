package com.reIntern.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Transient;

@Entity
public class IncomingRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String fullname;
    private String association;
    private String endDate;
    private String uploads;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getFullname() {
		return fullname;
	}
	public void setFullname(String fullname) {
		this.fullname = fullname;
	}
	public String getAssociation() {
		return association;
	}
	public void setAssociation(String association) {
		this.association = association;
	}
	public String getEndDate() {
		return endDate;
	}
	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}
	public String getUploads() {
		return uploads;
	}
	public void setUploads(String uploads) {
		this.uploads = uploads;
	}
	@Override
	public String toString() {
		return "IncomingRequest [id=" + id + ", fullname=" + fullname + ", association=" + association + ", endDate="
				+ endDate + ", uploads=" + uploads + "]";
	}
    
    

    // Getters and Setters
}
