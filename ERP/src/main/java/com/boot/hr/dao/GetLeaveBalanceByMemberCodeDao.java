package com.boot.hr.dao;

import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.boot.hr.model.GetLeaveBalanceByMemberCode;


@Repository
public class GetLeaveBalanceByMemberCodeDao {
	@Autowired
	private EntityManager em;
	@SuppressWarnings("unchecked")
	public List<GetLeaveBalanceByMemberCode> getAllLeaveBalanceByMemberCode(String membercode, String leaveyear) {
		return em.createNamedStoredProcedureQuery("get_LeaveBalence_By_membercode").setParameter("membercode", 		membercode).setParameter("leaveyear", leaveyear).getResultList();
	}
}
