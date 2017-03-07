var oInputIn = document.getElementById('inputIn');
var oButtonIn = document.getElementById('buttonIn');
var oInputSearch = document.getElementById('inputSearch');
var oButtonSearch = document.getElementById('buttonSearch');
var oShowOut = document.getElementById('showOut');

oButtonIn.onclick = function(){
	//初始化
	oShowOut.innerHTML = '';
	let oVal = oInputIn.value;
	//不是数字字母汉字
	let oReg = /[^0-9a-zA-Z\u4e00-\u9fa5]+/g;
	let newVal = oVal.split(oReg).filter(function(e){
		if(e != null && e.length > 0){return true}
			else{return false}
	});
	oInputIn.value = '';
	for(let i = 0;i < newVal.length;i ++){
		let oLi = document.createElement('li');
		let oText = document.createTextNode(newVal[i]);
		oLi.appendChild(oText);
		oShowOut.appendChild(oLi);
	}
}

oShowOut.addEventListener('click',function(e){
	if(e.target.nodeName == 'LI'){
		oShowOut.removeChild(e.target);
	}
})

oButtonSearch.onclick = function(){
	//初始化
	let oList = oShowOut.getElementsByTagName('li');
	for(let i = 0;i < oList.length;i ++){
			oList[i].style.backgroundColor = 'lightblue';
		}

	let oVal = oInputSearch.value;
	let oReg = /[^0-9a-zA-Z\u4e00-\u9fa5]+/g;
	if(oReg.test(oVal) || oVal.indexOf('') > 0){
		alert('请输入合法值：数字，字母或汉字');
		oInputSearch.value = '';
	} else{
		let newReg = new RegExp(oVal,"g");
		var flag = 1;
		for(let i = 0;i < oList.length;i ++){
			if(newReg.test(oList[i].innerHTML)){
				flag = 0;
				//为啥我输出为false啊！！！！！！！！！！！气哭！！！！！！！！
				console.log(newReg.test(oList[i].innerHTML));//删掉这句会出bug，不知道为啥。。求大神指教
				oList[i].style.backgroundColor = 'red';
			}
		}
		if(flag){
			alert('没有匹配到您输入的值');
		}
	}
}

//使textarea能输入tab
function tab(obj){
  if (event.keyCode == 9)
  {
     obj.value = obj.value + "	"; 
     event.returnValue = false;
  }
}
