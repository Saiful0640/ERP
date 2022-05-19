package com.boot.accounting.model;
import java.awt.Color;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import com.lowagie.text.*;
import com.lowagie.text.pdf.*;
public class DaybookPDFExporter {
	@SuppressWarnings("unused")
	private static List<DayBookReport> daybooklist;
    
    @SuppressWarnings("static-access")
	public DaybookPDFExporter(List<DayBookReport> daybooklist) {
        this.daybooklist = daybooklist;
    }
 
    private static void writeTableHeader(PdfPTable table) {
        PdfPCell cell = new PdfPCell();
        cell.setBackgroundColor(Color.BLUE);
        cell.setPadding(5);
         
        Font font = FontFactory.getFont(FontFactory.HELVETICA);
        font.setColor(Color.WHITE);
        cell.setPhrase(new Phrase("VoucherDate", font));
        table.addCell(cell);
        
        cell.setPhrase(new Phrase("AccountName", font));
         
        table.addCell(cell);
         
        cell.setPhrase(new Phrase("VoucherType", font));
        table.addCell(cell);
        
        cell.setPhrase(new Phrase("FormateVoucherNo", font));
        table.addCell(cell); 
         
        cell.setPhrase(new Phrase("TotalAmount", font));
        table.addCell(cell); 
        
     
         
       
    }
     
    private static void writeTableData(PdfPTable table) {
        try {
			for (DayBookReport daybook : daybooklist) {
				 table.addCell(String.valueOf(daybook.getVoucherdate()));
			     table.addCell(String.valueOf(daybook.getAccountname()));
			    table.addCell(String.valueOf(daybook.getVouchertype()));
			    table.addCell(String.valueOf(daybook.getFormatevoucherno()));
			    table.addCell(daybook.getTotalamount().toString());
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
           font.setColor(Color.BLUE);
            
           Paragraph p = new Paragraph("Report of Daybook", font);
           p.setAlignment(Paragraph.ALIGN_CENTER);
            
           document.add(p);
            
           PdfPTable table = new PdfPTable(5);
           table.setWidthPercentage(100f);
           table.setWidths(new float[] {1.5f, 3.5f, 3.0f, 3.0f, 1.5f});
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
