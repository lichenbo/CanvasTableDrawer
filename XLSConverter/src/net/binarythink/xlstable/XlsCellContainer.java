package net.binarythink.xlstable;

import com.sun.xml.internal.ws.api.pipe.FiberContextSwitchInterceptor;
import jxl.*;
import jxl.format.*;
import jxl.format.Border;
import jxl.format.BorderLineStyle;
import jxl.format.CellFormat;
import jxl.write.*;
import jxl.write.biff.RowsExceededException;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.regex.Pattern;

/**
 * Created by lichenbo on 3/14/14.
 */
public class XlsCellContainer {
    private XlsCellContainer xlsCellContainer;
    private XlsCell[][] cellContainer;
    private WritableWorkbook workbook;
    private WritableSheet sheet;
    private int row, column;

    /* Singleton */
    private XlsCellContainer(int row, int column) {
        try {
        cellContainer = new XlsCell[row][column];
        workbook = Workbook.createWorkbook(new File("output.xls"));
        sheet = workbook.createSheet("sheet",0);
        } catch (IOException ioe) {
            ioe.printStackTrace();
        }
    }
    public XlsCellContainer getCellContainer(int row, int column) {
        if (xlsCellContainer == null) {
            xlsCellContainer = new XlsCellContainer(row, column);
        }
        return xlsCellContainer;
    }

    public void addCell(int x, int y, XlsCell cell) {
        cellContainer[x][y] = cell;
    }

    public void removeCell(int x, int y) {
        cellContainer[x][y] = null;
    }

    public XlsCell getCell(int x, int y) {
        return cellContainer[x][y];
    }

    public void buildTable() {
        for (int i = 0; i < row; i++)
            for (int j = 0; j < column; j++) {
                XlsCell curCell = cellContainer[i][j];
                if (curCell.mergeLeft()) {
                    curCell.setLeft(false);
                    if (j > 0) {
                        cellContainer[i][j-1].setRight(false);
                    }
                }
                if (curCell.mergeUp()) {
                    curCell.setTop(false);
                    if (i > 0) {
                        cellContainer[i-1][j].setBottom(false);
                    }
                }
            }
    }

    public void draw() {
        try {
        for (int i = 0; i < row; i++)
            for (int j = 0; j < column; j++) {
                XlsCell curCell = cellContainer[i][j];
                WritableCellFormat fCell = new WritableCellFormat();
                if (curCell.isTop()) {
                    fCell.setBorder(Border.TOP, BorderLineStyle.THIN);
                }
                if (curCell.isBottom()) {
                    fCell.setBorder(Border.BOTTOM, BorderLineStyle.THIN);
                }
                if (curCell.isLeft()) {
                    fCell.setBorder(Border.LEFT, BorderLineStyle.THIN);
                }
                if (curCell.isRight()) {
                    fCell.setBorder(Border.RIGHT, BorderLineStyle.THIN);
                }
                if (curCell.mergeRight() && j < column-1 && cellContainer[i][j+1].mergeLeft()) {
                    sheet.mergeCells(i,j,i,j+1);
                }
            }
        } catch (WriteException we) {
            we.printStackTrace();
        }
    }
}
