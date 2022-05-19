package com.boot.accounting.service;

import java.util.List;

import com.boot.accounting.model.TransDetailAcc;

public interface TransDetailAccService {
	boolean saveTransDetailAcc(TransDetailAcc transDetailAcc);
	boolean updateTransDetailAcc(TransDetailAcc transDetailAcc);
	boolean deleteByIdTransDetailAcc(Long id);
	TransDetailAcc getByIdTransDetailAcc(Long id);
	List<TransDetailAcc> getAllTransDetailAcc();
}
