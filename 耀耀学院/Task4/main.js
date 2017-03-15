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
    switch (direction){
    	case 'MOV LEF': getAngle(oBlock,270);
    	break;
    	case 'MOV TOP': getAngle(oBlock,0);
    	break;
    	case 'MOV RIG': getAngle(oBlock,90);
    	break;
    	case 'MOV BOT': getAngle(oBlock,180);
    	break;
    } 
}

//前进事件
function moveGo(direction){
	var oBlock = $('#block');
	var top = parseInt(oBlock.style.top);
	var left = parseInt(oBlock.style.left);
	switch(direction){
		case 'TRA TOP': if(top>=50){oBlock.style.top = (top - 50) + "px";};
		break;
		case 'TRA RIG': if(left<=400){oBlock.style.left = (left + 50) + 'px';};
		break;
		case 'TRA BOT': if(top<=400){oBlock.style.top = (top + 50) + "px";};
		break;
		case 'TRA LEF': if(left>=50){oBlock.style.left = (left - 50) + "px";};
		break;
	};
}

//输入事件
function showInput(){
	var oVal = $('#doInput').value;
	switch (oVal){
		case 'TRA LEF': changeDirection('MOV LEF');
		break;
		case 'TRA TOP': changeDirection('MOV TOP');
		break;
		case 'TRA RIG': changeDirection('MOV RIG');
		break;
		case 'TRA BOT': changeDirection('MOV BOT');
		break;
		case 'MOV LEF': (function(){changeDirection('MOV LEF');moveGo('TRA LEF');})();
		break;
		case 'MOV TOP': (function(){changeDirection('MOV TOP');moveGo('TRA TOP');})();
		break;
		case 'MOV RIG': (function(){changeDirection('MOV RIG');moveGo('TRA RIG');})();
		break;
		case 'MOV BOT': (function(){changeDirection('MOV BOT');moveGo('TRA BOT');})();
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
	$('#doMove').onclick = showInput;
	changeFocus();
}

window.onload = bindEvent;