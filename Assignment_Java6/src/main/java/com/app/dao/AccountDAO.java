package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.app.entity.Account;
import com.app.entity.Product;


@Repository
public interface AccountDAO extends JpaRepository<Account, String>{
	@Query("select distinct ar.account from Authority ar where ar.role.id in ('DIRE','STAF')")
	List<Account> getAdministrators();
}
