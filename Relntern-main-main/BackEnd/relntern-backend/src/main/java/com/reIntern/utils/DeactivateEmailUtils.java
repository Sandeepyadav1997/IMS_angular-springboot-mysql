package com.reIntern.utils;

import java.sql.Date;

public class DeactivateEmailUtils {

	public static String getDeactivateEmailMessage(String fullname, Date startDate, Date endDate, String domainid) {
		return "Hi Team,\n\nKindly deactivate the Zmail account for " + fullname
				+ " as the internship is completed. The I-Card is submitted to HR.\n\nIntern Name - " + fullname
				+ "\nStart Date - " + startDate + "\nEnd Date - " + endDate + "\nOfficial domain id - " + domainid
				+ "\n\nThanks & Regards,\nIntern Management System";

	}
}
