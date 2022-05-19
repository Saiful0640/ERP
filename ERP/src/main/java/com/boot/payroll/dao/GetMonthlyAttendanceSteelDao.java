package com.boot.payroll.dao;

import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.boot.payroll.model.GetMonthlyAttendanceSteel;

@Repository
public class GetMonthlyAttendanceSteelDao {
	@Autowired
	private EntityManager em;
	@SuppressWarnings("unchecked")
	public List<GetMonthlyAttendanceSteel> getMonthlyAttendanceSteel(long GroupID,long SectionID) {
		return em.createNamedStoredProcedureQuery("get_MonthlyAttendance_steel").setParameter("GroupID", GroupID).setParameter("SectionID", SectionID).getResultList();
	}
}
