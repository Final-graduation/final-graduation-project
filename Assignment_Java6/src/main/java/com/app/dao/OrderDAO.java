package com.app.dao;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.app.entity.Order;


@Repository
public interface OrderDAO extends JpaRepository<Order, Long>{
	List<Order> findAllByOrderByCreateDateDesc();	
	
	@Query(value="select o from Order o where o.account.username = ?1 and o.status = ?2")
	List<Order> findByUsername(String username, String status);

	@Query("SELECT SUM(o.totalAmount) AS totalAmount, COUNT(o.id) AS orderCount FROM Order o WHERE o.createDate = ?1")
	Object totalAmountCurrentDay(Date date);

	@Query("SELECT o.createDate, SUM(o.totalAmount) FROM Order o " +
				"WHERE o.createDate BETWEEN ?1 AND ?2 " +
				"GROUP BY o.createDate")
	List<Object[]> getRevenueByDateRange(Date startDate, Date endDate);
}
