package com.reIntern.service;

import com.reIntern.model.user;
import com.reIntern.repository.userRepositry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

//logic implementation in service (OTP generation and verification logic is implemented.)
@Service
public class userService {

    @Autowired
    private userRepositry userRepositry;

    @Autowired
    private JavaMailSender mailSender;

    // Method to generate and send OTP
    public void generateAndSendOtp(String username) {
        String otp = generateOtp();
        
        // Fetch the user by username (which is an email)
        user user = userRepositry.findByUsername(username);
        if (user != null) {
            user.setOtp(otp);
            userRepositry.save(user);  // Save the OTP in the database

            // Send the OTP via email
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(username);  // Username is the email
            message.setSubject("Your OTP Code");
            message.setText("Your OTP code is " + otp); // message.setText(EmailUtils.getOtpEmailMessage(username, otp));  // Using the utility method here

            mailSender.send(message);
        }
    }

    // Method to verify OTP
    public Map<String, String> verifyOtp(String username, String otp) {
        user user = userRepositry.findByUsername(username);
        if (user != null && user.getOtp().equals(otp)) {
            user.setOtp(null);  // Clear OTP after successful verification
            userRepositry.save(user);
            Map<String, String> obj=new HashMap<>();//Use void if you don't need to return any information and the method's only purpose is to perform actions like verifying the OTP and updating the database.
            obj.put("role", user.getRole()); //  Use boolean if you want to indicate success or failure without returning specific data.
            return obj; //Keep the Map if you need to return data, such as the user's role, to the caller.
        }
        return null;
    }

    // Helper method to generate a 5-digit OTP
    private String generateOtp() {
        Random random = new Random(); // Use of Random class to generate otp
        int otp = 10000 + random.nextInt(90000);
        return String.valueOf(otp);
    }
}
