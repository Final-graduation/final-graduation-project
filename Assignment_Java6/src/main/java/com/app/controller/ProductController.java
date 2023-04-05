package com.app.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.app.entity.Product;
import com.app.service.ProductService;

import jakarta.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("product")
public class ProductController {
	
	@Autowired
	ProductService productService; 
	
	@RequestMapping("list")
	public String list(Model model, @RequestParam("cid") Optional<String> cid) {
		if(cid.isPresent()) {
			
			List<Product> list = productService.findByCategoryId(cid.get());
			model.addAttribute("items",list);
			model.addAttribute("cname", cid.get());
		}else {
			List<Product> list = productService.findAll();
			model.addAttribute("items", list);
		}
		return "product/list";
	}
}
