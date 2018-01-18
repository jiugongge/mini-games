//获取画板
var my = document.getElementById('myCanvas');
//获取画笔
var ctx = my.getContext('2d');
//选择颜色
var newColor;
//画笔粗细
var newNumber;
//橡皮擦宽度
var newEraser;
//调用方法
var name = 'freedomThread';
//鼠标按下时在画布的坐标
var startX, startY;
//滑动的实时坐标
var finishX, finishY;
//鼠标抬起的坐标
var finishX1, finishY1;
//清空按钮
$('#but').click(function() {
	//清除画布
	ctx.clearRect(0, 0, 1000, 700);
})
//直线按钮
$('#but1').click(function() {
	name = 'StraightLine';
})
//曲线按钮
$('#but2').click(function() {
	name = 'freedomThread';
})
//空心圆按钮
$('#but3').click(function() {
	name = 'hollowRound';
})
//实心圆按钮
$('#but4').click(function() {
	name = 'solidRound';
})
//空心矩形按钮
$('#but5').click(function() {
	name = 'hollowRectangle';
})
//实心矩形按钮
$('#but6').click(function() {
	name = 'solidRectangle';
})
//橡皮擦
$('#but7').click(function() {
	name = 'eraser';
})
//鼠标按下事件
my.onmousedown = function() {
	//计算坐标
	var e = event || window.event;
	//鼠标按下时在画布的坐标
	startX = e.clientX - my.offsetLeft;
	startY = e.clientY - my.offsetTop;
	newColor = $('#newColor')[0].value; //颜色
	newNumber = $('#newNumber')[0].value; //线条粗细
	newEraser = $('#newEraser')[0].value; //橡皮擦宽度
	switch(name) {
		case 'freedomThread': //自由画线
			ctx.beginPath(); //新路径
			ctx.lineWidth = newNumber; //粗细
			ctx.strokeStyle = newColor; //颜色
			ctx.moveTo(startX, startY); //初始点
			break;
	}
	//鼠标移动事件
	my.onmousemove = function() {
		var eT = event || window.event;
		//滑动的实时坐标
		finishX = eT.clientX - my.offsetLeft;
		finishY = eT.clientY - my.offsetTop;
		switch(name) {
			case 'freedomThread': //自由画线
				ctx.lineTo(finishX, finishY); //结束点
				ctx.stroke(); //绘制
				break;
			case 'eraser': //橡皮擦
				eraser();
				break;
		}
	}
}
//鼠标抬起事件
my.onmouseup = function() {
	my.onmousemove = null;
	var ei = event || window.event;
	//鼠标抬起的坐标
	finishX1 = ei.clientX - my.offsetLeft;
	finishY1 = ei.clientY - my.offsetTop;
	switch(name) {
		case 'StraightLine': //直线
			StraightLine();
			break;
		case 'hollowRound': //空心圆
			hollowRound();
			
			break;
		case 'solidRound': //实心圆
			solidRound();
			break;
		case 'hollowRectangle': //空心矩形
			hollowRectangle();
			break;
		case 'solidRectangle': //实心矩形
			solidRectangle();
			break;
	}
}
//直线
function StraightLine() {
	ctx.beginPath(); //新路径
	ctx.lineWidth = newNumber; //粗细
	ctx.strokeStyle = newColor; //颜色
	ctx.moveTo(startX, startY); //初始点
	ctx.lineTo(finishX1, finishY1); //结束点
	ctx.stroke(); //绘制
}
//空的圆
function hollowRound() {
	//计算半径
	var r = Math.sqrt(Math.pow(finishX1 - startX, 2) + Math.pow(finishY1 - startY, 2))/2;
	//圆心位置
	var rx = (finishX1 - startX) / 2 + startX;
	var ry = (finishY1 - startY) / 2 + startY;
	ctx.beginPath();
	ctx.lineWidth = newNumber; //粗细
	ctx.strokeStyle = newColor; //颜色
	ctx.arc(rx, ry, r, 0, Math.PI * 2)
	ctx.stroke();
}
//实心圆
function solidRound() {
	//计算半径
	var r = Math.sqrt(Math.pow(finishX1 - startX, 2) + Math.pow(finishY1 - startY, 2)) / 2;
	//圆心位置
	var rx = (finishX1 - startX) / 2 + startX;
	var ry = (finishY1 - startY) / 2 + startY;
	ctx.beginPath();
	ctx.fillStyle = newColor; //颜色
	ctx.arc(rx, ry, r, 0, Math.PI * 2)
	ctx.fill();
}
//空的矩形
function hollowRectangle() {
	//计算宽高
	var widthNew = finishX1 - startX;
	var heightNew = finishY1 - startY;
	ctx.beginPath();
	ctx.lineWidth = newNumber; //粗细
	ctx.strokeStyle = newColor; //颜色
	ctx.strokeRect(startX, startY, widthNew, heightNew)
	ctx.stroke();
}
//实心的矩形
function solidRectangle() {
	//计算宽高
	var widthNew = finishX1 - startX;
	var heightNew = finishY1 - startY;
	ctx.beginPath();
	ctx.lineWidth = newNumber; //粗细
	ctx.fillStyle = newColor; //颜色
	ctx.fillRect(startX, startY, widthNew, heightNew)
	ctx.fill();
}
//橡皮擦
function eraser() {
	ctx.beginPath();
	ctx.fillStyle = 'white'; //颜色
	ctx.arc(finishX, finishY, newEraser / 2, 0, Math.PI * 2)
	ctx.fill();
}
