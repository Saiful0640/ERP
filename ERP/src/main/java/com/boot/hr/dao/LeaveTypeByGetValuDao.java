package com.boot.hr.dao;

import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.boot.hr.model.LeaveTypeByGetValu;

@Repository
public class LeaveTypeByGetValuDao {
	@Autowired
	private EntityManager em;
	@SuppressWarnings("unchecked")
	public List<LeaveTypeByGetValu> getAllLeaveTypeByGetValu(int gradevalue) {
		return em.createNamedStoredProcedureQuery("LeaveTypeByGetValu").setParameter("gradevalue", gradevalue).getResultList();
	}
}
