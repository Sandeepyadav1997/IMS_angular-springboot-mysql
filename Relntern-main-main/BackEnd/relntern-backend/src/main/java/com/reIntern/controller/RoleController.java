package com.reIntern.controller;

import com.reIntern.model.Task;
import com.reIntern.repository.InternRepository;
import com.reIntern.repository.MentorRepository;
import com.reIntern.repository.RoleRepository;
import com.reIntern.repository.TaskRepository;
import com.reIntern.repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.json.simple.JSONObject;

import com.reIntern.model.Admin;
import com.reIntern.model.Intern;
import com.reIntern.model.Mentor;
import com.reIntern.model.Role;
import com.reIntern.model.user;
import com.reIntern.service.RoleService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user")
@CrossOrigin(allowedHeaders = "*", origins = "http://localhost:4200")
public class RoleController {

	@Autowired
	private RoleService roleservice;

	@Autowired
	private TaskRepository taskRepo;

	@Autowired
	private InternRepository internrepository;

	@Autowired
	private userRepositry userrepo;

	@Autowired
	private MentorRepository mentorrepo;

	@Autowired
	private AdminRepository adminrepo;

	@PostMapping("/validates")
	public Role UserLogin(@RequestBody JSONObject user) {
		String username = (String) user.get("username");
		String password = (String) user.get("password");

		Role flag = roleservice.loginValidation(username, password);
		return flag;
	}

	@PostMapping("/signupIntern")
	public JSONObject InternRegisterValue(@RequestBody JSONObject user) {
		JSONObject result = new JSONObject();
		String email = (String) user.get("email");
		String password = (String) user.get("password");

		if (userrepo.findByUsername(email) != null) {
			result.put("result", "User already exists");
		} else {
			Intern interndetails = internrepository.findByEmail(email);
			System.out.println(interndetails);
			user newuser = new user();
			newuser.setUsername(email);
			newuser.setPassword(password);
			newuser.setRole("intern");
			newuser = userrepo.save(newuser);

			interndetails.setUserId(newuser.getId());
			internrepository.save(interndetails);
		}
		return result;
	}

	@PostMapping("/signupMentor")
	public JSONObject MentorRegisterValue(@RequestBody JSONObject user) {
		JSONObject result = new JSONObject();
		String mentoremail = (String) user.get("mentoremail");
		String password = (String) user.get("password");

		if (userrepo.findByUsername(mentoremail) != null) {
			result.put("result", "User already exists");
		} else {
			Mentor mentordetails = mentorrepo.findByMentoremail(mentoremail);
			if (mentordetails == null) {
				result.put("result", "Mentor not found");
				return result;
			}

			user newuser = new user();
			newuser.setUsername(mentoremail);
			newuser.setPassword(password);
			newuser.setRole("mentor");
			newuser = userrepo.save(newuser);

			mentordetails.setMentoruserid(newuser.getId());
			mentorrepo.save(mentordetails);
			result.put("result", "User saved successfully");
		}
		return result;
	}

	@PostMapping("/signupAdmin")
	public JSONObject adminRegisterValue(@RequestBody JSONObject user) {
	    JSONObject result = new JSONObject();
	    String adminEmail = (String) user.get("adminemail"); 
	    String password = (String) user.get("password");

	    if (userrepo.findByUsername(adminEmail) != null) {
	        result.put("result", "User already exists");
	    } else {
	        Admin adminDetails = adminrepo.findAdminByEmail(adminEmail);
	        if (adminDetails == null) {
	            result.put("result", "Admin not found");
	            return result;
	        }

	        user newUser = new user();
	        newUser.setUsername(adminEmail);
	        newUser.setPassword(password);
	        newUser.setRole("admin");
	        newUser = userrepo.save(newUser);

	        adminDetails.setAdminUserId(newUser.getId());
	        adminrepo.save(adminDetails);
	        result.put("result", "User saved successfully");
	    }
	    return result;
	}

	@GetMapping("/getusers")
	public List<Task> GetUsers() {
		return taskRepo.findAll();
	}
}