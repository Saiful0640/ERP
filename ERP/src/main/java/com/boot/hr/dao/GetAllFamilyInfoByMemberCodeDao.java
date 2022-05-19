package com.boot.hr.dao;

import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.boot.hr.model.GetAllFamilyInfoByMemberCode;

@Repository
public class GetAllFamilyInfoByMemberCodeDao {
	@Autowired
	private EntityManager em;
	@SuppressWarnings("unchecked")
	public List< GetAllFamilyInfoByMemberCode> getAllFamilyInfoByMemberCode(String membercode) {
		return em.createNamedStoredProcedureQuery("getAllFamilyInfoByMemberCode").setParameter("membercode", membercode).getResultList();
	}
}
