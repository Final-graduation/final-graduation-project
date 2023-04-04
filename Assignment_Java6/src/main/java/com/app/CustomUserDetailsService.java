package com.app;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.app.dao.AccountDAO;
import com.app.entity.Account;
import com.app.entity.Authority;


public class CustomUserDetailsService implements UserDetailsService{
	private AccountDAO adao;
	
	@Autowired
	public CustomUserDetailsService(AccountDAO adao) {
		this.adao = adao;
	}

	private Collection<GrantedAuthority> mapRolesToAuthorities(List<Authority> authorities){
		return authorities.stream().map(authority -> new SimpleGrantedAuthority(authority.getRole().getId())).collect(Collectors.toList());
	}


	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Account account = adao.findById(username).orElseThrow(() -> new UsernameNotFoundException("Username not found!"));

		return new User(account.getUsername(),account.getPassword(),mapRolesToAuthorities(account.getAuthorities()));
	}
}
