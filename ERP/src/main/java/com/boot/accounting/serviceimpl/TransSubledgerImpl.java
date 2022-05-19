package com.boot.accounting.serviceimpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.boot.accounting.model.TransSubledger;
import com.boot.accounting.repo.TransSubledgerRepo;
import com.boot.accounting.service.TransSubledgerService;
@Service
public class TransSubledgerImpl implements TransSubledgerService {

	@Autowired
	TransSubledgerRepo repos;
	public boolean saveTransSubledger(TransSubledger transSubledger) {
		transSubledger =repos.save(transSubledger);
		boolean isSuccess = transSubledger.getId()>1;
		return isSuccess;
	}

	
	public boolean updateTransSubledger(TransSubledger transSubledger) {
		repos.save(transSubledger);
		return true;
	}

	
	public boolean deleteByIdTransSubledger(Long id) {
		repos.deleteById(id);
		return true;
	}

	public TransSubledger getByIdTransSubledger(Long id) {
		Optional<TransSubledger> opt =repos.findById(id);
		if(opt.isPresent()) {
			return opt.get();
		}
		return null;
	}

	
	public List<TransSubledger> getAllTransSubledger() {
		
		return repos.findAll();
	}

}
