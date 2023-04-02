package com.app.service;

import java.util.List;

import com.app.entity.Product;

public interface ProductService {
	List<Product> findAll();

	List<Product> findByCategoryId(String string);


}
