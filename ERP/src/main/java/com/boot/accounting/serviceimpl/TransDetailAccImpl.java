package com.boot.accounting.serviceimpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.boot.accounting.model.TransDetailAcc;
import com.boot.accounting.repo.TransDetailAccRepo;
import com.boot.accounting.service.TransDetailAccService;
@Service
public class TransDetailAccImpl implements TransDetailAccService {
	@Autowired
	TransDetailAccRepo repos;
	
	public boolean saveTransDetailAcc(TransDetailAcc transDetailAcc) {
		transDetailAcc =repos.save(transDetailAcc);
		boolean isSuccess = transDetailAcc.getId()>1;
		return isSuccess;
	}

	public boolean updateTransDetailAcc(TransDetailAcc transDetailAcc) {
		repos.save(transDetailAcc);
		return true;
	}

	
	public boolean deleteByIdTransDetailAcc(Long id) {
		repos.deleteById(id);
		return true;
	}

	
	public TransDetailAcc getByIdTransDetailAcc(Long id) {
		Optional<TransDetailAcc> opt =repos.findById(id);
		if(opt.isPresent()) {
			return opt.get();
		}
		return null;
	}

	
	public List<TransDetailAcc> getAllTransDetailAcc() {
		return repos.findAll();
	}

}
