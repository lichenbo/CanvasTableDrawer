package net.binarythink.xlstable;
import java.io.File;
import java.io.IOException;
import jxl.*;
import jxl.write.*;

/**
 * Created by lichenbo on 3/13/14.
 */
public class XlsTest {
    public void run() {
        try {
            WritableWorkbook workbook = Workbook.createWorkbook(new File("test.xls"));
            WritableSheet sheet = workbook.createSheet("sheet",0);
            Cell a1 = sheet.getCell(0,0);
            String stringa1 = a1.getContents();
            System.out.println(stringa1);
            Label label = new Label(0,2,"A label record");
            sheet.addCell(label);
            workbook.write();
            workbook.close();
        } catch (Exception e) {
            System.out.println("File not found");
            e.printStackTrace();
        }
    }
}
