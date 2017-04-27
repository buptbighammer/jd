function addEvent(){
	var iList = document.getElementById("side-nav").getElementsByTagName("li");
	var dlList = document.getElementById("side-nav").getElementsByClassName("sub-menu");
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
}
addEvent();