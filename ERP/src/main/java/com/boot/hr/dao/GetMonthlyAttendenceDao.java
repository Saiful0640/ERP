package com.boot.hr.dao;

import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.boot.hr.model.GetMonthlyAttendence;
@Repository
public class GetMonthlyAttendenceDao {
	@Autowired
	private EntityManager em;
	@SuppressWarnings("unchecked")
	public List<GetMonthlyAttendence> getMonthlyAttendence(long periodID,long groupID,long sectionID) {
		return em.createNamedStoredProcedureQuery("GetMonthlyAttendence")
				.setParameter("periodID", periodID)
				.setParameter("groupID", groupID)
				.setParameter("sectionID", sectionID)
				.getResultList();
	}
}
