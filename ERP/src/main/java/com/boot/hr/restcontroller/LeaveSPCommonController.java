package com.boot.hr.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.boot.hr.dao.GetLeaveBalanceByMemberCodeDao;
import com.boot.hr.dao.GetLeaveByGenderDao;
import com.boot.hr.dao.GetLeaveInformationByMemberCodeDao;
import com.boot.hr.dao.LeaveTypeByGetValuDao;
import com.boot.hr.model.GetLeaveBalanceByMemberCode;
import com.boot.hr.model.GetLeaveByGender;
import com.boot.hr.model.GetLeaveInformationByMemberCode;
import com.boot.hr.model.LeaveTypeByGetValu;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/LeaveEntry")
public class LeaveSPCommonController {
	@Autowired
	GetLeaveBalanceByMemberCodeDao getleavebalancedao;
	
	@Autowired
	GetLeaveByGenderDao getleavegenderdao;
	
	@Autowired
	GetLeaveInformationByMemberCodeDao leaveinfobymembercodedao;
	
	@Autowired
	LeaveTypeByGetValuDao leavetypegetdao;
	
	@GetMapping("/GetLeaveBalanceByMemberCode/membercode/{membercode}/leaveyear/{leaveyear}")
	public ResponseEntity<List<GetLeaveBalanceByMemberCode>>getAllLeaveBalanceByMemberCode(@PathVariable String membercode,@PathVariable String leaveyear) {
		List<GetLeaveBalanceByMemberCode>list=getleavebalancedao.getAllLeaveBalanceByMemberCode(membercode, leaveyear);
		return ResponseEntity.ok(list);
	}
	@GetMapping("/getAllLeaveByGender/{membercode}")
    public ResponseEntity<List<GetLeaveByGender>>getAllLeaveByGender(@PathVariable String membercode){
		List <GetLeaveByGender> list = getleavegenderdao.getAllLeaveByGender(membercode);
    	return ResponseEntity.ok(list);
    }
	@GetMapping("/GetLeaveInformationByMemberCode/{membercode}")
    public ResponseEntity<List<GetLeaveInformationByMemberCode>>getAllGetLeaveInformationByMemberCode(@PathVariable String membercode){
		List <GetLeaveInformationByMemberCode> list = leaveinfobymembercodedao.getAllGetLeaveInformationByMemberCode(membercode);
    	return ResponseEntity.ok(list);
    }
	@GetMapping("/LeaveTypeByGetValu/{gradevalue}")
    public ResponseEntity<List<LeaveTypeByGetValu>>getAllLeaveTypeByGetValu(@PathVariable int gradevalue){
		List <LeaveTypeByGetValu> list = leavetypegetdao.getAllLeaveTypeByGetValu(gradevalue);
    	return ResponseEntity.ok(list);
    }
	
}
