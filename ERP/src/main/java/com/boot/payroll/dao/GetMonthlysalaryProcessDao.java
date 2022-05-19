package com.boot.payroll.dao;

import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.boot.payroll.model.GetMonthlysalaryProcess;

@Repository
public class GetMonthlysalaryProcessDao {
	@Autowired
	private EntityManager em;
	@SuppressWarnings("unchecked")
	public List<GetMonthlysalaryProcess> getMonthlysalaryProcess(long periodid,long groupid,long sectionid) {
		return em.createNamedStoredProcedureQuery("GetMonthlysalaryProcess").setParameter("periodid", periodid).setParameter("groupid", groupid).setParameter("sectionid", sectionid).getResultList();
	}
}
