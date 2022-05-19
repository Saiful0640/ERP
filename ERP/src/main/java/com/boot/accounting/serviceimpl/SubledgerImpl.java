package com.boot.accounting.serviceimpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.boot.accounting.model.Subledger;
import com.boot.accounting.repo.SubledgerRepo;
import com.boot.accounting.service.SubledgerService;
@Service
public class SubledgerImpl implements SubledgerService {
	@Autowired
	SubledgerRepo subrepo;
	
	public boolean saveSubledger(Subledger subledger) {
		subledger =subrepo.save(subledger);
		boolean isSuccess = subledger.getId()>1;
		return isSuccess;
	}

	public boolean updateSubledger(Subledger subledger) {
		subrepo.save(subledger);
		return true;
	}

	public boolean deleteByIdSubledger(Long id) {
		subrepo.deleteById(id);
		return true;
	}

	public Subledger getByIdSubledger(Long id) {
		Optional<Subledger> opt = subrepo.findById(id);
		if(opt.isPresent()) {
			return opt.get();
		}
		return null;
	}

	public List<Subledger> getAllSubledger() {
		return subrepo.findAll();
	}

}
