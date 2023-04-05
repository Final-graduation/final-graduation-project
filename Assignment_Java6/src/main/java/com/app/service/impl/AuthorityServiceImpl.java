package com.app.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.AuthorityDAO;
import com.app.service.AuthorityService;

@Service
public class AuthorityServiceImpl implements AuthorityService{
	
	@Autowired
	AuthorityDAO audao;

	@Override
	public List<String> findRoles(String username) {
		return audao.findRoles(username);
	}

}
