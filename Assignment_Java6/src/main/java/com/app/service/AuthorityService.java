package com.app.service;

import java.util.List;

public interface AuthorityService {

	List<String> findRoles(String username);
}
