

//获取元素
var wrap =document.getElementById('wrap');//游戏容器
var scoreDiv = document.getElementById('score');//得分
var pipeWrap = document.getElementById('pipeWrap');//管道显示容器
var bird = document.getElementById('bird');//飞翔的小鸟
var kaishi = document.getElementById('gameStart');//开始显示页面
var newkai = document.getElementById('img_b');//开始按钮
var jieshu = document.getElementById('gameOver');//结束显示页面
var df = document.getElementById('game_r');//游戏得分
var newdf = document.getElementById('game_u');//最高纪录
var okNew = document.getElementById('game_s');//结束ok按钮

//声明变量
var downTimer; //下降计时器
var upTimer; //上升计时器
var xiajiang; //下降姿态计时器
var shangsheng; //上升姿态计时器
var creatpipeTimer; //创建管道计时器
var rt =1;//每个管道计时器的开关（关）
var xj = 0; //下降姿态开关（开）
var ss = 0; //上升姿态开关（开）
var ff = 1; //点击上升开关（关）
var score = 0; //初始得分值
var maxNew = 0;//初始最大记录值

//随机数函数
function sui(x, y) {
	return Math.round(Math.random() * (y - x) + x);
}


//飞翔的小鸟（一直掉落）
function feixiang() {
	clearInterval(shangsheng); //清除上升姿态计时器
	xiajiang = setInterval(function() {
		//下降飞行姿态
		if(xj == 0) {
			bird.style.background = 'url(img2/down_bird0.png)'
			xj = 1;
		} else {
			bird.style.background = 'url(img2/down_bird1.png)'
			xj = 0;
		}
	}, 100)
	//小鸟下落函数
	downTimer = setInterval(function() {
		bird.style.top = bird.offsetTop + 3 + 'px';
		//判断小鸟的位置（掉地）
		if(bird.offsetTop >= 470) {
			clearInterval(downTimer); //清除下降计时器
			clearInterval(xiajiang); //清除下降姿态计时器
			//调用游戏结束
			jieshuk();
		}
	}, 30)
}


//点击wrap时，小鸟的姿态和位置
wrap.onclick = function() {
	if(ff == 0) {
		var i = 0;//上升距离变量
		clearInterval(shangsheng); //清除上升姿态计时器
		clearInterval(downTimer); //清除下降计时器
		clearInterval(upTimer); //清除上升计时器
		clearInterval(xiajiang); //清除下降姿态计时器
		//判断上升姿态
		shangsheng = setInterval(function() {
			//上升飞行姿态
			if(ss == 0) {
				bird.style.background = 'url(img2/up_bird0.png)'
				ss = 1;
			} else {
				bird.style.background = 'url(img2/up_bird1.png)'
				ss = 0;
			}
		}, 100)
		//上升距离控制
		upTimer = setInterval(function() {
			clearInterval(downTimer); //清除下降计时器
			i++;
			bird.style.top = bird.offsetTop - 4 + 'px'; //点击上升
			//每次上升距离
			if(i > 20) {
				clearInterval(upTimer); //清除上升计时器
				clearInterval(downTimer); //清除下降计时器
				clearInterval(shangsheng); //清除上升姿态计时器
				clearInterval(xiajiang); //清除下降姿态计时器
				feixiang(); //调用下降函数。
			}
			//最大上升距离
			if(bird.offsetTop < 0) { //判断最高高度(挨顶时)
				clearInterval(upTimer); //清除上升计时器
				clearInterval(downTimer); //清除下降计时器
				clearInterval(shangsheng); //清除上升姿态计时器
				clearInterval(xiajiang); //清除下降姿态计时器
				feixiang(); //调用下降函数。
			}

		}, 20)

	}
}


