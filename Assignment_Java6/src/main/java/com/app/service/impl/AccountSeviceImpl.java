package com.app.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.AccountDAO;
import com.app.entity.Account;
import com.app.service.AccountService;


@Service
public class AccountSeviceImpl implements AccountService {

	@Autowired
	AccountDAO adao;

	@Override
	public Account findById(String username) {
		// TODO Auto-generated method stub
		return adao.findById(username).get();
	}

	
}
