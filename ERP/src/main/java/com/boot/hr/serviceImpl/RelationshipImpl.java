package com.boot.hr.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.boot.hr.model.Relationship;
import com.boot.hr.repo.RelationshipRepo;
import com.boot.hr.service.RelationshipService;
@Service
public class RelationshipImpl implements RelationshipService {

	@Autowired
	RelationshipRepo repos;
	public List<Relationship> getAllRelationship() {
		// TODO Auto-generated method stub
		return repos.findAll();
	}

}
