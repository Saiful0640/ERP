package com.boot.superadmin.service;

import java.util.List;

import com.boot.superadmin.model.Year;


public interface YearService {
	boolean saveYear(Year year);
	boolean updateYear(Year year);
	boolean deleteByIdYear(Long id);
	Year getByIdYear(Long id);
	List<Year> getAllYear();
}
