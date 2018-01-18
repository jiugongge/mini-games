


//随机数函数
function sui(x, y) {
	return Math.floor(Math.random() * (y - x) + x);
}

//生成二维数组,创建游地图
var arr = [];

function erwei() {
	for(var i = 0; i < 20; i++) {
		var arr1 = [];
		for(var j = 0; j < 40; j++) {
			var divNew = document.createElement('div'); //创建一个div
			$('#box2')[0].appendChild(divNew); //插入box2里面
			arr1.push(divNew);
		}
		arr.push(arr1);
	}
	return arr;
}
erwei();

//蛇的初始数组
var ele = [arr[3][0], arr[3][1], arr[3][2]];

//蛇头的位置
var d = 2; //X轴的位置
var c = 3; //Y轴的位置

//设置蛇的初始位置
function she() {
	//蛇身颜色
	for(var j = 0; j < ele.length - 1; j++) {
		ele[j].style.background = 'green';
	}
	//蛇头颜色
	ele[ele.length - 1].style.background = 'yellow';
}

//设置投食
var aX; //X轴的位置
var aY; //Y轴的位置

function shiwu() {
	aX = sui(0, 40); //调用随机函数
	aY = sui(0, 20);
	//判断投食位置（不能和蛇的位置重叠）
	if($.inArray(arr[aY][aX], ele) == -1) {
		arr[aY][aX].style.background = 'yellow';
	} else {
		shiwu(); //重叠从新调用（投食）
	}
}


//蛇移动
function yidong() {
	$('#box2 div').css({
		'background': '#F08080'
	}); //清除蛇走过的路径的颜色
	arr[aY][aX].style.background = 'yellow'; //食物的位置
	eat(); //判断吃食
	she(); //创建新的蛇
}

//初始分值
var num = 0;
//历史最高分
var maxNum = 94;
//蛇吃食
function eat() {
	//碰撞(吃到食物)
	if(arr[aY][aX] == ele[ele.length - 1]) {
		ele.push(arr[c][d]); //蛇数组尾部添加一个元素（蛇头添加）
		num += 1; //得分加一
		$('#box').text('得分：' + num); //得分输出页面
		$('#audo').attr('src','audio/chi01.mp3');
		shiwu(); //从新投食
	} else {
		ele.shift() & ele.push(arr[c][d]); //蛇数组头部删除一个元素，尾部添加一个元素
	}
}
//开始游戏函数
function kaishi(){
	$('#uu').attr('src','audio/b03.mp3');
	//开始框消失
	$('#go').css('display', 'none');
	//按钮打开
	kai = 0;
	//创建蛇
	she();
	//创建食物
	shiwu();
}
//点击开始游戏按钮
$('#btn3').click(function() {
	kaishi()
})
//结束函数（碰死了）
function jieshu() {
	$('#finish').css('display', 'block')
	maxNum = num > maxNum ? num : maxNum;
	$('#sp1').text(maxNum); //最高分
	$('#sp2').text(num); //得分
	kai = 1; //按钮关闭
	$('#si').attr('src','audio/si.mp3');
	$('#uu').attr('src','');
}
//重新开始
$('#btn1').click(function() {
	//清空页面得分
	$('#box').text('得分：0');
	//初始页面背景
	$('#box2 div').css({
		'background': '#F08080'
	});
	//初始蛇的数组
	ele = [arr[3][0], arr[3][1], arr[3][2]];
	//初始蛇的位置
	she();
	//初始得分
	num = 0;
	//调用投食函数
	shiwu()
	//初始蛇头的位置
	d = 2; //X轴的位置
	c = 3; //Y轴的位置
	//按钮打开
	kai = 0;
	//初始开关
	cba = 39
	//开启音乐
	$('#uu').attr('src','audio/b03.mp3');
	//结束框消失
	$('#finish').css('display', 'none');

});
//结束游戏
$('#btn2').click(function() {
	window.close();//退出页面
})

//蛇向左运动
var leftNew; //向左运动计时器
function left() {
	leftNew = setInterval(function() {
		d--; //向左前进
		if(d < 0) { //撞墙
			clearInterval(leftNew); //清除计时器。
			jieshu();//结束函数
		} else if($.inArray(arr[c][d], ele) != -1) {//撞到身体
			clearInterval(leftNew); //清除计时器。
			jieshu();//结束函数
		} else {
			yidong(); //移动函数
		}
	}, 100)
}

//蛇向右运动
var rightNew; //向右运动计时器
function right() {
	rightNew = setInterval(function() {
		d++; //向右前进
		if(d > 39) {//撞墙
			clearInterval(rightNew); //清除计时器。
			jieshu();//结束函数
		} else if($.inArray(arr[c][d], ele) != -1) {//撞到身体
			clearInterval(rightNew); //清除计时器。
			jieshu();//结束函数
		} else {
			yidong(); //移动函数
		}
	}, 100);
}

//蛇向下运动
var downNew; //向下运动计时器。
function down() {
	downNew = setInterval(function() {
		c++; //向下前进
		if(c > 19) {//撞墙
			clearInterval(downNew); //清除计时器。
			jieshu();//结束函数
		} else if($.inArray(arr[c][d], ele) != -1) {//撞到身体
			clearInterval(downNew); //清除计时器。
			jieshu();//结束函数
		} else {
			yidong(); //移动函数
		}

	}, 100)
}

//蛇向上运动
var upNew; //向上运动计时器。
function up() {
	upNew = setInterval(function() {
		c--; //向下前进
		if(c < 0) {//撞墙
			clearInterval(upNew); //清除计时器。
			jieshu();//结束函数
		} else if($.inArray(arr[c][d], ele) != -1) {//撞到身体
			clearInterval(upNew); //清除计时器。
			jieshu();//结束函数
		} else {
			yidong(); //移动函数
		}

	}, 100)
}

//键盘事件
var cba = 39; //初始不能向左移动
var asd =0;//不能重复按键
var kai = 1; //按钮开关
document.onkeydown = function() {
	var e = event || window.event;
	var num = e.keyCode;
	$('#ads').attr('src','audio/ad.mp3');
	//向左移动
	if(asd != 37 & cba != 39 & num == 37 & kai == 0) {
		clearInterval(upNew); //清除向上计时器。
		clearInterval(downNew); //清除向下计时器。
		clearInterval(rightNew); //清除向右计时器。
		left();//向左移动函数
		cba = 37;
		asd =37;
	}
	//向上移动
	if(asd != 38 & cba != 40 & num == 38 & kai == 0) {
		clearInterval(downNew); //清除向下计时器。
		clearInterval(leftNew); //清除向左计时器。
		clearInterval(rightNew); //清除向右计时器。
		up();//向上移动函数
		cba = 38;
		asd =38;
	}
	//向右移动
	if(asd != 39 & cba != 37 & num == 39 & kai == 0) {
		clearInterval(upNew); //清除向上计时器。
		clearInterval(downNew); //清除向下计时器。
		clearInterval(leftNew); //清除向左计时器。
		right();//向右移动函数
		cba = 39;
		asd =39;
	}
	//向下移动
	if(asd != 40 & cba != 38 & num == 40 & kai == 0) {
		clearInterval(upNew); //清除向上计时器。
		clearInterval(leftNew); //清除向左计时器。
		clearInterval(rightNew); //清除向右计时器。
		down();//向下移动函数
		cba = 40;
		asd =40;
	}
}