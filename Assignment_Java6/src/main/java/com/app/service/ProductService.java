package com.app.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.app.entity.Product;

public interface ProductService {
	List<Product> findAll();

	List<Product> findByCategoryId(String cid);

	Product findById(Integer id);


}
