package com.boot.payroll.service;

import java.util.List;

import com.boot.payroll.model.CentBillPrepare;

public interface CentBillPrepareService {
	boolean saveCentBillPrepare(CentBillPrepare centBillPrepare);
	boolean updateCentBillPrepare(CentBillPrepare CentBillPrepare);
	boolean deleteByIdCentBillPrepare(Long id);
	CentBillPrepare getByIdCentBillPrepare(Long id);
	List<CentBillPrepare> getAllCentBillPrepare();
}
