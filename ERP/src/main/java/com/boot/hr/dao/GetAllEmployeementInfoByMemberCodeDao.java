package com.boot.hr.dao;

import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.boot.hr.model.GetAllEmployeementInfoByMemberCode;


@Repository
public class GetAllEmployeementInfoByMemberCodeDao {
	@Autowired
	private EntityManager em;
	@SuppressWarnings("unchecked")
	public List<GetAllEmployeementInfoByMemberCode> getAllEmployeementInfoByMemberCode(String membercode) {
		return em.createNamedStoredProcedureQuery("getAllEmployeementInfoByMemberCode").setParameter("membercode", membercode).getResultList();
	}
}
