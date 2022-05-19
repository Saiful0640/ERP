package com.boot.hr.dao;

import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.boot.hr.model.UspEmpManualAttendence;

@Repository
public class UspEmpManualAttendenceDao {
	@Autowired
	private EntityManager em;
	@SuppressWarnings("unchecked")
	public List<UspEmpManualAttendence> getUspEmpManualAttendence(String empcode, long departmentid, long designationid, long periodid) {return em.createNamedStoredProcedureQuery("usp_EmpManualAttendence").setParameter("empcode",empcode).setParameter("departmentid", departmentid).setParameter("designationid", designationid).setParameter("periodid", periodid).getResultList();
	}

}
