function getAngle(element,ang){
	//获取角度
	if(arguments.length == 1){
		var angle = element.style.transform;
		angle = parseInt(angle.substring(7,angle.length));
		return angle;
	}
	//改变角度
	if(arguments.length == 2){
		element.style.transform = "rotate(" + ang + "deg)";
	}
}

//获取id
function $(id_selector) {
    return document.getElementById(id_selector.substring(1, id_selector.length));
}

//改变方向
function changeDirection(direction){
    var oBlock = $('#block');
    //获取方向
    var dir = (direction === 'left') ? 90 : (-90);
    //获取角度
    var angleNow = getAngle(oBlock) + dir;
    //改变角度
    getAngle(oBlock,angleNow); 
}

//前进事件
function moveGo(){
	var oBlock = $('#block');
	var angle = getAngle(oBlock);
	var top = parseInt(oBlock.style.top);
	console.log(top);
	var left = parseInt(oBlock.style.left);
	console.log(left);
	angle = (angle % 360 >= 0) ? (angle%360): (angle+360);
	console.log(angle);
	switch(angle){
		case 0: if(top>=50){oBlock.style.top = (top - 50) + "px";};
		break;
		case 90: if(left<=400){oBlock.style.left = (left + 50) + 'px';};
		break;
		case 180: if(top<=400){oBlock.style.top = (top + 50) + "px";};
		break;
		case 270: if(left>=50){oBlock.style.left = (left - 50) + "px";};
		break;
	};
}

//输入事件
function showInput(){
	var oVal = $('#doInput').value;
	switch (oVal){
		case 'GO': moveGo();
		break;
		case 'TO LEFT': changeDirection('left');
		break;
		case 'TO RIGHT': changeDirection('right');
		break;
		default: alert('请输入合法值！');
		break;
	}
}

//加入input效果
function changeFocus(){
	$('#doInput').onfocus = function(){this.style.boxShadow = '0 0 1px rgba(0,0,0,0.3) inset';};
	$('#doInput').onblur = function(){this.style.boxShadow = 'none';};
}

//绑定事件
function bindEvent(){
	$('#toLeft').onclick = ()=>changeDirection('left');
	$('#toRight').onclick = ()=>changeDirection('right');
	$('#go').onclick = moveGo;
	$('#doMove').onclick = showInput;
	changeFocus();
}

window.onload = bindEvent;
