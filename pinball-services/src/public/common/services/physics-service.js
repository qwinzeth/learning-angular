pinballApp.Services.factory('physics', function physicsFactory(){
	function applyMovement(obj, millis){
		obj.yspd += obj.yacc * (millis / 1000.0);
		obj.xspd += obj.xacc * (millis / 1000.0);
		obj.y += obj.yspd * millis / 33;
		if(obj.y >= height - obj.r){
			obj.y = height - obj.r;
			obj.yspd = 0;
		}
		
		if(obj.y <= obj.r){
			obj.y = obj.r;
			obj.yspd = 0;
		}
		
		obj.x += obj.xspd * millis / 33;
		if(obj.x >= width - obj.r){
			obj.x = width - obj.r;
			obj.xspd = 0;
		}
		
		if(obj.x <= obj.r){
			obj.x = obj.r;
			obj.xspd = 0;
		}
	}

	function boxCollision(obj, wall, millis){
		var blurredObj = getBlurredObj(obj, millis);
		return blurredObj.objRight >= wall.x1 && blurredObj.objLeft <= wall.x2
		&& blurredObj.objBottom >= wall.y1 && blurredObj.objTop <= wall.y2;
	}

	function lineCollision(obj, wall, millis){
		var blurredObj = getBlurredObj(obj, millis);
		return blurredObj.objRight >= wall.x1 && blurredObj.objLeft <= wall.x2
		&& blurredObj.objBottom >= getYFromWall(wall, obj.x)
		&& blurredObj.objTop <= getYFromWall(wall, obj.x);
	}
				
	function getYFromWall(wall, x){
		var slope = getSlopeFromWall(wall);
		return slope * x + wall.y1 - slope * (wall.x1);
	}
	
	function getSlopeFromWall(wall){
		return (wall.y2 - wall.y1) / (wall.x2 - wall.x1);
	}

	function getBlurredObj(obj, millis){
		var objLeft = obj.x - obj.r;
		var objRight = obj.x + obj.r;
		var objTop = obj.y - obj.r;
		var objBottom = obj.y + obj.r;
		
		// Apply "blurring" of the object to capture missed collisions
		if(obj.xspd > 0){
			objLeft -= obj.xspd * millis / 33;
		}else{
			objRight -= obj.xspd * millis / 33;
		}
		
		if(obj.yspd > 0){
			objTop -= obj.yspd * millis / 33;
		}else{
			objBottom -= obj.yspd * millis / 33;
		}
		
		return {
			objLeft: objLeft,
			objRight: objRight,
			objTop: objTop,
			objBottom: objBottom
		};
	}

	var fills = ['red', 'orange', 'yellow', 'lime', 'green', 'cyan', 'blue', 'purple', 'black', 'silver', 'white'];
	
	return {
		applyGravity: function applyGravity(obj, millis){
			if(obj.yacc < 20){
				obj.yacc = 20;
			}
		},

		applyMovement: applyMovement,
		
		boxCollision: boxCollision,
		
		lineCollision: lineCollision,
		
		handleCollisions: function handleCollisions(obj, walls, teleporters, bumpers, millis){
			obj.xacc = 0;
			_.each(walls, function(wall){
				if(lineCollision(obj, wall, millis)){
					var wallslope = getSlopeFromWall(wall);
					if(obj.yspd >= 0){
						obj.xacc = 2 * wallslope;
						obj.y = getYFromWall(wall, obj.x) - obj.r;
					}else{
						obj.xacc = 2 * -wallslope;
						obj.xspd = obj.yspd * .5;
						obj.y = getYFromWall(wall, obj.x) + obj.r;
					}
					obj.yspd = 0;
					obj.yacc = 0;
				}
			});
			
			_.each(teleporters, function(teleporter){
				var wall = {
					x1: teleporter.x,
					y1: teleporter.y,
					x2: teleporter.x + teleporter.width,
					y2: teleporter.y + teleporter.height
				};
				
				if(boxCollision(obj, wall, millis)){
					obj.xspd = 0;
					obj.yspd = 0;
					obj.x = teleporter.gotoX;
					obj.y = teleporter.gotoY;
				}
			});
			
			var score = 0;
			
			_.each(bumpers, function(bumper){
				var bumperAsWall = {
					x1: bumper.x,
					y1: bumper.y,
					x2: bumper.x + bumper.width,
					y2: bumper.y + bumper.height
				};

				if(boxCollision(obj, bumperAsWall, millis)){
					obj.xacc = 0;
					obj.yacc = 0;
					obj.xspd = -obj.xspd;
					obj.yspd = -obj.yspd;
					score += 50;
					bumper.fillIndex = (bumper.fillIndex + 1) % fills.length;
					bumper.fill = fills[bumper.fillIndex];
					applyMovement(obj, millis);
					if(Math.abs(obj.xspd) > 2){
						obj.xspd /= 2;
					}else if(obj.xspd != 0){
						obj.xspd *= 10;
					}else{
						obj.xspd = 1;
					}
					if(Math.abs(obj.yspd) > 2){
						obj.yspd /= 2;
					}else{
						obj.yspd *= 10;
					}
				}
			});
			
			return score;
		},
		
		newCircle: function newCircle(x, y, r){
			return {
				x: x,
				y: y,
				r: r,
				xspd: 0,
				yspd: 0,
				xacc: 0,
				yacc: 0
			};
		},
		
		newLine: function newLine(x1, y1, x2, y2){
			return {
				x1: x1,
				y1: y1,
				x2: x2,
				y2: y2
			};
		},
		
		newRect: function newRect(x, y, width, height, gotoX, gotoY){
			return {
				x: x,
				y: y,
				width: width,
				height: height,
				gotoX: gotoX,
				gotoY: gotoY,
				fill: 'red',
				fillIndex: 0
			};
		},
		
		newFlipper: function newFlipper(x1, y1, x2, y2){
			return {
				x1: x1,
				y1: y1,
				x2: x2,
				y2: y2
			};
		}
	};
});