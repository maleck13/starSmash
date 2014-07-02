Client = function(game){
	this.sock = new WebSocket("ws://starsmash.com.dev:8001");
	var me = this;
	this.sock.onmessage = function(evt){
		me.processCommand(evt);	
	}
	this.game = game;
}

Client.prototype = {
	sendCommand: function(data){
		this.sock.send(JSON.stringify(data));
	},
	setResources: function(resources){
		var data = {};
		data.command = "setResouces";
		data.resources = resources;
		this.sendCommand(data);
	},
	buildUnit: function(unitType){
		var data = {};
		data.command = "build";
		data.unitType = unitType;
		this.sendCommand(data);
	},
	moveUnit: function(unitId, pos){
		var data = {};
		data.command = "move";
		data.unitId = unitId;
		data.position = pos;
		this.sendCommand(data);
	},
	setName: function(name){
		var data = {};
		data.command = "name";
		data.name = name;
		this.sendCommand(data);
	},
	processCommand: function(evt){
		console.log(evt);
		var data = JSON.parse(evt.data);
		console.log(data);
		switch(data.command){
			case "updateUnit":
				this.updateUnit(data.data);
				break;
			case "starmap":
				this.starmap(data.data);
				break;
			case "name":
				this.nameResponse(data.data);
				break;
		}
	},
	updateUnit: function(data){
		console.log(data);
		var item = this.game.getItem(data.id);
		if(! item){
			console.log("couldn't find item");
			var item = new Item(data.id);
			this.game.addItem(item);
		}
		item.style = data.style;
		if(item.style.image){
			item.image = new Image();
			item.image.src = item.style.image;
			item.image.onload = function(){
				item.imageReady = true;
			}
		}
		item.position = data.position;
		item.destination = data.destination;
		item.currentHp = data.currentHp;
		item.speed = data.speed;
		item.maxHp = data.maxHp;
	},
	starmap: function(data){

	},
	nameResponse: function(data){
		if(data.status == "ok"){
			$("#modal-border").fadeOut();
		} else {
			$("#modal-error").html("bad username, please retry!");
			$("#modal-error").show();
			$("#modal-error").fadeOut(1000);
		}
	}
}