package net.binarythink.xlstable;

/**
 * Created by lichenbo on 3/14/14.
 */
public class XlsCell {
    String content;
    int x, y;
    boolean top = true;
    boolean left = true;
    boolean bottom = true;
    boolean right = true;

    public boolean isTop() {
        return top;
    }

    public void setTop(boolean top) {
        this.top = top;
    }

    public boolean isLeft() {
        return left;
    }

    public void setLeft(boolean left) {
        this.left = left;
    }

    public boolean isBottom() {
        return bottom;
    }

    public void setBottom(boolean bottom) {
        this.bottom = bottom;
    }

    public boolean isRight() {
        return right;
    }

    public void setRight(boolean right) {
        this.right = right;
    }

    public void setContent(String content) {
        this.content = content;
    }


    public XlsCell(String content, int x, int y) {
        content = content;
        x = x;
        y = y;
    }

    public boolean mergeUp() {
        return content.contains("^");
    }
    public boolean mergeLeft() {
        return content.contains("<-");
    }

    public void draw() {
        // TODO: draw each cell
    }
}
