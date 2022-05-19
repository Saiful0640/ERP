package com.boot.payroll.dao;

import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.boot.payroll.model.CenterServiceAmountList;

@Repository
public class CenterServiceAmountListDao {
	@Autowired
	private EntityManager em;
	@SuppressWarnings("unchecked")
	public List<CenterServiceAmountList> getCenterServiceAmountList(long ModuleID,long DetailsID) {
		return em.createNamedStoredProcedureQuery("CenterServiceAmountList").setParameter("ModuleID", ModuleID).setParameter("DetailsID", DetailsID).getResultList();
	}
}
