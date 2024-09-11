package com.reIntern.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.reIntern.model.*;
import com.reIntern.repository.*;


@Service
public class AdminService {

	@Autowired
	private AdminRepository adminRepository;
	
	
	public Admin registerAdmin(Admin admin) {
		return adminRepository.save(admin);
	}
	
	 public List<Admin> getAdmins(){
	        return (List<Admin>)adminRepository.findAll();
	 }
}
