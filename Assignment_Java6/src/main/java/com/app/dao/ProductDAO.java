package com.app.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.app.entity.Product;

@Repository
public interface ProductDAO extends JpaRepository<Product, Integer> {

	@Query(value = "select p from Product p where p.category.id = ?1 ")
	public List<Product> findByCategoryId(String categoryId);

	@Query(value = "select p from Product p where p.name like ?1 and p.category.id = ?2 ")
	public List<Product> findByNameAndCatogory(String name, String id);

	List<Product> findByPriceBetween(double minPrice, double maxPrice);
}
