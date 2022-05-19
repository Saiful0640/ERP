package com.boot.payroll.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.boot.payroll.dao.GetCommonMonthlysalaryProcessDao;
import com.boot.payroll.dao.GetMonthlyAttendanceSteelDao;
import com.boot.payroll.dao.GetMonthlysalaryProcessDao;
import com.boot.payroll.dao.GetSalaryProcessMonthlyDao;
import com.boot.payroll.dao.UspGetIndividualsignCriteriaDao;
import com.boot.payroll.model.GetCommonMonthlysalaryProcess;
import com.boot.payroll.model.GetMonthlyAttendanceSteel;
import com.boot.payroll.model.GetMonthlysalaryProcess;
import com.boot.payroll.model.GetSalaryProcessMonthly;
import com.boot.payroll.model.UspGetIndividualsignCriteria;

@CrossOrigin(origins ="http://localhost:4200")
@RestController
@RequestMapping("/payroll")
public class PayrollCommonController {
	@Autowired
	UspGetIndividualsignCriteriaDao dao;
	@Autowired
	GetSalaryProcessMonthlyDao dao1;
	@Autowired
	GetMonthlyAttendanceSteelDao dao2;
	@Autowired
	GetCommonMonthlysalaryProcessDao dao3;
	@Autowired
	GetMonthlysalaryProcessDao dao4;
	
	@GetMapping("/UspGetIndividualsignCriteria/{ModuleID}/{DetailsID}/{MemberID}")
	public ResponseEntity<List<UspGetIndividualsignCriteria>> getUspGetIndividualsignCriteria(@PathVariable long ModuleID,@PathVariable long DetailsID,@PathVariable long MemberID) {
		List<UspGetIndividualsignCriteria> list=dao.getUspGetIndividualsignCriteria(ModuleID, DetailsID, MemberID);
		return ResponseEntity.ok(list);
	}
	@GetMapping("/GetSalaryProcessMonthly/{periodID}/{groupID}")
	public ResponseEntity<List<GetSalaryProcessMonthly>>getSalaryProcessMonthly(@PathVariable long periodID,@PathVariable long groupID) {
		List<GetSalaryProcessMonthly> list=dao1.getSalaryProcessMonthly(periodID, groupID);
		return ResponseEntity.ok(list);
	}
	@GetMapping("/GetMonthlyAttendanceSteel/{GroupID}/{SectionID}")
	public ResponseEntity<List<GetMonthlyAttendanceSteel>>getMonthlyAttendanceSteel(@PathVariable long GroupID,@PathVariable long SectionID) {
		List<GetMonthlyAttendanceSteel> list=dao2.getMonthlyAttendanceSteel(GroupID, SectionID);
		return ResponseEntity.ok(list);
	}
	@GetMapping("/GetCommonMonthlysalaryProcess/{periodID}/{GroupID}/{MemberID}")
	public ResponseEntity<List<GetCommonMonthlysalaryProcess>> getCommonMonthlysalaryProcess(@PathVariable long periodID,@PathVariable long 	GroupID,@PathVariable long departmentID) {
		List<GetCommonMonthlysalaryProcess> list=dao3.getCommonMonthlysalaryProcess(periodID, GroupID, departmentID);
		return ResponseEntity.ok(list);
	}
	@GetMapping("/GetMonthlysalaryProcess/{periodid}/{groupid}/{MemberID}")
	public ResponseEntity<List<GetMonthlysalaryProcess>> getMonthlysalaryProcess(@PathVariable long periodid,@PathVariable long groupid,@PathVariable long sectionid) {
		List<GetMonthlysalaryProcess> list=dao4.getMonthlysalaryProcess(periodid, groupid, sectionid);
		return ResponseEntity.ok(list);
	}
}
