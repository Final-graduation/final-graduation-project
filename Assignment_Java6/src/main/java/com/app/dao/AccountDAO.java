package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.entity.Account;


@Repository
public interface AccountDAO extends JpaRepository<Account, String>{

}
