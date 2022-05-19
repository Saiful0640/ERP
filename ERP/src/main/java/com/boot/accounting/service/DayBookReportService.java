package com.boot.accounting.service;

import java.util.List;

import com.boot.accounting.model.DayBookReport;

public interface DayBookReportService {
	List<DayBookReport> getDayBookReport(String startdate, String enddate, String vouchertype, Long accountid);
}
