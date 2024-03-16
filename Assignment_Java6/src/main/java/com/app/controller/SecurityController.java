package com.app.controller;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.app.entity.Account;
import com.app.entity.Authority;
import com.app.service.AccountService;
import com.app.service.AuthorityService;
import com.app.service.RoleService;

import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;




@Controller
public class SecurityController {

	@Autowired
    private AccountService accountService;

	@Autowired
	private AuthorityService authorityService;

	@Autowired
	private RoleService roleService;

	@GetMapping("/login/signup")
	public String signUp(Model model) {
		model.addAttribute("account", new Account());
		return "login/sign-up";
	}

	@PostMapping("/login/signup")
	public String postMethodName(@ModelAttribute Account account) {
		if (!account.getPassword().equals(account.getConfirmPassword())) {
			return "redirect:/login/signup?error=passwordMismatch";
		}
		account.setCreateDate(new Date());
		Authority auth = new Authority();
		auth.setAccount(account);

		auth.setRole(roleService.findById("CUS"));

		accountService.signUP(account);
		authorityService.create(auth);

		return "login/sign-up";
	}
	
	
	
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
