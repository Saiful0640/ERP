package com.boot.accounting.service;

import java.util.List;

import com.boot.accounting.model.Subledger;

public interface SubledgerService {
	boolean saveSubledger(Subledger subledger);
	boolean updateSubledger(Subledger subledger);
	boolean deleteByIdSubledger(Long id);
	Subledger getByIdSubledger(Long id);
	List<Subledger> getAllSubledger();
}
