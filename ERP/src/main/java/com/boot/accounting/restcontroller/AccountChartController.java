package com.boot.accounting.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

@RestController
@RequestMapping("/accountchart")
public class AccountChartController {

	@Autowired
	private AccountChartService accountChartService;

	@PostMapping("/saveAccountChart")
	public ResponseEntity<AccountChart> saveAccountChart(@RequestBody AccountChart accountChart) {
		AccountChart savedAccountChart = accountChartService.saveAccountChart(accountChart);
		return ResponseEntity.ok(savedAccountChart);
	}

	@PutMapping("/updateAccountChart")
	public ResponseEntity<AccountChart> updateAccountChart(@RequestBody AccountChart accountChart) {
		AccountChart updatedAccountChart = accountChartService.updateAccountChart(accountChart);
		return ResponseEntity.ok(updatedAccountChart);
	}

	@GetMapping("/getAllBranch")
	public ResponseEntity<List<Branch>> getAllBranch() {
		List<Branch> list = accountChartService.getAllBranch();
		return ResponseEntity.ok(list);
	}

	@GetMapping("/getAllCurrencyList")
	public ResponseEntity<List<CurrencyInfo>> getAllCurrency() {
		List<CurrencyInfo> list = accountChartService.getAllCurrency();
		return ResponseEntity.ok(list);
	}

	@GetMapping("/getAllAccountChart")
	public ResponseEntity<List<AccountChart>> getAllAccountChart() {
		List<AccountChart> list = accountChartService.getAllAccountChart();
		return ResponseEntity.ok(list);
	}

	@GetMapping("/getAllGroupAccount")
	public ResponseEntity<List<AccountGroupType>> getAllAccountGroupType() {
		List<AccountGroupType> list = accountChartService.getAllAccountGroupType();
		return ResponseEntity.ok(list);
	}
}
