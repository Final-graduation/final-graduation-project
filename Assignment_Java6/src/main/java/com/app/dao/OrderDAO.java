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
//	//xem phía site
//	List<Order> findAllByAccountAndStatus(Account user,Boolean status);
//	
//	List<Order> findAllByAccountAndStatusAndOrdercreatedate(Account user,Boolean status,Date xemtheongay);
//	
//	
//	//xem phía admin
//	List<Order> findAllByStatus(Boolean status);
//	
//	List<Order> findAllByStatusAndOrdercreatedate(Boolean status,Date xemtheongay);
	
	
	@Query(value="select o from Order o where o.account.username = ?1")
	List<Order> findByUsername(String username);

	@Query("SELECT SUM(o.totalAmount) AS totalAmount, COUNT(o.id) AS orderCount FROM Order o WHERE o.createDate = ?1")
	Object totalAmountCurrentDay(Date date);

	@Query("SELECT o.createDate, SUM(o.totalAmount) FROM Order o " +
				"WHERE o.createDate BETWEEN ?1 AND ?2 " +
				"GROUP BY o.createDate")
	List<Object[]> getRevenueByDateRange(Date startDate, Date endDate);
}
