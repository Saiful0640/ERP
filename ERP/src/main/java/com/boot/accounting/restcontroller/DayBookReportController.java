package com.boot.accounting.restcontroller;

import java.util.List;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
 
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
import com.boot.accounting.repo.DaybookReportDao;
import com.lowagie.text.DocumentException;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/report")
public class DayBookReportController {
	@Autowired
	private DaybookReportDao dao;

	@GetMapping("/daybookReport/{startdate}/{enddate}/{vouchertype}/{accountid}")
	public ResponseEntity<List<DayBookReport>> findDaybookReport(@PathVariable String startdate,@PathVariable String enddate,@PathVariable String vouchertype,@PathVariable Long accountid) {
		List<DayBookReport> list=dao.getDayBookReport(startdate, enddate, vouchertype, accountid);
		return ResponseEntity.ok(list);
	}
	
	
	 @SuppressWarnings("static-access")
	@GetMapping("/daybook/export/pdf/{startdate}/{enddate}/{vouchertype}/{accountid}")
	    public ResponseEntity<InputStreamResource> exportToPDF(HttpServletResponse response,@PathVariable String startdate,@PathVariable String enddate,@PathVariable String vouchertype,@PathVariable Long accountid) throws DocumentException, IOException {
	        response.setContentType("application/pdf");
	        DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
	        String currentDateTime = dateFormatter.format(new Date());
	         
	        String headerKey = "Content-Disposition";
	        String headerValue = "attachment; filename=daybook_" + currentDateTime + ".pdf";
	        response.setHeader(headerKey, headerValue);
	         
	        List<DayBookReport> list=dao.getDayBookReport(startdate, enddate, vouchertype, accountid);
	         
	       DaybookPDFExporter exporter = new DaybookPDFExporter(list);
	       ByteArrayInputStream stram = exporter.export(response);
	       HttpHeaders headers= new HttpHeaders();
	       headers.add(headerKey, headerValue);
	       return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_PDF).body(new InputStreamResource(stram));
	         
	    }
}
