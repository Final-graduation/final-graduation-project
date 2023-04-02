package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.entity.OrderDetail;

@Repository
public interface OrderDetailDAO extends JpaRepository<OrderDetail, Long> {
//	List<OrderDetail> findAllByOrder(Order order);
}
