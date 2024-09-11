package com.reIntern.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.reIntern.model.Admin;
import com.reIntern.service.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class AdminController {

	@Autowired
	public AdminService adminService;

	@PostMapping("/registerAdmins")
	public Admin registerAdmin(@RequestBody Admin admin) {
		return adminService.registerAdmin(admin);
	}

	@GetMapping("/getAdmins")
	public List<Admin> getAdmins() {
		return adminService.getAdmins();
	}
}
