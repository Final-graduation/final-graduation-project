package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ModelAttribute;

import com.app.entity.Category;
import com.app.entity.Order;
import com.app.service.AccountService;
import com.app.service.CategoryService;
import com.app.service.OrderService;

import jakarta.servlet.http.HttpServletRequest;

@ControllerAdvice
public class GlobalController {
	@Autowired
	AccountService accountService;
	
	@Autowired
	CategoryService categoryService;
	
	@Autowired
	OrderService orderService;
	

	// all controller have this ModelAttribute
	@ModelAttribute("name")
	String getFullName(HttpServletRequest request) {
		return request.getUserPrincipal() == null ? ""
				: accountService.findById(request.getUserPrincipal().getName()).getFullname();
	}
	
	// @ModelAttribute("image")
	// String getImage(HttpServletRequest request) {
	// 	return request.getUserPrincipal() == null ? ""
	// 			: accountService.findById(request.getUserPrincipal().getName()).getPhoto();
	// }
	
	@ModelAttribute("cates")
	List<Category> cates(){
		return categoryService.findAll();
	}
}
