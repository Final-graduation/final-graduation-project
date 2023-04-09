package com.app.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.app.entity.Product;

public interface ProductService {
	List<Product> findAll();

	List<Product> findByCategoryId(String cid);

	Product findById(Integer id);

	Product create(Product product);

	Product update(Product product);

	void delete(Integer id);

	List<Product> findByNameAndCatogory(String name, String cid);

	List<Product> findRange(Double from, Double to);

}
