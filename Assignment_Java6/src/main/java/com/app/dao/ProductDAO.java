package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.app.entity.Product;

@Repository
public interface ProductDAO extends JpaRepository<Product, Integer> {
	
	@Query("SELECT p from product p where p.category.id=?1")
	List<Product> findByCategoryId(String cid);


}
