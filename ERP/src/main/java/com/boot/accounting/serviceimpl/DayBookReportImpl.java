package com.boot.accounting.serviceimpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.boot.accounting.model.DayBookReport;
import com.boot.accounting.repo.DayBookReportRepo;
import com.boot.accounting.service.DayBookReportService;
@Service
public class DayBookReportImpl implements DayBookReportService {
	@Autowired
	DayBookReportRepo repos;
	
	public List<DayBookReport> getDayBookReport(String startdate, String enddate, String vouchertype, Long accountid) {

		return repos.getDayBookReport(startdate, enddate, vouchertype, accountid);
	}

	
}
