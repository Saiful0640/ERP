package com.boot.payroll.dao;

import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.boot.payroll.model.GetCriteriaDetailsByCriteriaIdAndDetailsID;

@Repository
public class GetCriteriaDetailsByCriteriaIdAndDetailsIDDao {
	@Autowired
	private EntityManager em;
	@SuppressWarnings("unchecked")
	public List<GetCriteriaDetailsByCriteriaIdAndDetailsID> getCriteriaDetailsByCriteriaIdAndDetailsID(long ModuleID,long CriteriaID,long DetailsID) {
		return em.createNamedStoredProcedureQuery("getCriteriaDetailsByCriteriaIdAndDetailsID").setParameter("ModuleID", ModuleID).setParameter("CriteriaID", CriteriaID).setParameter("DetailsID", DetailsID).getResultList();
	}
}
