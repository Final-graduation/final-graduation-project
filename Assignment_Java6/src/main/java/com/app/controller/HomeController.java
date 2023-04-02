package com.app.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

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
