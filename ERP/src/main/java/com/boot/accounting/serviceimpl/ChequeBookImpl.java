package com.boot.accounting.serviceimpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.boot.accounting.model.ChequeBook;
import com.boot.accounting.model.TransMasterAcc;
import com.boot.accounting.repo.ChequeBookRepo;
import com.boot.accounting.service.ChequeBookService;
@Service
public class ChequeBookImpl implements ChequeBookService {
	@Autowired
	ChequeBookRepo repos;
	
	public boolean saveChequeBook(ChequeBook chequeBook) {
		chequeBook =repos.save(chequeBook);
		boolean isSuccess = chequeBook.getId()>1;
		return isSuccess;
	}

	
	public boolean updateChequeBook(ChequeBook chequeBook) {
		repos.save(chequeBook);
		return true;
	}

	
	public boolean deleteByIdChequeBook(Long id) {
		repos.deleteById(id);
		return true;
	}

	@Override
	public ChequeBook getByIdChequeBook(Long id) {
		Optional<ChequeBook> opt =repos.findById(id);
		if(opt.isPresent()) {
			return opt.get();
		}
		return null;
	}

	@Override
	public List<ChequeBook> getAllChequeBook() {
		// TODO Auto-generated method stub
		return repos.findAll();
	}

}
