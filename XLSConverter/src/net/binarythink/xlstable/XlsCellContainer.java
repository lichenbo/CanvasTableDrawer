package net.binarythink.xlstable;

import java.util.ArrayList;

/**
 * Created by lichenbo on 3/14/14.
 */
public class XlsCellContainer {
    private XlsCellContainer xlsCellContainer;
    private XlsCell[][] cellContainer;
    private int row, column;

    /* Singleton */
    private XlsCellContainer(int row, int column) {
        cellContainer = new XlsCell[row][column];
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
}
