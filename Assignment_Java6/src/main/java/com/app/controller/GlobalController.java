package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ModelAttribute;
import com.app.service.AccountService;

import jakarta.servlet.http.HttpServletRequest;

@ControllerAdvice
public class GlobalController {
	@Autowired
	AccountService accountService;

	// all controller have this ModelAttribute
	@ModelAttribute("name")
	String getFullName(HttpServletRequest request) {
		return request.getUserPrincipal() == null ? ""
				: accountService.findById(request.getUserPrincipal().getName()).getFullname();
	}
	
	@ModelAttribute("image")
	String getImage(HttpServletRequest request) {
		return request.getUserPrincipal() == null ? ""
				: accountService.findById(request.getUserPrincipal().getName()).getPhoto();
	}
}
