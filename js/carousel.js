function addClassName(elem,classname){
	var oldClassName = elem.className;
	if(!oldClassName.match(/\S/g)){
		elem.className = classname;
	}else{
		elem.className = oldClassName + " "+classname;
	}
}
function removeClassName(elem,classname){
	var oldClassName = elem.className;
	var pos = oldClassName.indexOf(classname);
	if(pos === 0){
		elem.className = oldClassName.replace(classname,"");
	}else if(pos > 0){
		elem.className = oldClassName.replace(" "+classname,"");
	}
}
var Carousel = function(poster){
	var self = this;
	this.poster = poster;
	this.posterItemMain = poster.getElementsByClassName("poster-list")[0];
	this.prevBtn = poster.getElementsByClassName("prev-btn")[0];
	this.nextBtn = poster.getElementsByClassName("next-btn")[0];
	this.posterItems =  this.posterItemMain.getElementsByClassName("poster-item");
	this.slider = poster.getElementsByClassName("poster-slider")[0];
	this.sliderItems = this.slider.getElementsByTagName("span");
	this.len = this.posterItems.length;
	this.posterFirstItem = this.posterItems[0];
	this.posterLastItem = this.posterItems[this.len-1];
	this.itemHeight = parseInt(this.poster.offsetHeight);
	this.itemWidth = parseInt(this.poster.offsetWidth);
	this.rotateFlag = false;
	this.settingValue();
	this.prevBtn["onclick"] = function(){
		if(self.rotateFlag === false){
			self.carousel("left");
		}
	};
	this.nextBtn["onclick"] = function(){
		if(self.rotateFlag === false){
			self.carousel("right");
		}
	};
	this.autoPlay();
	this.sildersHover();
}
Carousel.prototype = {
	constructor:Carousel,
	sliderHover:function(index){
		var _this = this;
		return function(){
			window.clearInterval(_this.timer);
			var currentSlider = _this.slider.getElementsByClassName("current-silder")[0]
			var currentPoster = _this.posterItemMain.getElementsByClassName("current-poster")[0];
			removeClassName(currentSlider,"current-silder");
			addClassName(_this.sliderItems[index],"current-silder");
			removeClassName(currentPoster,"current-poster");
			addClassName(_this.posterItems[index],"current-poster");
			_this.autoPlay();
		}
	},
	sildersHover:function(){
		for(var i=0;i<this.len;i++){
			this.sliderItems[i]["onmouseover"] = this.sliderHover(i);
		}
	},
	//自动播放
	autoPlay:function(){
		var _this = this;
		this.timer = window.setInterval(function(){_this.nextBtn.click()},
			3000);
	},
	//设置初始状态
	settingValue:function(){
		addClassName(this.sliderItems[0],"current-silder");
		addClassName(this.posterFirstItem,"current-poster");
	},
	//轮播
	carousel:function(dir){
		window.clearInterval(this.timer);
		var date1 = new Date();
		this.rotateFlag = true;
		var currentSlider = this.slider.getElementsByClassName("current-silder")[0]
		var currentPoster = this.posterItemMain.getElementsByClassName("current-poster")[0];
		if(dir === "left"){
			var nextSlider = currentSlider.previousElementSibling;
			if(currentSlider === this.sliderItems[0]){
				nextSlider = this.sliderItems[this.len-1];
			}
			var nextPoster = currentPoster.previousElementSibling;
			if(currentPoster === this.posterFirstItem){
				nextPoster = this.posterLastItem;
			}
		}else if(dir === "right"){
			var nextSlider = currentSlider.nextElementSibling;
			if(currentSlider === this.sliderItems[this.len-1]){
				nextSlider = this.sliderItems[0];
			}
			var nextPoster = currentPoster.nextElementSibling;
			if(currentPoster === this.posterLastItem){
				nextPoster = this.posterFirstItem;
			}
		}
		removeClassName(currentSlider,"current-silder");
		addClassName(nextSlider,"current-silder");
		removeClassName(currentPoster,"current-poster");
		addClassName(nextPoster,"current-poster");
		var date2 = new Date();
		while(date2 - date1 < 400){
			date2 = new Date();
		}
		this.rotateFlag = false;
		this.autoPlay();
	},
};
Carousel.init = function(posters){
	_this_ = this;
	for(var i = 0; i< posters.length; i++){
		new this(posters[i]);
	}
};
window["Carousel"] = Carousel;