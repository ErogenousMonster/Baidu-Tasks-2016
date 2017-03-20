//获取id
function $(element){
	return document.getElementById(element.substring(1,element.length));
}

//创建节点
function createElement({element,id = '',text = ''} = {}){
	var oElement = document.createElement(element);
	oElement.id = id;
	var oText = document.createTextNode(text);
	oElement.appendChild(oText);
	return oElement;
}

//添加节点
function appendElement(element,apElement){
	element.appendChild(apElement);
}

// 创造遮盖层
//创造浮动层
function createContent(){
	//获取顶层DIV
	var oDiv = $('#container');
	// <div id="shadow"></div>
	var oShadow = createElement({element:'div',id:'shadow'});
	//使遮盖层的高为100%；
	var oHeight = document.documentElement.scrollHeight;
	appendElement(oDiv,oShadow);
	oShadow.style.height = oHeight + 'px';
	/*<div id="content">
		<h1 id='title'>这是一个浮出层</h1>
		<div id="footer">
			<p>这是一个浮出层</p>
			<button id="confirm">确定</button>
			<button id="cancel">取消</button>
		</div>
	</div>*/
	var oBtnOne = createElement({element:'button',id:'confirm',text:'确定'});
	var oBtnTwo = createElement({element:'button',id:'cancel',text:'取消'});
	var oPar = createElement({element:'p',text:'这是一个浮出层'});
	var oH1 = createElement({element:'h1',id:"title",text:'这是一个浮出层'})
	var oFor = createElement({element:'div',id:'footer'});
	var oContent = createElement({element:'div',id:'content'});

	appendElement(oFor,oPar);
	appendElement(oFor,oBtnOne);
	appendElement(oFor,oBtnTwo);
	appendElement(oContent,oH1);
	appendElement(oContent,oFor);
	appendElement(oDiv,oContent);

	//浮动层的实际宽高
	var sHeight = oContent.offsetHeight;
	var sWidth = oContent.offsetWidth;

	//使浮动层垂直水平居中（js方法）
	oContent.style.left = 'calc(50% - ' + sWidth/2 + 'px)';
	oContent.style.top = 'calc(50% - ' + sHeight/2 + 'px)';

	//取消事件
	cancelEvent($('#confirm'),oShadow,oContent);
	cancelEvent($('#cancel'),oShadow,oContent);
	cancelEvent($('#shadow'),oShadow,oContent);

	//拖曳效果
   //0.声明一个开关变量        
        var off = 0;        
        //0.1声明一个变量一保存鼠标与盒子之间的距离        
        var cur = {};        
        //1.给标题添加鼠标按下事件        
        $('#title').onmousedown = function(event){   
       		var event = event || window.event;                         
            off = 1;
            //1.1 计算鼠标位置-盒子到页面的位置，得到一个差，永远不变
            cur.x = event.clientX - oContent.offsetLeft;
            cur.y = event.clientY - oContent.offsetTop;
            console.log(event.clientX);
            console.log(event.clientY);           
        //2.添加鼠标移动事件        
        document.onmousemove = function(event){            
            //2.1判断按下的开关状态  如果是真再运行            
            if(!off) return;
            var left = event.clientX - cur.x;            
            var tops = event.clientY - cur.y;
            //限制box不超出浏览器
            left = left<0?0:left;
            tops = tops<0?0:tops;
            left = left >= window.innerWidth-500 ? window.innerWidth-500 : left;
            tops = tops >= window.innerHeight-300 ? window.innerHeight-300 : tops;
            
            oContent.style.left = left+'px';
            oContent.style.top = tops+'px';            
        	}
    	}       
        //3.添加鼠标抬起事件
        document.onmouseout = function(){            
            console.log('鼠标抬起');            
            off = 0;            
        }   
}

function cancelEvent(element,eventOne,eventTwo){
	element.onclick = function(){
		//获取顶层DIV
		var oDiv = $('#container');
		oDiv.removeChild(eventOne);
		oDiv.removeChild(eventTwo);
	}
}

//绑定事件
function bindEvent(){
	$('#show').onclick = function(){createContent();};
}

window.onload = bindEvent;