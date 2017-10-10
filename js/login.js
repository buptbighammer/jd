validateUser();
function validateUser(){
	var form = document.forms["login"];
	EventUtil.addHandler(form.submit,"click",function(event){vaildate(form,event);});
}
function displayError(errorNode,errorMsg){
	errorNode.style.visibility="visible";
	errorNode.getElementsByTagName("p")[0].innerText=errorMsg;
}
function vaildate(form,event){
	EventUtil.preventDefault(event);
	var error = form.parentNode.getElementsByClassName("errormsg")[0];
	error.style.visibility="hidden";
	var username = form.username.value;
	var pwd = form.pwd.value;
	if(! Boolean(username)){
		displayError(error,"请输入用户名");
	}
	if(! Boolean(pwd)){
		displayError(error,"请输入密码");
	}
	if(localStorage.getItem(username) !== pwd){
		displayError(error,"用户名或密码错误");
	}
	if(error.style.visibility==="hidden"){
		window.open("index.html","_self");
	}
}