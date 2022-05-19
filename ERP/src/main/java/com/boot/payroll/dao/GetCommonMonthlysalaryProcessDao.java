package com.boot.payroll.dao;

import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.boot.payroll.model.GetCommonMonthlysalaryProcess;

@Repository
public class GetCommonMonthlysalaryProcessDao {
	@Autowired
	private EntityManager em;
	@SuppressWarnings("unchecked")
	public List<GetCommonMonthlysalaryProcess> getCommonMonthlysalaryProcess(long periodID,long GroupID,long departmentID) {
		return em.createNamedStoredProcedureQuery("GetCommonMonthlysalaryProcess").setParameter("periodID", periodID).setParameter("GroupID", GroupID).setParameter("departmentID", departmentID).getResultList();
	}
}
