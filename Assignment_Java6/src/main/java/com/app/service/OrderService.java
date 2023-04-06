package com.app.service;

import java.util.List;

import com.app.entity.Order;
import com.fasterxml.jackson.databind.JsonNode;

public interface OrderService {
	//post data through out RestAPI
	Order create(JsonNode orderData);

	//order details follow orderId
	Order findById(Long id);
	
	//list all orders follow username
	List<Order> findByUsername(String username);

}
