package com.boot.payroll.dao;

import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.boot.payroll.model.CenServiceAmtSettingParam;
import com.boot.payroll.model.GetCriteriaDetailsByCriteriaIdAndDetailsID;

@Repository
public class DeletecenserviceamtsettingByDetailsAndModuleIdDao {
	@Autowired
	private EntityManager em;
	@SuppressWarnings("unchecked")
	public Boolean deletecenserviceamtsettingByDetailsAndModuleId(CenServiceAmtSettingParam cenServiceAmtSettingParam) {
		return em.createNamedStoredProcedureQuery("deletecenserviceamtsettingByDetailsAndModuleId").setParameter("DetailsId", cenServiceAmtSettingParam.getDetailsId()).setParameter("ModuleId", cenServiceAmtSettingParam.getModuleId()).execute();
	}
}
