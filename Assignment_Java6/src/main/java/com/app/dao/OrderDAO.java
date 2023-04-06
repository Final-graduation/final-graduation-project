package com.app.dao;

import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
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
}
