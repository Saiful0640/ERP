package com.boot.hr.service;

import java.util.List;

import com.boot.hr.model.Designation;

public interface DesignationService {
	boolean saveDesignation(Designation designation);
	boolean updateDesignation(Designation designation);
	boolean deleteByIdDesignation(Long id);
	Designation getByIdDesignation(Long id);
	List<Designation> getAllDesignation();
}
