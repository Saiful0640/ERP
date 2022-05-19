package com.boot.accounting.service;

import java.util.List;

import com.boot.accounting.model.TransCostCenter;

public interface TransCostCenterService {
	boolean saveTransCostCenter(TransCostCenter transCostCenter);
	boolean updateTransCostCenter(TransCostCenter transCostCenter);
	boolean deleteByIdTransCostCenter(Long id);
	TransCostCenter getByIdTransCostCenter(Long id);
	List<TransCostCenter> getAllTransCostCenter();
}
