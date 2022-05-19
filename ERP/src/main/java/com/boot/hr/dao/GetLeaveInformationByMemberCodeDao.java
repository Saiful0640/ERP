package com.boot.hr.dao;

import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.boot.hr.model.GetLeaveInformationByMemberCode;

@Repository
public class GetLeaveInformationByMemberCodeDao {
	@Autowired
	private EntityManager em;
	@SuppressWarnings("unchecked")
	public List<GetLeaveInformationByMemberCode> getAllGetLeaveInformationByMemberCode(String membercode) {
		return em.createNamedStoredProcedureQuery("getLeaveInformationBymembercode").setParameter("membercode", membercode).getResultList();
	}
}
