package com.boot.accounting.service;

import java.util.List;

import com.boot.accounting.model.ChequeBook;

public interface ChequeBookService {
	boolean saveChequeBook( ChequeBook  chequeBook);
	boolean updateChequeBook (ChequeBook  chequeBook);
	boolean deleteByIdChequeBook(Long id);
	ChequeBook getByIdChequeBook(Long id);
	List<ChequeBook> getAllChequeBook();
}
