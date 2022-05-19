package com.boot.accounting.service;

import java.util.List;

import com.boot.accounting.model.TransSubledger;


public interface TransSubledgerService {
	boolean saveTransSubledger(TransSubledger transSubledger);
	boolean updateTransSubledger(TransSubledger transSubledger);
	boolean deleteByIdTransSubledger(Long id);
	TransSubledger getByIdTransSubledger(Long id);
	List<TransSubledger> getAllTransSubledger();
}
