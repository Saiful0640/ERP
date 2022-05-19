package com.boot.accounting.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.boot.accounting.model.AccountChart;
import com.boot.accounting.model.AccountGroupType;
import com.boot.accounting.model.Branch;
import com.boot.accounting.model.CurrencyInfo;
import com.boot.accounting.service.AccountChartService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/accountchart")
public class AccountChartController {
	@Autowired
	AccountChartService accountchartservice;
	//save
	@PostMapping("/saveAccountChart")
	public ResponseEntity<Boolean> saveAccountChart(@RequestBody AccountChart accountchart){
		accountchartservice.saveAccountChart(accountchart);
		return ResponseEntity.ok(true);
	}
	@PutMapping("/updateAccountChart")
	public ResponseEntity<Boolean> updateAccountChart(@RequestBody AccountChart accountchart){
		accountchartservice.updateAccountChart(accountchart);
		return ResponseEntity.ok(true);
	}
	@GetMapping("/getAllBranch")
	public ResponseEntity<List<Branch>> getAllBranch(){
		List<Branch> list = accountchartservice.getAllBranch(); 
		return ResponseEntity.ok(list);
	}
	@GetMapping("/getAllCurrencyList")
	public ResponseEntity<List<CurrencyInfo>> getAllCurrency(){
		List<CurrencyInfo> list = accountchartservice.getAllCurrency(); 
		return ResponseEntity.ok(list);
	}
	@GetMapping("/getAllAccountChart")
	public ResponseEntity<List<AccountChart>> getAllAccountChart(){
		List<AccountChart> list =accountchartservice.getAllAccountChart();
		return ResponseEntity.ok(list);
	}
	@GetMapping("/getAllGroupAccount")
	public ResponseEntity<List<AccountGroupType>> getAllAccountGroupType(){
		List<AccountGroupType> list =accountchartservice.getAllAccountGroupType();
		return ResponseEntity.ok(list);
	}
}
