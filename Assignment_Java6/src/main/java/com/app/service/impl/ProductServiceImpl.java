package com.app.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.ProductDAO;
import com.app.entity.Product;
import com.app.service.ProductService;

@Service
public class ProductServiceImpl implements ProductService{

	@Autowired
	ProductDAO pdao;

	@Override
	public List<Product> findAll() {
		// TODO Auto-generated method stub
		return pdao.findAll();
	}

	@Override
	public List<Product> findByCategoryId(String cid) {
		// TODO Auto-generated method stub
		return pdao.findByCategoryId(cid);
	}
}
