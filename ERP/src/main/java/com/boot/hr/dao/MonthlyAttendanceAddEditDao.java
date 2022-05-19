package com.boot.hr.dao;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.boot.hr.model.MonthlyAttendence;
import com.boot.hr.model.MonthlyAttendenceParam;
@Repository
public class MonthlyAttendanceAddEditDao {
	@Autowired
	private EntityManager em;
	public Boolean saveMonthlyAttendence(MonthlyAttendenceParam monthlyAttendance) {
		return em.createNamedStoredProcedureQuery("Usp_MonthlyAttendanceAddEdit")
				.setParameter("id", monthlyAttendance.getId())
				.setParameter("memberID", monthlyAttendance.getMemberID())
				.setParameter("periodID", monthlyAttendance.getPeriodID())
				.setParameter("groupID", monthlyAttendance.getGroupID())
				.setParameter("sectionID", monthlyAttendance.getSectionID())
				.setParameter("empCode", monthlyAttendance.getEmpCode())
				.setParameter("workingDays", monthlyAttendance.getWorkingDays())
				.setParameter("absentDays", monthlyAttendance.getAbsentDays())
				.setParameter("lateDays", monthlyAttendance.getLateDays())
				.setParameter("leaveDays", monthlyAttendance.getLeaveDays())
				.setParameter("totalPressentDays", monthlyAttendance.getTotalPressentDays())
				.setParameter("overTimeHours", monthlyAttendance.getOverTimeHours())
				.setParameter("overTimeAmount", monthlyAttendance.getOverTimeAmount())
				.setParameter("tdaWorkingDays", monthlyAttendance.getTdaWorkingDays())
				.setParameter("tdaLeaveDays", monthlyAttendance.getTdaLeaveDays())
				.setParameter("tdaAbsentDays", monthlyAttendance.getTdaAbsentDays()
						)
				.setParameter("tourDays", monthlyAttendance.getTourDays())
				.setParameter("payableDays", monthlyAttendance.getPayableDays())
				.setParameter("payableAmount", monthlyAttendance.getPayableAmount())
				.setParameter("remarks", monthlyAttendance.getRemarks())
				.setParameter("comment", monthlyAttendance.getComment())
				.setParameter("compID", monthlyAttendance.getCompID())
				.setParameter("moduleID", monthlyAttendance.getModuleID())
				.execute();
	}
}
