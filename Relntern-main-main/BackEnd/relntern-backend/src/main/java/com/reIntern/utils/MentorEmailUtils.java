package com.reIntern.utils;

import java.sql.Date;

public class MentorEmailUtils {

	public static String getMentorEmailUtils(String name, String email, Date startDate, Date endDate, String domainId,
			String projectname, String mentor) {
		return "Hi,\n\nPlease find the updated details for below intern:-\n\nIntern Name - " + name + "\nStart Date - "
				+ startDate + "\nEnd Date - " + endDate + "\nProject Title - " + projectname + "\nMentor - " + mentor
				+ "\nOfficial Domain id - " + domainId + "\nPersonal Email Id - " + email
				+ "\n\nPlease provide formal Internship certificate to " + name + " at " + email
				+ "\nPFA the files provided by " + name + ".\n\nThanks & Regards,\nIntern Management System";

	}
}
