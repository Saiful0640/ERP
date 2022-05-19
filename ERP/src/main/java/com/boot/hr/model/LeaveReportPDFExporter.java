package com.boot.hr.model;

import java.awt.Color;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import com.boot.accounting.model.DayBookReport;
import com.lowagie.text.Document;
import com.lowagie.text.DocumentException;
import com.lowagie.text.Font;
import com.lowagie.text.FontFactory;
import com.lowagie.text.PageSize;
import com.lowagie.text.Paragraph;
import com.lowagie.text.Phrase;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;

public class LeaveReportPDFExporter {
	@SuppressWarnings("unused")
	private static List<LeaveReport> leavelist;
    
    @SuppressWarnings("static-access")
	public LeaveReportPDFExporter(List<LeaveReport> leavelist) {
        this.leavelist = leavelist;
    }
 
    private static void writeTableHeader(PdfPTable table) {
        PdfPCell cell = new PdfPCell();
        cell.setBackgroundColor(Color.BLUE);
        cell.setPadding(6);
         
        Font font = FontFactory.getFont(FontFactory.HELVETICA);
        font.setColor(Color.WHITE);
        cell.setPhrase(new Phrase("ApplyDate", font));
        table.addCell(cell);
        
        cell.setPhrase(new Phrase("LeaveCategory", font));
         
        table.addCell(cell);
         
        cell.setPhrase(new Phrase("StartDate", font));
        table.addCell(cell);
        
        cell.setPhrase(new Phrase("EndDate", font));
        table.addCell(cell); 
         
        cell.setPhrase(new Phrase("Total", font));
        table.addCell(cell); 
        
        cell.setPhrase(new Phrase("LeaveReson", font));
        table.addCell(cell); 
         
       
    }
     
    private static void writeTableData(PdfPTable table) {
        try {
			for (LeaveReport leavereport : leavelist) {
				 table.addCell(String.valueOf(leavereport.getApplicationDate()));
			     table.addCell(String.valueOf(leavereport.getTypeName()));
			    table.addCell(String.valueOf(leavereport.getsDate()));
			    table.addCell(String.valueOf(leavereport.geteDate()));
			    table.addCell(String.valueOf(leavereport.getTotalDays()));
			    table.addCell(leavereport.getReason().toString());
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    }
     
    public static ByteArrayInputStream export(HttpServletResponse response) throws DocumentException, IOException {
        Document document = new Document(PageSize.A4);
        ByteArrayOutputStream out=new ByteArrayOutputStream();
        PdfWriter.getInstance(document, out);
         
       try {
    	   document.open();
           Font font = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
           font.setSize(18);
           font.setColor(Color.CYAN);
           Font font1 = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
           font1.setSize(18);
           font1.setColor(Color.CYAN);
           Paragraph p1 = new Paragraph("XyZ Limited", font1);
           p1.setAlignment(Paragraph.ALIGN_CENTER);
            
           Paragraph p = new Paragraph("Report of Leave", font);
           p.setAlignment(Paragraph.ALIGN_CENTER);
            
           document.add(p);
            
           PdfPTable table = new PdfPTable(6);
           table.setWidthPercentage(100f);
           table.setWidths(new float[] {1.5f, 3.5f, 3.0f, 3.0f, 1.5f,1.5f});
           table.setSpacingBefore(10);
            
           writeTableHeader(table);
           writeTableData(table);
            
           document.add(table);
           document.close();
       }catch(DocumentException ex){
    	   ex.printStackTrace();
       }
         return new ByteArrayInputStream(out.toByteArray());
    }
}