//显示得分数
function calcScore() {
	var scoreArr = String(score).split(''); //将分数转换成分数数组。
	for(var i = 0; i < scoreArr.length; i++) {
		var newImg = new Image(); //创建图片
		newImg.src = 'img2/' + scoreArr[i] + '.jpg'; //拼接路径
		scoreDiv.appendChild(newImg); //将得分图片插入页面
	}

}

//创建管道
function careatepPipe() {
	var topHeight = sui(60, 283); //上部分高度（随机）
	var bottomHeight = 493 - topHeight - 150; //下部分高度（计算）
	var onepipe = document.createElement('div'); //创建管道
	onepipe.className = 'pipe'; //声明class名称
	onepipe.innerHTML = '<div class="topItem" style="height:' + topHeight + 'px;"><span class="topHead"></span></div><div class="bottomItem"style="height:' + bottomHeight + 'px;"><span class="bottomHead" ></span></div>';

	//每个管道都有自己的left累减的计时器
	onepipe.leftTimer = setInterval(function() {
		onepipe.style.left = onepipe.offsetLeft - 4 + 'px';
		
		//根据管道的left值，计算分数累加
		if(80 == onepipe.offsetLeft + onepipe.offsetWidth) {
			scoreDiv.innerHTML = ''; //清空页面元素，避免累加
			score++; //得分累加
			calcScore(); //调用计分函数
		}

		//管道移出时，清除
		if(onepipe.offsetLeft <= -onepipe.offsetWidth) {
			clearInterval(onepipe.leftTimer); //清除计时器
			onepipe.remove(); //移出此节点
		}
		if(rt==0){
			clearInterval(onepipe.leftTimer); //清除计时器
		}
		//碰撞判断
		var pipesObj = document.querySelectorAll('.pipe>div'); //集合
		for(var j = 0; j <pipesObj.length; j++) {
			if(bird.offsetLeft + bird.offsetWidth >= pipesObj[j].parentNode.offsetLeft && bird.offsetHeight + bird.offsetTop >= pipesObj[j].offsetTop && bird.offsetLeft <=pipesObj[j].parentNode.offsetLeft + pipesObj[j].offsetWidth && bird.offsetTop <= pipesObj[j].offsetTop + pipesObj[j].offsetHeight) {
				//调用游戏结束
				jieshuk();
			}

		}
	}, 20)
	pipeWrap.appendChild(onepipe); //创建的管道插入pipeWrap元素中

}


//每隔一段时间，调用一次创建管道函数
function guangdao() {
	creatpipeTimer = setInterval(function() {
		careatepPipe()
	}, 1300)
}


//结束函数
function jieshuk() {
	clearInterval(creatpipeTimer); //清除创建管道计时器
	clearInterval(downTimer); //清除下降计时器
	clearInterval(upTimer); //清除上升计时器
	clearInterval(shangsheng); //清除上升姿态计时器
	clearInterval(xiajiang); //清除下降姿态计时器
	ff = 1; //点击开关（关）
	rt = 0;//管道计时器（开）
	scoreDiv.innerHTML = '';//清空得分
	jieshu.style.display = 'block'; //显示结束页面
	bird.style.display = 'none'; //游戏结束，小鸟消失
	df.innerText = score; //输出分数
	maxNew =  maxNew>score?  maxNew:score;//最高记录得分
	newdf.innerText=maxNew;//输出最高记录得分
}

//点击ok
okNew.onclick = function() {
	score = 0; //清空计分
	pipeWrap.innerHTML = ''; //清空所有管道
	scoreDiv.innerHTML = '<img src="img2/0.jpg" />'; //显示分数为零
	kaishi.style.display = 'block'; //开始画面显示
	jieshu.style.display = 'none'; //结束画面消失
	
}






//点击开始
newkai.onclick = function() {

	kaishi.style.display = 'none'; //开始框消失
	bird.style.display = 'block'; //游戏开始，小鸟出现
	feixiang(); //小鸟掉落函数
	guangdao(); //管道创建函数
	ff = 0; //点击开关开
	rt = 1;//管道计时器（关）
}




