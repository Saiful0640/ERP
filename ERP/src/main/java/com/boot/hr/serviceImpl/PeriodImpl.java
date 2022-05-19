package com.boot.hr.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.boot.accounting.repo.PeriodRepo;
import com.boot.accounting.service.PeriodService;
import com.boot.hr.model.Period;
@Service
public class PeriodImpl implements PeriodService{
	@Autowired
	PeriodRepo repos;
	
	public boolean savePeriod(Period period) {
		period =repos.save(period);
		boolean isSuccess = period.getId()>1;
		return isSuccess;
		
	}

	
	public boolean updatePeriod(Period period) {
		repos.save(period);
		return true;
	}

	
	public boolean deleteByIdPeriod(Long id) {
		repos.deleteById(id);
		return false;
	}

	
	public Period getByIdPeriod(Long id) {
		Optional<Period> opt =repos.findById(id);
		if(opt.isPresent()) {
			return opt.get();
		}
		return null;
	}

	
	public List<Period> getAllPeriod() {
		// TODO Auto-generated method stub
		return repos.findAll();
	}

}
