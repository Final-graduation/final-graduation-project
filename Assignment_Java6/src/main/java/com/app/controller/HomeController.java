package com.app.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import jakarta.servlet.ServletContext;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@Controller
public class HomeController {
	
	@RequestMapping("/")
	public String index() {
		return "layout/index";
	}
	@RequestMapping("/about")
	public String about() {
		return "layout/about";
	}
	@RequestMapping("/contact")
	public String contact() {
		return "layout/contact";
	}
	@RequestMapping("/product")
	public String product() {
		return "layout/product";
	}
}
