var score = 0;
$(document).ready(function(){
	var canvas = document.getElementById('game');
	var images = document.getElementsByTagName("img");
	var context = canvas.getContext("2d");
	$(".wrapper").css("background-image", "url(img/background.png)");
	
	var Bird = function(config){
		this.x = config.x || 0;
		this.y = config.y || 0;
		this.img = images[0];
		this.width = config.width ||this.img.width;
		this.height = config.height || this.img.height;
		this.yMove = config.yMove || 1;
		return this;
	}
	
	Bird.prototype.jump = function(){
		acFlag++;
		this.y += Math.ceil(this.yMove + acFlag / 20);
		this.draw();
		return this;
	}
	
	Bird.prototype.draw = function(){
		context.drawImage(this.img, 0, this.y, this.width, this.height);
		return this;
	}
	
	var birdConf = {
		x:0, 
		y:100
	};
	
	var boxConf = {
		width:80,
		height:80
	};
	
	var pipeConf = {
		
	};
	
	var Box = function(x, y){
		this.x = x;
		this.y = y;
		this.width =  boxConf.width;
		this.height = boxConf.height;
		this.visable = true;
		return this;
	}
	
	Box.prototype.draw = function(){
		context.fillStyle = "white";
		context.strokeStyle = "black";
		context.strokeRect(this.x, this.y, this.width, this.height);
		context.fillRect(this.x, this.y, this.width, this.height);
	}
	
	var Pipe = function(posX, xMove, maxNum){
		this.posX = posX;
		this.xMove = xMove;
		this.boxList = [];
		var box = new Box(0, 0);
		this.maxNum = maxNum || Math.ceil(canvas.height / box.height);
		var boxTemp;
		for(var i = 0;i < this.maxNum;i++){
			boxTemp = new Box(this.posX, i * box.width);
			this.boxList.push(boxTemp);
		}
		this.boxW = box.width;
		this.boxH = box.height;
		return this;
	}
	
	Pipe.prototype.draw = function(){
		var box;
		for(var i = 0;i < this.maxNum;i++){
			if(this.boxList[i].visable){
				this.boxList[i].x = this.posX;
				box = this.boxList[i];
				box.draw();
			}
		}
	}
	
	Pipe.prototype.rand = function(){
		for(var i = 0;i < this.maxNum;i++){
		    this.boxList[i].visable = true;
		}
		
		var randBox = Math.floor(Math.random() * 6);
		
		this.boxList[randBox].visable = false;
		this.boxList[randBox + 1].visable = false;
		return this;
	}
	
	Pipe.prototype.move = function(){
		this.posX += this.xMove;
		if(this.posX < -1 * this.boxW){
			score++;
			console.log(score);
			$('#score').html(score);
			this.posX = canvas.width;
			this.rand();
		}
		this.draw();
		return this;
	}
	
	function collision(bird, pipe){
		var birdX = bird.x,
		    birdY = bird.y,
		    birdW = bird.width,
		    birdH = bird.height;
		    
		var emptyBox1, emptyBox2;
		for(var i = 0;i < pipe.maxNum - 1;i++){
			if(pipe.boxList[i].visable == false){
				emptyBox1 = pipe.boxList[i];
				emptyBox2 = pipe.boxList[i + 1];
				break;
			}
		}
		
		var emptyX = pipe.posX;
		var emptyY = emptyBox1.y;
		var emptyW = emptyBox1.width;
		var emptyH = emptyBox1.height + emptyBox2.height;
		
		var collUp = calculate(birdX, birdY, birdW, birdH, emptyX, 0, emptyW, emptyY);
		var collDown = calculate(birdX, birdY, birdW, birdH, emptyX, emptyY + emptyH, emptyW, canvas.height - emptyY - emptyH);
		if(collUp || collDown){
			stop();
		}
		
		if(bird.y + bird.height > canvas.height){
			stop();
		}
		
	}
	
	function calculate(x1, y1, w1, h1, x2, y2, w2, h2){
		var ax = x1 + w1 / 2,
			ay = y1 + h1 / 2,
			bx = x2 + w2 / 2,
			by = y2 + h2 / 2;
		var collX = false, collY = false;
		collX = Math.abs(bx - ax) < (w1 + w2) / 2;
		collY = Math.abs(by - ay) < (h1 + h2) / 2;
		return collX && collY;
	}
	
	function stop(){
		var inst = $('[data-remodal-id=modal]').remodal();
		inst.open();
		if(resultId){
			window.cancelAnimationFrame(render);
		}
		
		stopped = true;
	}
	
	
	
	function render(){
		if(!stopped){
			context.clearRect(0, 0, canvas.width, canvas.height);
			pipe = pipe.move();
			bird.jump();
			collision(bird, pipe);
			resultId = window.requestAnimFrame(render);
		}
	}
	
	var acFlag = 0;
	
	$("#game").click(function(){
		acFlag = 0;
		bird.y -= 40;
	});
	
	var stopped = false;
	var resultId;
	var bird = new Bird(birdConf);
	var pipe = new Pipe(350, -2, 8);
	pipe = pipe.rand();
	function start(){
		
		stopped = false; 
		resultId = window.requestAnimFrame(render);
		bird = new Bird(birdConf);
	    pipe = new Pipe(350, -2, 8);
		pipe = pipe.rand();   
	}

	var inst = $('[data-remodal-id=modal]').remodal();
	inst.open();
	
	var num = 1;
	$('#True').click(function(){
		$('.intro').hide();
		for(var i = 0;i < 3;i++){
			$('.test #' + (i + 1)).hide();
		}
		
		$('.test #' + num).show();
		num++;
		if(num < 1){
			num = 3;
		}
		if(num > 3){
			num = 1;
		}
		acFlag = 0;
		start();
	});
	
	$('#False').click(function(){
		$('.intro').hide();
		$('.test').show();
		acFlag = 0;
		score = 0;
		$('#score').html(score);
		start();
	});
	

	window.requestAnimFrame = (function() {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
		function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
			return window.setTimeout(callback, 1000 / 60);
		};
	})();
	
});
