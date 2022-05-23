alert("方向キーで操作して、ゴールを目指そう！！")

var canvas = document.getElementById( 'canvas' );
canvas.width = 640;	
canvas.height = 640;
 
var ctx = canvas.getContext( '2d' );
 
var obake = new Object();
obake.img = new Image();
obake.img.src = 'img/obake.png';
obake.x = 0;
obake.y = 0;
obake.move = 0;
 
var mapchip = new Image();
mapchip.src = 'img/map.png';
 
var key = new Object();
key.up = false;
key.down = false;
key.right = false;
key.left = false;
key.push = '';
 
var map = [
	[2, 0, 1, 0, 1, 0, 0, 0 ,0 ,1 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,1 ,0],
	[0, 1, 0, 0, 0, 1, 1, 1 ,0 ,1 ,0 ,1 ,1 ,0 ,1 ,1 ,1 ,0 ,1 ,0],
	[0, 0, 1, 1, 0, 0, 0, 1 ,0 ,0 ,0 ,1 ,0 ,0 ,0 ,1 ,0 ,0 ,0 ,0],
	[1, 0, 1, 0, 1, 1, 0, 0 ,0 ,1 ,1 ,1 ,1 ,1 ,0 ,0 ,1 ,0 ,1 ,0],
	[0, 0, 0, 0, 0, 1, 1, 1 ,0 ,1 ,0 ,0 ,0 ,0 ,1 ,1 ,0 ,1 ,1 ,0],
	[0, 1, 1, 1, 0, 0, 0, 0 ,0 ,1 ,0 ,1 ,1 ,1 ,0 ,1 ,0 ,0 ,0 ,0],
	[0, 1, 1, 1, 0, 1, 1, 1 ,1 ,1 ,0 ,1 ,0 ,0 ,0 ,0 ,1 ,1 ,1 ,0],
	[0, 0, 0, 1, 0, 0, 0, 0 ,1 ,0 ,0 ,1 ,0 ,1 ,1 ,0 ,0 ,0 ,1 ,0],
	[1, 1, 0, 1, 1, 1, 1, 1 ,1 ,0 ,1 ,1 ,0 ,0 ,1 ,1 ,1 ,0 ,1 ,1],
	[1, 0, 0, 0, 0, 0, 1, 1 ,0 ,0 ,0 ,0 ,1 ,0 ,1 ,1 ,0 ,0 ,1 ,0],
	[1, 0, 1, 1, 1, 0, 0, 0 ,1 ,0 ,1 ,0 ,0 ,0 ,0 ,0 ,1 ,1 ,0 ,0],
	[1, 0, 1, 0, 1, 1, 1, 0 ,1 ,0 ,1 ,1 ,0 ,1 ,1 ,0 ,0 ,0 ,0 ,1],
	[0, 0, 1, 0, 0, 1, 0, 0 ,1 ,0 ,0 ,1 ,0 ,1 ,0 ,1 ,1 ,1 ,0 ,0],
	[0, 1, 1, 1, 0, 1, 0, 1 ,0 ,0 ,1 ,1 ,0 ,1 ,0 ,1 ,1 ,0 ,1 ,0],
	[0, 0, 0, 1, 0, 1, 0, 0 ,1 ,0 ,1 ,1 ,0 ,1 ,0 ,0 ,0 ,0 ,0 ,0],
	[1, 1, 0, 1, 0, 1, 0, 1 ,1 ,0 ,0 ,1 ,0 ,1 ,1 ,0 ,1 ,1 ,1 ,0],
	[0, 0, 0, 1, 0, 1, 1, 1 ,1 ,1 ,0 ,1 ,0 ,1 ,1 ,0 ,0 ,0 ,1 ,0],
	[0, 1, 1, 1, 0, 1, 0, 0 ,0 ,0 ,0 ,1 ,0 ,0 ,0 ,1 ,1 ,0 ,1 ,1],
	[0, 1, 0, 0, 0, 1, 0, 1 ,1 ,1 ,0 ,0 ,1 ,1 ,0 ,1 ,0 ,0 ,0 ,0],
	[0, 0, 0, 1, 0, 0, 0, 1 ,1 ,1 ,1 ,0 ,0 ,0 ,1 ,1 ,1 ,1 ,1 ,3]
]
 
function main() {
	ctx.fillStyle = "rgb( 0, 0, 0 )";
	ctx.fillRect(0, 0, 640, 640);
 
	for (var y=0; y<map.length; y++) {
		for (var x=0; x<map[y].length; x++) {
			if ( map[y][x] === 0 ) ctx.drawImage( mapchip, 0, 0, 32, 32, 32*x, 32*y, 32, 32);
			if ( map[y][x] === 1 ) ctx.drawImage( mapchip, 32, 0, 32, 32, 32*x, 32*y, 32, 32);
			if ( map[y][x] === 2 ) ctx.drawImage( mapchip, 64, 0, 32, 32, 32*x, 32*y, 32, 32);
			if ( map[y][x] === 3 ) ctx.drawImage( mapchip, 96, 0, 32, 32, 32*x, 32*y, 32, 32);
		}
	}
 
	ctx.drawImage( obake.img, obake.x, obake.y );
 
	addEventListener("keydown", keydownfunc, false);
	addEventListener("keyup", keyupfunc, false);
 
	if ( obake.move === 0 ) {
		if ( key.left === true ) {
			var x = obake.x/32;
			var y = obake.y/32;
			x--;
			if ( map[y][x] === 0 || map[y][x] === 2 || map[y][x] === 3) {
				obake.move = 32;
				key.push = 'left';
			}
		}
		if ( key.up === true ) {
			var x = obake.x/32;
			var y = obake.y/32;
			if ( y > 0) {
				y--;
				if ( map[y][x] === 0 || map[y][x] === 2 || map[y][x] === 3) {
					obake.move = 32;
					key.push = 'up';
				}
			}
		}
		if ( key.right === true ) {
			var x = obake.x/32;
			var y = obake.y/32;
			x++;
			if ( map[y][x] === 0 || map[y][x] === 2 || map[y][x] === 3) {
				obake.move = 32;
				key.push = 'right';
			}
		}
		if ( key.down === true ) {
			var x = obake.x/32;
			var y = obake.y/32;
			if ( y < 19 ) {
				y++;
				if ( map[y][x] === 0 || map[y][x] === 2 || map[y][x] === 3) {
					obake.move = 32;
					key.push = 'down';
				}
			}
		}
	}
 
	if (obake.move > 0) {
		obake.move -= 4;
		if ( key.push === 'left' ) obake.x -= 4;
		if ( key.push === 'up' ) obake.y -= 4;
		if ( key.push === 'right' ) obake.x += 4;
		if ( key.push === 'down' ) obake.y += 4;
	}
 
	requestAnimationFrame( main );
}
addEventListener('load', main(), false);
 
function keydownfunc( event ) {
	var key_code = event.keyCode;
	if( key_code === 37 ) key.left = true;
	if( key_code === 38 ) key.up = true;
	if( key_code === 39 ) key.right = true;
	if( key_code === 40 ) key.down = true;
	event.preventDefault();
}
 
function keyupfunc( event ) {
	var key_code = event.keyCode;
	if( key_code === 37 ) key.left = false;
	if( key_code === 38 ) key.up = false;
	if( key_code === 39 ) key.right = false;
	if( key_code === 40 ) key.down = false;
}