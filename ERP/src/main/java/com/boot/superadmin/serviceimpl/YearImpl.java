package com.boot.superadmin.serviceimpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.boot.superadmin.model.Year;
import com.boot.superadmin.repo.YearRepo;
import com.boot.superadmin.service.YearService;
@Service
public class YearImpl implements YearService {
	@Autowired
	YearRepo repos;
	
	public boolean saveYear(Year year) {
		year =repos.save(year);
		boolean isSuccess = year.getId()>1;
		return isSuccess;
	}

	
	public boolean updateYear(Year year) {
		repos.save(year);
		return true;
	}

	
	public boolean deleteByIdYear(Long id) {
		repos.deleteById(id);
		return true;
	}

	
	public Year getByIdYear(Long id) {
		Optional<Year> opt =repos.findById(id);
		if(opt.isPresent()) {
			return opt.get();
		}
		return null;
	}

	
	public List<Year> getAllYear() {
		return repos.findAll();
	}

}
