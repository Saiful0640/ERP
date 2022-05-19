package com.boot.hr.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.boot.hr.dao.GetMonthlyAttendenceDao;
import com.boot.hr.dao.GetallemploymentInfoListDao;
import com.boot.hr.dao.MonthlyAttendanceAddEditDao;
import com.boot.hr.model.GetMonthlyAttendence;
import com.boot.hr.model.GetallemploymentInfoList;
import com.boot.hr.model.MenualAttendance;
import com.boot.hr.model.MonthlyAttendence;
import com.boot.hr.model.MonthlyAttendenceParam;

@CrossOrigin(origins ="http://localhost:4200")
@RestController
@RequestMapping("/MonthlyAttendance")
public class MonthlyAttendenceController {
	@Autowired
	GetMonthlyAttendenceDao getdao;
	@Autowired
	MonthlyAttendanceAddEditDao addeditdao;
	@Autowired
	GetallemploymentInfoListDao empmtdao;
	
	@PostMapping("/SaveMonthlyAttendance")
	public ResponseEntity<Boolean> SaveMonthlyAttendence(@RequestBody MonthlyAttendenceParam monthlyAttendance){
		addeditdao.saveMonthlyAttendence(monthlyAttendance);
		return ResponseEntity.ok(true);
	}
	
	@GetMapping("/GetMonthlyAttendence/{periodID}/{groupID}/{sectionID}")
	public ResponseEntity<List<GetMonthlyAttendence>> getMonthlyAttendence(@PathVariable long periodID, @PathVariable long groupID, @PathVariable long sectionID){
		List<GetMonthlyAttendence> list =getdao.getMonthlyAttendence(periodID, groupID, sectionID);
		return ResponseEntity.ok(list);
	}
	@GetMapping("/getallemploymentInfoList/{moduleid}/{groupid}/{sectionid}")
	public ResponseEntity<List<GetallemploymentInfoList>> getallemploymentInfoList(@PathVariable long moduleid, @PathVariable long groupid, @PathVariable long sectionid){
		List<GetallemploymentInfoList> list =empmtdao.getallemploymentInfoList(moduleid, groupid, sectionid);
		return ResponseEntity.ok(list);
	}
}
