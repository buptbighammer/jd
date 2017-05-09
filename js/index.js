function addLocationIClickEvent(elem,location){
	EventUtil.addHandler(elem,"click",function(event){
		location.lastChild.nodeValue = elem.innerText;
		var iList = elem.parentNode.childNodes;
		var len = iList.length;
		for(var i = 0; i<len; i++){
			if(iList[i].nodeType === 1){
				iList[i].firstChild.className = "";
			}
		}
		elem.firstChild.className = "select";
		EventUtil.preventDefault(event);
	});
}
function addEvent(){
	var iList = document.getElementById("sub-header").getElementsByTagName("li");
	var dlList = document.getElementById("sub-header").getElementsByClassName("sub-menu");
	var len = iList.length;
	for(var i=0; i<len; i++){
		EventUtil.addHandler(iList[i], "mouseover", (function(i){
			return function(){
				if(typeof dlList[i] === "object")
				{
					dlList[i].style.display = "block";
					EventUtil.addHandler(dlList[i], "mouseover", function(){
						this.style.display = "block";
					});
				}
			}
		})(i));
		EventUtil.addHandler(iList[i],"mouseout",(function(i){
			return function(){
				if(typeof dlList[i] === "object")
				{
					dlList[i].style.display = "none";
					EventUtil.addHandler(dlList[i], "mouseout", function(){
						this.style.display = "none";
					});
				}
			}
		})(i));
	}
	var closeSpan = document.getElementsByTagName("span")[0];
	EventUtil.addHandler(closeSpan,"click",function(){
		var topHeader = document.getElementsByTagName("div")[0];
		topHeader.style.display = "none";
	});
	var shortCut = document.getElementById("shortcut");
	var location = shortCut.getElementsByClassName("location")[0];
	var selectLocation = shortCut.getElementsByClassName("select-location")[0];
	EventUtil.addHandler(location,"mouseover",function(){
		selectLocation.style.display="block";
	});
	EventUtil.addHandler(selectLocation,"mouseover",function(){
		selectLocation.style.display="block";
	});
	EventUtil.addHandler(location,"mouseout",function(){
		selectLocation.style.display="none";
	});
	EventUtil.addHandler(selectLocation,"mouseout",function(){
		selectLocation.style.display="none";
	});
	var locationIList = selectLocation.getElementsByTagName("li");
	var len = locationIList.length;
	for(var i = 0; i<len; i++){
		addLocationIClickEvent(locationIList[i],location);
	}
	var topUl = document.getElementsByClassName("grid-cl")[0].getElementsByTagName("ul")[0];
	var hr = topUl.getElementsByTagName("hr")[0];
	var topItems = topUl.getElementsByTagName("li");
	
	[].forEach.call(topItems,function(item,index,arr){
		var title = item.getElementsByTagName("a")[0];
		EventUtil.addHandler(title,"mouseover",function(){
			[].forEach.call(topItems,function(item){
			var elemContent = item.getElementsByTagName("div")[0];
			removeClassName(elemContent,"active");
		});
			var content = item.getElementsByTagName("div")[0];
			addClassName(content,"active");
			var left = 78*index+10;
			hr.style.left = left + "px";
		});
	});
}
function setSKTime(){
	var hour = document.getElementsByClassName("hour")[0];
	var minute = document.getElementsByClassName("minute")[0];
	var second = document.getElementsByClassName("second")[0];
	var timer = setInterval(function(){
		setNewSKTime(hour,minute,second);
	}, 1000);
}
function setNewSKTime(hourEle,minuteEle,secondEle,timer){
	var second = parseInt(secondEle.innerText);
	var minute = parseInt(minuteEle.innerText);
	var hour = parseInt(hourEle.innerText);
	if(--second === -1){
		second = 59;
	}
	if(second === 59){
		if(--minute === -1){
			minute = 59;
		}
	}
	if(minute === 59){
		if(--hour === -1){
			clearInterval(timer);
			second = 0;
			minute = 0;
			hour = 0;
		}
	}
	if(hour < 10){
		hourEle.innerText = "0" + hour;
	}else{
		hourEle.innerText = hour;
	}
	if(second < 10){
		secondEle.innerText = "0" + second;
	}else{
		secondEle.innerText = second;
	}
	if(minute < 10){
		minuteEle.innerText = "0" + minute;
	}else{
		minuteEle.innerText = minute;
	}
}
addEvent();
setSKTime();
Carousel.init(document.getElementsByClassName("poster-main"));
new skCarouel(document.getElementsByClassName("sk-list-wapper")[0]);