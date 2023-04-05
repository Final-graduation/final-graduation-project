package com.app.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import jakarta.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("order")
public class OrderController {

	@RequestMapping("list")
	public String list() {
		return "";
	}
	@RequestMapping("checkout")
	public String checkout() {
		return "";
	}
	@RequestMapping("detail/{id}")
	public String detail() {
		return "";
	}
}
