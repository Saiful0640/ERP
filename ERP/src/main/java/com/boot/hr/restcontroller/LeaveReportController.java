package com.boot.hr.restcontroller;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.boot.accounting.model.DayBookReport;
import com.boot.accounting.model.DaybookPDFExporter;
import com.boot.hr.dao.LeaveReportDao;
import com.boot.hr.model.LeaveReport;
import com.boot.hr.model.LeaveReportPDFExporter;
import com.lowagie.text.DocumentException;

@CrossOrigin(origins ="http://localhost:4200")
@RestController
@RequestMapping("/leavereport")
public class LeaveReportController {
	@Autowired
	LeaveReportDao dao;
	
	@GetMapping("/getLeaveReport/{year}/{empCode}")
	public ResponseEntity<List<LeaveReport>> findDaybookReport(@PathVariable long year,@PathVariable String empCode) {
		List<LeaveReport> list=dao.getLeaveReport(year, empCode);
		return ResponseEntity.ok(list);
	}
	
	
	 @SuppressWarnings("static-access")
	@GetMapping("/LeaveReport/export/pdf/{year}/{empCode}")
	    public ResponseEntity<InputStreamResource> exportToPDF(HttpServletResponse response,@PathVariable long year,@PathVariable String empCode) throws DocumentException, IOException {
	        response.setContentType("application/pdf");
	        DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
	        String currentDateTime = dateFormatter.format(new Date());
	         
	        String headerKey = "Content-Disposition";
	        String headerValue = "attachment; filename=daybook_" + currentDateTime + ".pdf";
	        response.setHeader(headerKey, headerValue);
	        
	        List<LeaveReport> list=dao.getLeaveReport(year, empCode);	         
	        LeaveReportPDFExporter exporter = new LeaveReportPDFExporter(list);
	       ByteArrayInputStream stram = exporter.export(response);
	       HttpHeaders headers= new HttpHeaders();
	       headers.add(headerKey, headerValue);
	       return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_PDF).body(new InputStreamResource(stram));
	         
	    }
}
