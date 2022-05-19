package com.boot.accounting.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.boot.accounting.model.DayBookReport;
@Component
@Transactional
public interface DayBookReportRepo extends JpaRepository<DayBookReport, Long>{
	@Modifying
	@Query(value = "{call daybook_report(:startdate,:enddate,:vouchertype,:accountid)};", nativeQuery = true)
	List<DayBookReport> getDayBookReport(@Param("startdate") String startdate,@Param("enddate") String enddate,@Param("vouchertype") String vouchertype,@Param("accountid") Long accountid);
}
