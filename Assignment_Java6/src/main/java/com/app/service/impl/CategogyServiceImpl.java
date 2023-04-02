package com.app.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.CategoryDAO;
import com.app.entity.Category;
import com.app.service.CategoryService;


@Service
public class CategogyServiceImpl implements CategoryService{

	@Autowired
	CategoryDAO cdao;

	@Override
	public List<Category> findAll() {
		// TODO Auto-generated method stub
		return cdao.findAll();
	}
	
}
