package com.boot.hr.dao;

import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.boot.hr.model.LeaveReport;

@Repository
public class LeaveReportDao {
	@Autowired
	private EntityManager em;
	@SuppressWarnings("unchecked")
	public List<LeaveReport> getLeaveReport(long year,String empCode) {
		return em.createNamedStoredProcedureQuery("sp_RptleaveInfo").setParameter("year", year)
				.setParameter("empCode", empCode).getResultList();
	}
}
