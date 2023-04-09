package com.app.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.app.entity.Product;
import com.app.service.ProductService;


import jakarta.servlet.http.HttpSession;

@Controller
@RequestMapping("product")
public class ProductController {
	
	@Autowired
	ProductService productService; 
	
	@Autowired
	HttpSession session;
	
	@RequestMapping("list")
	public String list(Model model, @RequestParam("cid") Optional<String> cid) {
		if(cid.isPresent()) {
			session.setAttribute("categoryId", cid.get());
			List<Product> list = productService.findByCategoryId(cid.get());
			model.addAttribute("items",list);
			if(list.size()!=0)
			model.addAttribute("cname",list.get(0).getCategory().getName());
		}else {
			List<Product> list = productService.findAll();
			model.addAttribute("items", list);
		}
		return "product/list";
	}
	
	@RequestMapping("search")
	public String search(Model model,@RequestParam("name")String name) {
		String cid = session.getAttribute("categoryId").toString();
		List<Product> list = productService.findByNameAndCatogory("%"+name+"%",cid);
		model.addAttribute("items", list);
		System.out.println(name +","+cid);
		return "product/list";
	}
	
	@RequestMapping("range")
	public String range(Model model,@RequestParam("from")Double from,@RequestParam("to")Double to) {
		List<Product> list = productService.findRange(from,to);
		model.addAttribute("items", list);
		return "product/list";
	}
}
