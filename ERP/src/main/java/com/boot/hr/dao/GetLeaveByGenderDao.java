package com.boot.hr.dao;

import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.boot.hr.model.GetLeaveByGender;

@Repository
public class GetLeaveByGenderDao {
	@Autowired
	private EntityManager em;
	@SuppressWarnings("unchecked")
	public List<GetLeaveByGender> getAllLeaveByGender(String membercode) {
		return em.createNamedStoredProcedureQuery("get_LeavebyGender").setParameter("membercode", membercode).getResultList();
	}
}
