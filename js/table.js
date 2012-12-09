function buildTable(strtable,font_s) {
	i = 0;
	rowNumber = 0;
	colNumber = 0;
	font_size = font_s;
	height = calHeight(font_size);
	dataArray = new Array();
	rowArray = new Array();
	cellArray = new Array();
	strtable = getRidOfLastLF(strtable);		//Remove the redundant Line Feeds.
	buildStruct(strtable);
	buildStructMerge();
	buildCellArray();
	buildRowArray();
	buildWidth();
	draw();
	pause();

}
function setSize(size){
	font_size = size;
}
function Cell(value) {
	this.value = value;
	this.borderTop = true;
	this.borderLeft = true;
	this.borderBottom = true;
	this.borderRight = true;
	this.width = 0;
	this.x = 0;
	this.y = 0;
}
function buildCellArray() {
	var current_row, current_col;
	for (current_row = 0; dataArray[current_row]!=null; current_row = current_row + 1) {
		cellArray[current_row] = new Array();
		for(current_col = 0; dataArray[current_row][current_col]!=null; current_col = current_col + 1){
			current_value = dataArray[current_row][current_col];
			cellArray[current_row][current_col] = new Cell(restore(current_value));
			if (mergeLeft(current_row,current_col)){
				cellArray[current_row][current_col].borderLeft = false;
			}
			if (mergeUp(current_row,current_col)){
				cellArray[current_row][current_col].borderTop = false;
			}
			if (mergeRight(current_row,current_col)){
	 			cellArray[current_row][current_col].borderRight = false;
			}
			if (mergeDown(current_row,current_col)){
				cellArray[current_row][current_col].borderBottom = false;
			}
		}
	}
}
function restore(value) {
	var result = "";
	result = value.substring((value.indexOf("^") + 1));
	if (result.indexOf("<-")!=-1)
		result = result.substring((result.indexOf("<-")) + 2);
	return result;
}
function mergeLeft(row,col) {
	if (dataArray[row][col].indexOf("<-") != -1)
		return true;
	return false;
}
function mergeUp(row,col) {
	if (dataArray[row][col].indexOf("^") != -1)
		return true;
	return false;
}

function mergeRight(row,col) {
	if (dataArray[row][col+1]!= null && mergeLeft(row,col+1))
		return true;
	return false;
}
function mergeDown(row,col) {
	if (dataArray[row+1]!= null && mergeUp(row+1,col))
		return true;
	return false;
}
function buildStructMerge() {
	var current_row,current_col;
	for (current_row = 0; dataArray[current_row]!=null; current_row = current_row + 1) {
		for(current_col = 0; dataArray[current_row][current_col]!=null; current_col = current_col + 1){
			if (mergeUp(current_row,current_col) && !mergeLeft(current_row,current_col) && current_row > 0 && mergeLeft(current_row-1,current_col) && current_col > 0 && mergeUp(current_row, current_col-1))	
				dataArray[current_row][current_col] = "<-".concat(dataArray[current_row][current_col]);
			if (mergeLeft(current_row,current_col) && !mergeUp(current_row,current_col) && current_row > 0 && mergeLeft(current_row-1,current_col) && current_col > 0 && mergeUp(current_row, current_col-1))
				dataArray[current_row][current_col] = "^".concat(dataArray[current_row][current_col]);
		}
	}
}
function buildStruct(strtable){
	var current_row = 0;
	var current_col = 0;
	dataArray[current_row] = new Array();
	dataArray[current_row][current_col] = "";
	while ((current_char = strtable.charAt(i))!="") {
		if(current_char == '\n') {
			current_row = current_row + 1;
			current_col = 0;
			dataArray[current_row] = new Array();
			dataArray[current_row][0] = ""; 
		}
		else if(current_char == ',') {
			current_col = current_col + 1;
			dataArray[current_row][current_col] = "";
		}
		else {
			dataArray[current_row][current_col] = dataArray[current_row][current_col].concat(current_char);
		}
		i = i + 1;
	}
	colNumber = current_col + 1;
	rowNumber = current_row + 1;
}
function buildRowArray() {
	var current_col = 0;
	var current_row = 0;
	for (current_col = 0; dataArray[0][current_col]!= null; current_col = current_col + 1){
		var max_length = 0;
		for (current_row = 0; dataArray[current_row]!=null;current_row = current_row + 1) {
			if (strLen(dataArray[current_row][current_col]) > max_length)
				max_length = strLen(cellArray[current_row][current_col].value);
		}
		rowArray[current_col] = max_length;
	}
}
function getRidOfLastLF(str) {
	while(str.charAt(str.length - 1) == '\n')
		str = str.substring(0,str.length-1);
	return str;
}
function calHeight(font_size){
	return 1.6*parseInt(font_size) ;

}
function buildWidth() {
	for (current_row = 0; dataArray[current_row]!=null; current_row = current_row + 1) {
		for(current_col = 0; dataArray[current_row][current_col]!=null; current_col = current_col + 1){
			cellArray[current_row][current_col].width = rowArray[current_col];
			if (current_col == 0) 
				cellArray[current_row][current_col].x = 0;
			else
				cellArray[current_row][current_col].x = cellArray[current_row][current_col-1].x + getDrawWidth(current_row,current_col-1);	// Set x coordinate of the cell.
			cellArray[current_row][current_col].y = current_row * height;
		}
	}
}
function getDrawWidth(row,col) {
	var result = 10 + cellArray[row][col].width  * font_size * 0.8 + 10;
	return result;
}
function draw() {
	ocanvas = document.getElementById("MyCanvas");
	ocanvas.width = 0;
	for (i = 0; i < colNumber; i++){
		ocanvas.width = ocanvas.width + getDrawWidth(0,i);}
	ocanvas.height = height * rowNumber;
	drawBegin();
	var oImgPNG = Canvas2Image.saveAsPNG(ocanvas,true);
	oImgPNG.id = "canvasimage";
	oImgPNG.style.border = ocanvas.style.border;
	ocanvas.parentNode.replaceChild(oImgPNG,document.getElementById("canvasimage"));
}
function drawBegin(){
	for (current_row = 0; dataArray[current_row]!=null; current_row = current_row + 1) {
		for(current_col = 0; dataArray[current_row][current_col]!=null; current_col = current_col + 1){
			var cell = cellArray[current_row][current_col];
			if (cell.borderTop == true)
				drawline(cell.x, cell.y, cell.x + getDrawWidth(current_row,current_col), cell.y);
			if (cell.borderLeft == true)
				drawline(cell.x, cell.y, cell.x, cell.y + height);
			if (cell.borderBottom == true)
				drawline(cell.x, cell.y + height, cell.x + getDrawWidth(current_row,current_col), cell.y + height);
			if (cell.borderRight == true)
				drawline(cell.x + getDrawWidth(current_row,current_col), cell.y, cell.x + getDrawWidth(current_row,current_col), cell.y + height);
			drawlabel(cell.x+0.4*parseInt(font_size),cell.y+0.2*parseInt(font_size),cell.value,font_size);
		}
	}
}
function strLen(str) {
	var len = 0;
	for (var i = 0; i < str.length; i++){
		if (str.charCodeAt(i) > 255)
			len = len + 2;
		else
			len = len + 1;
	}
	return len;

}
function pause() {
	// For debugging use

}
