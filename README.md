# Tizen-App-StuBird

## 概述

StuBird 是一款类似于flappy bird的游戏，但在基本的游戏乐趣上加入了HTML5的一些简单的问答系统，在享受游戏的同时又能了解一些HTML5的小知识。## 算法介绍

StuBird基于TIZEN web project开发，主要使用了Html与Javascript技术。通过click方法中监测用户的点击。
```js
var Bird = function(config){
		this.x = config.x || 0;
		this.y = config.y || 0;
		this.img = images[0];
		this.width = config.width ||this.img.width;
		this.height = config.height || this.img.height;
		this.yMove = config.yMove || 1;
		return this;
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

	function render(){
		if(!stopped){
			context.clearRect(0, 0, canvas.width, canvas.height);
			pipe = pipe.move();
			bird.jump();
			collision(bird, pipe);
			resultId = window.requestAnimationFrame(render);
		}
	}	
```
