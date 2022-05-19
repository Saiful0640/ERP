package com.boot.payroll.dao;

import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.boot.payroll.model.GetCriteriaDetailsByCriteriaIdAndDetailsID;
import com.boot.payroll.model.UspGetIndividualsignCriteria;

@Repository
public class UspGetIndividualsignCriteriaDao {
	@Autowired
	private EntityManager em;
	@SuppressWarnings("unchecked")
	public List<UspGetIndividualsignCriteria> getUspGetIndividualsignCriteria(long ModuleID,long DetailsID,long MemberID) {
		return em.createNamedStoredProcedureQuery("usp_Get_IndividualsignCriteria").setParameter("ModuleID", ModuleID).setParameter("DetailsID", DetailsID).setParameter("MemberID", MemberID).getResultList();
	}
}
