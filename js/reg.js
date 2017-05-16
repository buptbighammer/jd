var Validation = {
	validateEmpty:function(elem){
		if(elem.value.length === 0){
			return false;
		}
	},
	validateLength:function(elem,max,min){
		if(elem.value.length < min){
			return false;
		}
		if(elem.value.length > max){
			return false;
		}
		return true;
	},
	validatePurenum:function(elem){
		if(/^\d+$/g.test(elem.value)){
			return false;
		}
		return true;
	},
	validateSame:function(elem1,elem2){
		if(!elem1.value || !elem2.value){
			return false;
		}
		if(elem1.value !== elem2.value){
			return false;
		}
		return true;
	}
}
function showNote(event){
	var elem = EventUtil.getTarget(event);
	var noteNode = elem.parentNode.nextElementSibling;
	noteNode.nextElementSibling.style.display = "none";
	noteNode.style.display = "block";
	noteNode.getElementsByTagName("span")[0].style.display = "inline-block";
	noteNode.getElementsByTagName("p")[0].style.display = "inline-block";
}
function addFocusEvent(){
	var inputList = document.getElementsByClassName("insert");
	[].slice.apply(inputList).forEach(function(item){
		var input = item.getElementsByTagName("input")[0];
		EventUtil.addHandler(input,"focus",showNote);
	});
}
function validateUserName(){
	var elem = document.getElementById("username");
	var noteNode = elem.parentNode.nextElementSibling;
	var errorNode = noteNode.nextElementSibling;
	if(!Validation.validateEmpty(elem)){
		noteNode.style.display = "none";
		errorNode.style.display = "block";
		errorNode.getElementsByTagName("p")[0].innerText = "用户名不能为空";
	}else if(!Validation.validateLength(elem,20,4)){
		noteNode.style.display = "none";
		errorNode.style.display = "block";
		errorNode.getElementsByTagName("p")[0].innerText = "长度为4-20";
	}else if(!Validation.validatePurenum(elem)){
		noteNode.style.display = "none";
		errorNode.style.display = "block";
		errorNode.getElementsByTagName("p")[0].innerText = "不能为纯数字";
	}
	else{
		noteNode.getElementsByTagName("span")[0].style.display = "none";
		noteNode.getElementsByTagName("p")[0].style.display = "none";
	}
}
function validatePwd(){
	var elem = document.getElementById("pwd");
	var noteNode = elem.parentNode.nextElementSibling;
	var errorNode = noteNode.nextElementSibling;
	if(!Validation.validateEmpty(elem)){
		noteNode.style.display = "none";
		errorNode.style.display = "block";
		errorNode.getElementsByTagName("p")[0].innerText = "密码不能为空";
	}else if(!Validation.validateLength(elem,20,6)){
		noteNode.style.display = "none";
		errorNode.style.display = "block";
		errorNode.getElementsByTagName("p")[0].innerText = "长度为6-20";
	}else if(!Validation.validatePurenum(elem)){
		noteNode.style.display = "none";
		errorNode.style.display = "block";
		errorNode.getElementsByTagName("p")[0].innerText = "不能为纯数字";
	}
	else{
		noteNode.getElementsByTagName("span")[0].style.display = "none";
		noteNode.getElementsByTagName("p")[0].style.display = "none";
	}
}
function validateConfirmPwd(){
	var elem = document.getElementById("confirmpwd");
	var noteNode = elem.parentNode.nextElementSibling;
	var errorNode = noteNode.nextElementSibling;
	if(!Validation.validateEmpty(elem)){
		noteNode.style.display = "none";
		errorNode.style.display = "block";
		errorNode.getElementsByTagName("p")[0].innerText = "密码不能为空";
	}else if(!Validation.validateSame(elem)){
		noteNode.style.display = "none";
		errorNode.style.display = "block";
		errorNode.getElementsByTagName("p")[0].innerText = "两次密码输入不一致";
	}
	else{
		noteNode.getElementsByTagName("span")[0].style.display = "none";
		noteNode.getElementsByTagName("p")[0].style.display = "none";
	}
}
function addBlurEvent(){
	var userName = document.getElementById("username");
	EventUtil.addHandler(userName,"blur",validateUserName);
	var pwd = document.getElementById("pwd");
	EventUtil.addHandler(pwd,"blur",validatePwd);
	var confirmPwd = document.getElementById("confirmpwd");
	EventUtil.addHandler(confirmPwd,"blur",validateConfirmPwd);
}
function commit(event){
	EventUtil.preventDefault(event);
	var elem = EventUtil.getTarget(event);
	validateUserName();
	validatePwd();
	validateConfirmPwd();
	var errorList = document.getElementsByClassName("error");
	[].slice.apply(errorList).forEach(function(item){
		if(item.style.display === "block"){
			return false;
		}
	});
}
function addCommitEvent(){
	var button = document.getElementsByTagName("button")[0];
	EventUtil.addHandler(button,"click",commit);
}
addFocusEvent();
addBlurEvent();
addCommitEvent();