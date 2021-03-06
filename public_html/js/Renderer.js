Renderer = function(canvasId){
	this.canvas = document.getElementById(canvasId);
	if(! this.canvas.getContext("2d")){
		console.log("cannot get context!");
	}
	this.context = this.canvas.getContext("2d");
	this.bgColor = "#aaaacc";
	this.lastRender = null;
}

Renderer.timeElapsed = null;

Renderer.prototype = {
	setClearColor: function(color){
		this.bgColor = color;
	},
	render: function(game){
		if(this.lastRender)
		{
			Renderer.timeElapsed = (new Date().getTime() - this.lastRender) / 1000;
		}
		this.clear(this.bgColor);
		for(i in game.items){
			this.context.save();
			if(typeof(game.items[i].render == "function")){
				game.items[i].render(this.context);
			}
			this.context.restore();
		}
		this.lastRender = new Date().getTime();
	},
	clear: function(color) {
		this.context.fillStyle = color;
		this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
	}
}