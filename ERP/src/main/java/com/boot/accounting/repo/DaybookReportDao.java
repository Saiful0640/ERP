package com.boot.accounting.repo;
import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.boot.accounting.model.DayBookReport;


@Repository
public class DaybookReportDao {
	@Autowired
	private EntityManager em;

	@SuppressWarnings("unchecked")
	public List<DayBookReport> getDayBookReport(String startdate,String enddate,String vouchertype,Long accountid) {
		return em.createNamedStoredProcedureQuery("daybookrepot").setParameter("startdate", startdate).setParameter("enddate", enddate).setParameter("vouchertype", vouchertype).setParameter("accountid", accountid).getResultList();
	}
}
