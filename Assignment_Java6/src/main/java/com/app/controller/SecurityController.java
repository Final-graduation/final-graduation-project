package com.app.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
public class SecurityController {
	
	@RequestMapping("/login/form")
	public String form() {
		return "login/login-form";
	}
	
	@RequestMapping("/login/success")
	public String login(Model model) {
		model.addAttribute("message", "Success!");
		return "forward:/login/form";
	}
	@RequestMapping("/login/error")
	public String error(Model model) {
		model.addAttribute("message", "ERROR!");
		return "forward:/login/form";
	}
	
	@RequestMapping("/logout/success")
	public String logout(Model model) {
		model.addAttribute("message","Logout success!");
		return "forward:/login/form";
	}
	
	@ResponseBody
	@RequestMapping("/unauthoried")
	public String unauthoried() {
		return "You have no permittion to use this page!";
	}
	
	@ResponseBody
	@GetMapping("/rest/authorities")
	public String abc(){
		return "Hello Director";
	}
	
}
