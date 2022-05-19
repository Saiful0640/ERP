package com.boot.accounting.service;

import java.util.List;

import com.boot.hr.model.Period;

public interface PeriodService {
	boolean savePeriod(Period period);
	boolean updatePeriod(Period period);
	boolean deleteByIdPeriod(Long id);
	Period getByIdPeriod(Long id);
	List<Period> getAllPeriod();
}
