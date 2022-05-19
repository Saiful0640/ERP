package com.boot.accounting.service;

import java.util.List;

import com.boot.accounting.model.TransMasterAcc;


public interface TransMasterAccService {
	boolean saveTransMasterAcc(TransMasterAcc transMasterAcc);
	boolean updateTransMasterAcc(TransMasterAcc transMasterAcc);
	boolean deleteByIdTransMasterAcc(Long id);
	TransMasterAcc getByIdTransMasterAcc(Long id);
	List<TransMasterAcc> getAllTransMasterAcc();
}
