function skCarouel(poster){
	var self = this;
	this.poster = poster;
	this.wapper = this.poster.getElementsByTagName("ul")[0];
	this.prevBtn = this.poster.getElementsByClassName("prev-btn")[0];
	this.nextBtn = this.poster.getElementsByClassName("next-btn")[0];
	this.num = this.wapper.getAttribute("data-num");
	this.CarouselFlag = true;
	this.prevBtn["onclick"] = function(){
		if(self.CarouselFlag === true){
			self.carousel("left");
		}
	};
	this.nextBtn["onclick"] = function(){
		if(self.CarouselFlag === true){
			self.carousel("right");
		}
	};
}
skCarouel.prototype.carousel = function(dir){
	this.CarouselFlag = false;
	var transition = this.wapper.style.transition.match(/transform\s+(\d*)\.*(\d*)s/i);
	var transitionNow = parseFloat(transition[1]+"."+transition[2]);
	var transform = this.wapper.style.transform.match(/translateX\(-(\d+)px\)/i)[1];
	var width = this.wapper.offsetWidth;
	var range = width/this.num;
	if(dir === "left"){
		transform -= range;
		this.wapper.style.transform = "translateX(-"+transform+"px)";
		if(transform === 0){
			transform = width-range*2;
			//this.wapper.style.transition = "transform 0s";
			//this.wapper.style.transform = "translateX(-"+transform+"px)";
			var _this = this;
			setTimeout(function(){
				//_this.wapper.style.transition = "transform 0s";
				_this.wapper.style.transform = "translateX(-"+transform+"px)";
			},595);
			setTimeout(function(){
				//_this.wapper.style.transition = "transform "+transitionNow+"s";
			}, 650);
			//this.wapper.style.transition = "transform "+transitionNow+"s";
		}
	}
	else if(dir === "right"){
		transform = parseFloat(range) + parseFloat(transform);
		this.wapper.style.transform = "translateX(-"+transform+"px)";
		if(transform === width-range){
			transform = range;
			var _this = this;
			setTimeout(function(){
				_this.wapper.style.transition = "transform 0s";
				_this.wapper.style.transform = "translateX(-"+transform+"px)";
			},595);
			setTimeout(function(){
				_this.wapper.style.transition = "transform "+transitionNow+"s";
			}, 650);
			//this.wapper.style.transition = "transform 0s";
			//this.wapper.style.transform = "translateX(-"+transform+"px)";
			//this.wapper.style.transition = "transform "+transitionNow+"s";
		}
	}
	this.CarouselFlag = true;
};