package com.boot.hr.dao;

import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.boot.hr.model.GetallemploymentInfoList;

@Repository
public class GetallemploymentInfoListDao {
	@Autowired
	private EntityManager em;
	@SuppressWarnings("unchecked")
	public List<GetallemploymentInfoList> getallemploymentInfoList(long moduleid,long groupid,long sectionid) {
		return em.createNamedStoredProcedureQuery("GetallemploymentInfoList").setParameter("moduleid", moduleid).setParameter("groupid", groupid).setParameter("sectionid", sectionid).getResultList();
	}
}
