package com.boot.accounting.serviceimpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.boot.accounting.model.TransMasterAcc;
import com.boot.accounting.repo.TransMasterAccRepo;
import com.boot.accounting.service.TransMasterAccService;
@Service
public class TransMasterAccImpl implements TransMasterAccService {
	@Autowired
	TransMasterAccRepo repos;
	
	public boolean saveTransMasterAcc(TransMasterAcc transMasterAcc) {
		transMasterAcc =repos.save(transMasterAcc);
		boolean isSuccess = transMasterAcc.getId()>1;
		return isSuccess;
	}

	
	public boolean updateTransMasterAcc(TransMasterAcc transMasterAcc) {
		repos.save(transMasterAcc);
		return true;
	}

	
	public boolean deleteByIdTransMasterAcc(Long id) {
		repos.deleteById(id);
		return true;
	}

	
	public TransMasterAcc getByIdTransMasterAcc(Long id) {
		Optional<TransMasterAcc> opt =repos.findById(id);
		if(opt.isPresent()) {
			return opt.get();
		}
		return null;
	}

	
	public List<TransMasterAcc> getAllTransMasterAcc() {
		return repos.findAll();
	}

}
