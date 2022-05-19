package com.boot.payroll.dao;

import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.boot.payroll.model.GetSalaryProcessMonthly;

@Repository
public class GetSalaryProcessMonthlyDao {
	@Autowired
	private EntityManager em;
	@SuppressWarnings("unchecked")
	public List<GetSalaryProcessMonthly> getSalaryProcessMonthly(long periodID,long groupID) {
		return em.createNamedStoredProcedureQuery("GetSalaryProcessMonthly").setParameter("periodID", periodID).setParameter("groupID", groupID).getResultList();
	}
}
