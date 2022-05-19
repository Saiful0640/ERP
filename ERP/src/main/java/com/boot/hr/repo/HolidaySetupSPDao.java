package com.boot.hr.repo;

import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.boot.hr.model.HolidaySetupSP;

@Repository
public class HolidaySetupSPDao {
	@Autowired
	private EntityManager em;
	@SuppressWarnings("unchecked")
	public List<HolidaySetupSP> getHolidaySetupSP(String hdate) {
		return em.createNamedStoredProcedureQuery("holidaylist").setParameter("hdate", hdate).getResultList();
	}
}
