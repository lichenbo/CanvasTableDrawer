function drawdot(x,y,r){
cxt = document.getElementById("MyCanvas").getContext("2d");
	cxt.beginPath();
	cxt.arc(x,y,r,0,Math.PI*2,false);
	cxt.fillStyle="#0000FF";
	cxt.fill();
}
function drawline(x1,y1,x2,y2){
cxt = document.getElementById("MyCanvas").getContext("2d");
	cxt.beginPath();
	cxt.moveTo(x1,y1);
	cxt.lineTo(x2,y2);
	cxt.fillStyle="#000000";
	cxt.strokeStyle="#000000";
	cxt.stroke();
}
function drawlabel(x,y,text,size) {
cxt = document.getElementById("MyCanvas").getContext("2d");
	cxt.font = size.concat("px Courier");
	cxt.textAlign = "left";
	cxt.textBaseline = "top";
	cxt.fillText(text, x, y);
}
function drawtitle(x,y,text,size) {
	cxt = document.getElementById("MyCanvas").getContext("2d");
	cxt.font = size.concat("px Courier");
	cxt.textAlign = "center";
	cxt.textBaseline = "top";
	cxt.fillText(text, x, y);

}
