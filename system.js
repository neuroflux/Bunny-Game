var you; //you
var enemy; //enemy
var money = 0; //starting cah
var spade = 10; //spadeHealth
var hammer = 3;
var growingTime = 7500; //7.5 seconds
var growingTimeMax = 9500; //15 seconds
var growingTimeTree = 12500; //12.5 seconds
var growingTimeTreeMax = 14500; //14.5 seconds
var dirt = 0; //dirt count
var health = 100; //starting health
var seeds = 0;
var pts = 0;
var harvests = 0;
var harvestMoney = 5;
var fish = 0;
var fishName = '';
var fishingCost = 10;
var fishingPoints;
var fishingTimeMin = 1500;
var fishingTimeMax = 1500;
var time = 0;
var breakRockMoney = 10;
var treeSeeds = 1;
var saw = 3;
var wood = 0;
var statue = 0;
var stone = 0;

//player starting position
var playerX = 0;
var playerY = 2;

//zombie starting position
var zombieX = Math.floor(Math.random() * 15);
var zombieY = Math.floor(Math.random() * 15);

var zombieXa = Math.floor(Math.random() * 15);
var zombieYa = Math.floor(Math.random() * 15);

var zombieXb = Math.floor(Math.random() * 15);
var zombieYb = Math.floor(Math.random() * 15);

var map = Array( //land
	[0,1,3,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,1,3,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,1,3,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,1,3,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,1,3,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,3,4,4,4,4,4,4,4,4,4,4,4,4],
	[0,1,3,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,1,3,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,1,3,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,1,3,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,1,3,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,1,3,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,1,3,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,1,3,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,1,3,0,0,0,0,0,0,1,1,1,0,0,0],
	[0,1,5,4,4,4,4,4,4,4,4,1,0,0,0],
	[0,1,1,0,0,0,0,0,0,1,1,1,0,0,0],
	[0,1,2,1,0,0,0,0,0,0,0,0,0,0,0],
	[0,1,2,2,1,0,0,0,0,0,0,0,0,0,0],
	[0,1,2,2,2,1,0,0,0,0,0,0,0,0,0]
);
var objectMap = Array( //walkable
	[0,3,0,0,0,0,0,0,0,2,2,2,2,2,6,3],
	[0,3,0,0,0,0,2,0,2,2,2,8,2,8,2,3],
	[0,3,0,0,0,0,0,2,0,2,8,5,6,2,2,3],
	[0,3,0,2,2,0,0,0,2,2,2,2,2,2,8,3],
	[2,3,0,0,0,0,0,0,0,2,2,6,8,0,2,3],
	[0,2,0,0,0,0,0,0,2,2,5,2,2,2,2,3],
	[0,3,0,2,0,0,8,8,0,2,2,2,2,0,0,3],
	[0,3,0,0,0,0,8,0,2,0,0,2,0,0,0,3],
	[0,3,0,0,0,0,0,0,2,2,0,0,8,0,0,3],
	[0,3,0,0,0,2,0,0,0,0,0,0,0,8,0,3],
	[0,3,0,0,0,0,0,0,0,8,0,2,8,0,0,3],
	[0,3,0,0,0,0,0,0,2,0,0,0,0,0,0,3],
	[0,3,0,0,0,0,0,2,0,0,0,0,0,0,0,3],
	[0,3,0,0,0,0,0,0,2,0,0,0,0,0,0,3],
	[0,3,0,0,0,8,0,0,0,3,3,3,2,0,0,3],
	[0,3,0,0,0,0,0,0,2,2,4,3,0,0,0,3],
	[2,3,3,0,0,0,2,0,2,3,3,3,0,2,0,3],
	[0,3,3,3,0,0,0,0,0,0,0,0,0,0,0,3],
	[0,3,3,3,3,0,0,0,0,0,0,0,0,0,0,3],
	[0,3,3,3,3,3,0,0,0,0,0,0,0,0,0,3]
);
var tileDict = Array("land.png","water.png","swamp.png","land-road-up.png","land-road-down.png","land-road-corner1.png","soil.png","land-seeded.png");
var charDict = Array("mario.png","zombie.png");
var objectDict = Array("statue.png","rock.png","blank.png","hut.png","flowers.png","golden-flowers.png","treesmall.png","treelarge.png","treedead.png"); //last is one more
var objectImg = new Array();

var charImg = new Array();

var tileImg = new Array();
var loaded = 0;
var loadTimer;
var ymouse;
var xmouse;
var eventUpdate = 0;

var coinImage;

function loadImg(){ //preload images and calculate the total loading time
	for(var i=0;i<tileDict.length;i++){	
		tileImg[i] = new Image();
		tileImg[i].src = tileDict[i];
		tileImg[i].onload = function(){
			loaded++;
		}
	}
	i = 0;
	for(var i=0;i<charDict.length;i++){
		charImg[i] = new Image();
		charImg[i].src = charDict[i];
		charImg[i].onload = function(){
			loaded++;
		}
	}
	i = 0;
	for(var i=0;i<objectDict.length;i++){
		objectImg[i] = new Image();
		objectImg[i].src = objectDict[i];
		objectImg[i].onload = function(){
			loaded++;
		}
	}
	coinImage = new Image();
	coinImage.src = "coin.gif";
}

function treasureChance() { //you are digging, have you found anything?
	if (map[playerX][playerY] > 0) {
		$('#status').html("<h2 style='color:#fff;'>You cannot dig here.</h2>");
	} else {
		var rndChance = Math.floor(Math.random() * 100);
		if (rndChance < 66) {
			var rndMoney = Math.floor(Math.random() * 14)+1;
			money = money + rndMoney;
			document.getElementById("money").value = money;
			$('#status').html("<h2 style='color:lightgreen;'>You've Found "+rndMoney+"moneys!</h2>"); 
			$('#status').animate({ opacity:1 },'fast',function() { $('#status').animate({ opacity:0.5 },'fast'); });
			ctx = document.getElementById('main').getContext('2d');
			ctx.drawImage(coinImage,playerX,playerY); //wrong place
		} else if (rndChance == 99) {
			money = money + 30;
			$('#status').animate({ opacity:1 },'fast',function() { $('#status').animate({ opacity:0.5 },'fast'); });
			document.getElementById("money").value = money;
			$('#status').html("<h2 style='color:lightgreen;'>Bonus find: 30money!</h2>"); //BONUS!
		}
		spade--;
		dirt++;
		document.getElementById("spade").value = spade;
		document.getElementById("dirt").value = dirt;
		objectMap[playerX][playerY] = 3;
		map[playerX][playerY] = 1;
		setTimeout('repairLandSwamp('+playerX+','+playerY+')', Math.floor(Math.random()*growingTimeMax)+growingTime); //repair
	}
}

function repairLandSwamp(x,y) { //repair land
	map[x][y] = 6;
	setTimeout('repairLand('+x+','+y+')', Math.floor(Math.random()*growingTimeMax)+growingTime);
}

function repairLand(x,y) { //repaired!
	map[x][y] = 0;
	objectMap[x][y] = 0;
}

function checkKeycode(event) { //key pressed
	var keycode;
	if(event == null) {
		keyCode = window.event.keyCode;
	} else {
		keyCode = event.keyCode;
	}
	//document.title = keyCode;
	switch(keyCode) {
		case 38: //left
			if(!objectMap[playerX-1][playerY] > 0){
				playerX--;
				if (pts < 0) { pts--; document.getElementById("pts").value = pts; }
				//monsterChance();
			}
			if (objectMap[playerX-1][playerY] == 2) { //rock
				//setTimeout('breakRock("l")',100);
			} else if (objectMap[playerX-1][playerY] == 3) { //sea
				//setTimeout('goFishing()',100);
			} else if (objectMap[playerX-1][playerY] == 4) { //shop
				setTimeout('shopMenu()',100);
			} else if (objectMap[playerX-1][playerY] == 5) { //flower
				harvests++;
				objectMap[playerX-1][playerY] = 0;
				document.getElementById("harvests").value = harvests;
				pts = pts + 30;
				money = money + harvestMoney;
				document.getElementById("money").value = money;
				document.getElementById("pts").value = pts;
			} else if (objectMap[playerX-1][playerY] == 6) { //gold flower
				harvests++;
				objectMap[playerX-1][playerY] = 0;
				document.getElementById("harvests").value = harvests;
				pts = pts + 50;
				money = money + harvestMoney*3;
				document.getElementById("money").value = money;
				document.getElementById("pts").value = pts;
			} else if (objectMap[playerX-1][playerY] == 8) { //tree flower
				if (saw > 0) {
					saw--;
					document.getElementById("saw").value = saw;					
					$('#status').html("<h2>You chop down a tree!</h2>");
					objectMap[playerX-1][playerY] = 0;
					wood++;
					document.getElementById("wood").value = wood;
				}
			} else if (objectMap[playerX-1][playerY] == 9) { //tree dead
				wood++;
				document.getElementById("wood").value = wood;
				objectMap[playerX-1][playerY] = 0;
			}
			break;
		case 40: //right
			if(!objectMap[playerX+1][playerY] > 0){
				playerX++;
				if (pts < 0) { pts--; document.getElementById("pts").value = pts; }
				//monsterChance();
			}
			if (objectMap[playerX+1][playerY] == 2) { //rock
				//setTimeout('breakRock("r")',100);
			} else if (objectMap[playerX+1][playerY] == 3) { //sea
				//setTimeout('goFishing()',100);
			} else if (objectMap[playerX+1][playerY] == 4) { //hut
				setTimeout('shopMenu()',100);
			} else if (objectMap[playerX+1][playerY] == 5) { //rock
				harvests++;
				objectMap[playerX+1][playerY] = 0;
				document.getElementById("harvests").value = harvests;
				pts = pts + 30;
				money = money + harvestMoney;
				document.getElementById("money").value = money;
				document.getElementById("pts").value = pts;
			} else if (objectMap[playerX+1][playerY] == 6) { //gold flower
				harvests++;
				objectMap[playerX+1][playerY] = 0;
				document.getElementById("harvests").value = harvests;
				pts = pts + 50;
				money = money + harvestMoney*3;
				document.getElementById("money").value = money;
				document.getElementById("pts").value = pts;
			} else if (objectMap[playerX+1][playerY] == 8) { //tree flower
				if (saw > 0) {
					saw--;
					document.getElementById("saw").value = saw;				
					$('#status').html("<h2>You chop down a tree!</h2>");
					objectMap[playerX+1][playerY] = 0;
					wood++;
					document.getElementById("wood").value = wood;
				}
			} else if (objectMap[playerX+1][playerY] == 9) { //tree dead
				wood++;
				document.getElementById("wood").value = wood;
				objectMap[playerX+1][playerY] = 0;
			}
			break;
		case 39: //up
			if(!objectMap[playerX][playerY-1] > 0){
				playerY--;
				if (pts < 0) { pts--; document.getElementById("pts").value = pts; }
				//monsterChance();
			}
			if (objectMap[playerX][playerY-1] == 2) { //rock
				//setTimeout('breakRock("u")',100);
			} else if (objectMap[playerX][playerY-1] == 3) { //sea
				//setTimeout('goFishing()',100);
			} else if (objectMap[playerX][playerY-1] == 4) { //rock
				setTimeout('shopMenu()',100);
			} else if (objectMap[playerX][playerY-1] == 5) { //rock
				harvests++;
				objectMap[playerX][playerY-1] = 0;
				document.getElementById("harvests").value = harvests;
				pts = pts + 30;
				money = money + harvestMoney;
				document.getElementById("money").value = money;
				document.getElementById("pts").value = pts;
			} else if (objectMap[playerX][playerY-1] == 6) { //gold flower
				harvests++;
				objectMap[playerX][playerY-1] = 0;
				document.getElementById("harvests").value = harvests;
				pts = pts + 50;
				money = money + harvestMoney*3;
				document.getElementById("money").value = money;
				document.getElementById("pts").value = pts;
			} else if (objectMap[playerX][playerY-1] == 8) { //tree flower
				if (saw > 0) {
					saw--;
					document.getElementById("saw").value = saw;				
					$('#status').html("<h2>You chop down a tree!</h2>");
					objectMap[playerX][playerY-1] = 0;
					wood++;
					document.getElementById("wood").value = wood;
				}
			} else if (objectMap[playerX][playerY-1] == 9) { //tree dead
				wood++;
				document.getElementById("wood").value = wood;
				objectMap[playerX][playerY-1] = 0;
			}
			break;
		case 37: //down
			if(!objectMap[playerX][playerY+1] > 0){
				playerY++;
				if (pts < 0) { pts--; document.getElementById("pts").value = pts; }
				//monsterChance();
			}
			if (objectMap[playerX][playerY+1] == 2) { //rock
				//setTimeout('breakRock("d")',100);
			} else if (objectMap[playerX][playerY+1] == 3) { //sea
				//setTimeout('goFishing()',100);
			} else if (objectMap[playerX][playerY+1] == 4) { //rock
				setTimeout('shopMenu()',100);
			} else if (objectMap[playerX][playerY+1] == 5) { //rock
				harvests++;
				objectMap[playerX][playerY+1] = 0;
				document.getElementById("harvests").value = harvests;
				pts = pts + 30;
				money = money + harvestMoney;
				document.getElementById("money").value = money;
				document.getElementById("pts").value = pts;
			} else if (objectMap[playerX][playerY+1] == 6) { //gold flower
				harvests++;
				objectMap[playerX][playerY+1] = 0;
				document.getElementById("harvests").value = harvests;
				pts = pts + 50;
				money = money + harvestMoney*3;
				document.getElementById("money").value = money;
				document.getElementById("pts").value = pts;
			} else if (objectMap[playerX][playerY+1] == 8) { //tree flower
				if (saw > 0) {
					saw--;
					document.getElementById("saw").value = saw;				
					$('#status').html("<h2>You chop down a tree!</h2>");
					objectMap[playerX][playerY+1] = 0;
					wood++;
					document.getElementById("wood").value = wood;
				}
			} else if (objectMap[playerX][playerY+1] == 9) { //tree dead
				wood++;
				document.getElementById("wood").value = wood;
				objectMap[playerX][playerY+1] = 0;
			}
			break;
		case 68:
			if (spade > 0) {
				treasureChance();
				document.getElementById("spade").value = spade;
			} else {
				$('#status').html("You're spade is broken, go to the shop.");
			}
			break;
		case 32:
			//shopMenu();
			break;
		case 66:
			brickMenu();
			break;
		case 84:
			plantTree();
			break;
		case 83:
			plantSeed();
			break;
		case 69:
			eatFish();
			break;
		case 70:
			goFishing();
			break;
		case 82:
			breakRock();
			break;
		default:
			break;
	}
	tmpEle = document.getElementById("coords");
	tmpCoord = playerX + ", " + playerY;
	tmpEle.value = tmpCoord;
}

function zombieMove() {
	var rndZ = Math.floor(Math.random() * 4);
	if (rndZ == 0) {
		if (objectMap[zombieX-1][zombieY] > 0) {
		
		} else {
			zombieX--;
			if (zombieX < 0) {
				zombieX++;
			}
		}
	} else if (rndZ == 1) {
		if (objectMap[zombieX+1][zombieY] > 0) {
		
		} else {
			zombieX++;
			if (zombieX > 14) {
				zombieX--;
			}
		}
	} else if (rndZ == 2) {
		if (objectMap[zombieX][zombieY-1] > 0) {
		
		} else {
			zombieY--;
			if (zombieY < 0) {
				zombieY++;
			}
		}
	} else if (rndZ == 3) {
		if (objectMap[zombieX][zombieY+1] > 0) {
		
		} else {
			zombieY++;
			if (zombieY > 19) {
				zombieY--;
			}
		}
	}
	if (playerX == zombieX && playerY == zombieY) {
		rndAttack = Math.floor(Math.random() * 15) + 1;
		health = health - rndAttack;
		document.getElementById("hp").value = health;
		$('#status').html("<h1 style='color:red;'>You ran into a zombie!<br />-"+rndAttack+" health!");
	}
	/**z2**/
	var rndZa = Math.floor(Math.random() * 4);
	if (rndZa == 0) {
		if (objectMap[zombieXa-1][zombieYa] > 0) {
		
		} else {
			zombieXa--;
			if (zombieXa < 0) {
				zombieXa++;
			}
		}
	} else if (rndZa == 1) {
		if (objectMap[zombieXa+1][zombieYa] > 0) {
		
		} else {
			zombieXa++;
			if (zombieXa > 14) {
				zombieXa--;
			}
		}
	} else if (rndZa == 2) {
		if (objectMap[zombieXa][zombieYa-1] > 0) {
		
		} else {
			zombieYa--;
			if (zombieYa < 0) {
				zombieYa++;
			}
		}
	} else if (rndZa == 3) {
		if (objectMap[zombieXa][zombieYa+1] > 0) {
		
		} else {
			zombieYa++;
			if (zombieYa > 19) {
				zombieYa--;
			}
		}
	}
	if (playerX == zombieXa && playerY == zombieYa) {
		rndAttacka = Math.floor(Math.random() * 15) + 1;
		health = health - rndAttacka;
		document.getElementById("hp").value = health;
		$('#status').html("<h1 style='color:red;'>You ran into a zombie!<br />-"+rndAttacka+" health!");
	}
	/**z3**/
	var rndZb = Math.floor(Math.random() * 4);
	if (rndZb == 0) {
		if (objectMap[zombieXb-1][zombieYb] > 0) {
		
		} else {
			zombieXb--;
			if (zombieXb < 0) {
				zombieXb++;
			}
		}
	} else if (rndZb == 1) {
		if (objectMap[zombieXb+1][zombieYb] > 0) {
		
		} else {
			zombieXb++;
			if (zombieXb > 14) {
				zombieXb--;
			}
		}
	} else if (rndZb == 2) {
		if (objectMap[zombieXb][zombieYb-1] > 0) {
		
		} else {
			zombieYb--;
			if (zombieYb < 0) {
				zombieYb++;
			}
		}
	} else if (rndZb == 3) {
		if (objectMap[zombieXb][zombieYb+1] > 0) {
		
		} else {
			zombieYb++;
			if (zombieYb > 19) {
				zombieYb--;
			}
		}
	}
	if (playerX == zombieXb && playerY == zombieYb) {
		rndAttackb = Math.floor(Math.random() * 15) + 1;
		health = health - rndAttackb;
		document.getElementById("hp").value = health;
		$('#status').html("<h1 style='color:red;'>You ran into a zombie!<br />-"+rndAttackb+" health!");
	}
}

$('#buysaw').live('click',function() {
	if (money > 14 && wood > 0 && stone > 0) { //one wood one stone 10 cash
		saw++;
		money = money - 10;
		wood = wood - 1;
		stone = stone - 1;
		document.getElementById("saw").value = saw;
		document.getElementById("money").value = money;
		document.getElementById("stone").value = stone;
		document.getElementById("wood").value = wood;
	} else {
		alert("Need: 10money, 1wood and 1stone for a saw.");
	}
	return false;
});
$('#buyhammer').live('click',function() {
	if (money > 9 && wood > 1) { //one wood one stone 10 cash
		hammer++;
		money = money - 10;
		wood = wood - 2;
		stone = stone - 1;
		document.getElementById("hammer").value = hammer;
		document.getElementById("money").value = money;
		document.getElementById("stone").value = stone;
		document.getElementById("wood").value = wood;
	} else {
		alert("Need: 10money and 2wood for a hammer.");
	}
	return false;
});
$('#buyspade').live('click',function() {
	if (money > 4 && wood > 0) { //one wood 5 cash
		spade = spade + 5;
		money = money - 5;
		wood = wood - 1;
		document.getElementById("spade").value = spade;
		document.getElementById("money").value = money;
		document.getElementById("wood").value = wood;
	} else {
		alert("Need: 5money and 1wood for 5 spades.");
	}
	return false;
});

function breakRock() {
	if (hammer > 0) { //you can only place rocks when you run out of hammers
		if (objectMap[playerX-1][playerY] == 2) {
			objectMap[playerX-1][playerY] = 0;
		}
		if (objectMap[playerX+1][playerY] == 2) {
			objectMap[playerX+1][playerY] = 0;
		}
		if (objectMap[playerX][playerY-1] == 2) {
			objectMap[playerX][playerY-1] = 0;
		}
		if (objectMap[playerX][playerY+1] == 2) {
			objectMap[playerX][playerY+1] = 0;
		}
		hammer--;
		stone = stone + 2;
		document.getElementById("stone").value = stone;
		document.getElementById("hammer").value = hammer;
		document.getElementById("pts").value = pts;
	} else {
		if (stone > 1) {
			if (objectMap[playerX][playerY] < 1) {
				objectMap[playerX][playerY] = 2;
				stone = stone - 2;
				document.getElementById("stone").value = stone;
			} else {
				$('#status').html("You can't build on this land!");
			}
		} else {
			$('#status').html("You need at least 2 stone to build.");
		}
	}
}

function eatFish() {
	if (fish > 0) {
		fish = fish - 1;
		document.getElementById("fish").value = fish;
		health = health + 15;
		document.getElementById("hp").value = health;
		pts = pts - 10;
		document.getElementById("pts").value = pts;
	} else {
		$('#status').html("You have no fish!");
	}
}

function shopMenu() {
	$('#status').html(
		'<div id="buildmenu">'
			+'<h2 style="color:#fff;">BUILD MENU</h2>'
			+'<hr><br />'
			+'<a style="color:#fff;cursor:pointer;" href="#" id="buysaw">SAW - 10money</a><br />'
			+'<a style="color:#fff;cursor:pointer;" href="#" id="buyhammer">HAMMER - 10money</a><br />'
			+'<a style="color:#fff;cursor:pointer;" href="#" id="buyspade">SPADE - 5money</a>'
			+'<br /><br /><hr>'
			+'<h2 style="color:#fff;">SEED MENU</h2>'
			+'<hr><br />'
			+'<a style="color:#fff;cursor:pointer;" href="#" id="buyStatue">Statue - 10money</a><br />'
			+'<a style="color:#fff;cursor:pointer;" href="#" id="buyTreeSeed">Tree Seed - 7money</a><br />'
			+'<a style="color:#fff;cursor:pointer;" href="#" id="buyFlowerSeed">Flower Seed - 10money</a><br />'
		+'</div>'
	);
}

$('#buyStatue').live('click',function() {
	buyStatue();
});
$('#buyFlowerSeed').live('click',function() {
	buyFlowerSeed();
});
$('#buyTreeSeed').live('click',function() {
	buyTreeSeed();
});

function buyStatue() {
	if (money > 9) {
		money = money - 10;
		statue++;
		document.getElementById("statue").value = statue;
		document.getElementById("money").value = money;
	} else {
		$('#status').html("You haven't got the minimum 10moneys");	
	}
}

function buyFlowerSeed() {
	if (money > 9) {
		money = money - 10;
		seeds++;
		document.getElementById("seeds").value = seeds;
		document.getElementById("money").value = money;
	} else {
		$('#status').html("You haven't got the minimum 10moneys");	
	}
}

function buyTreeSeed() {
	if (money > 6) {
		money = money - 7;
		treeSeeds++;
		document.getElementById("treeseeds").value = treeSeeds;
		document.getElementById("money").value = money;
	} else {
		$('#status').html("You haven't got the minimum 7moneys");	
	}
}

function goFishing() {
	if (map[playerX-1][playerY] == 1 || map[playerX+1][playerY] == 1 || map[playerX][playerY-1] == 1 || map[playerX][playerY+1] == 1) {
		$('#status').html("<h2 style='color:#fff;'>You are now fishing...</h2>");
		document.onkeydown = function() {
			rndFish = Math.floor(Math.random() * 2)+1;
			//ctx = document.getElementById('main').getContext('2d');
			//ctx.drawImage('flowers.png',playerX,playerY);
		};
		setTimeout('nowFishing()',Math.floor(Math.random() * fishingTimeMax) + fishingTimeMin);
	} else {
		$('#status').html("<h2 style='color:lightblue;'>There's no water!</h2>");
	}
}

function genFishName() {
	RndFishName = Math.floor(Math.random() * 2);
	if (RndFishName==0) { 
		fishName = " small carp";
		fishingPoints = 10;
	} else if (RndFishName==1) {
		fishName = " medium carp";
		fishingPoints = 20;
	} else if (RndFishName==2) {
		fishName = " large carp";
		fishingPoints = 30;
	}
}

function nowFishing() {
	rndCatch = Math.floor(Math.random() * 100) + 1;
	if (rndCatch > 85) {
		genFishName();
		$('#status').html("<h2 style='color:lightgreen;'>Yeah! Caught a fish!</h2><br />It's a <font style='font-size:24px; color:lightgreen;'>"+fishName+"</font>");
		fish = fish + 1;
		if (money < fishingCost) {
			$('#status').html("<h2 style='color:red;'>You can't pay the fee! Get beaten up! -10hp</h2>");
			$('#status').animate({ opacity:1 },'fast',function() { $('#status').animate({ opacity:0.5 },'fast'); });
			health = health - 10;
			document.getElementById("hp").value = health;
		} else {
			money = money - fishingCost;
			pts = pts + fishingPoints;
			document.getElementById("money").value = money;
			document.getElementById("pts").value = pts;
			document.getElementById("fish").value = fish;
		}
	} else {
		$('#status').html("<h1 style='color:#fff;'>No luck this time</h1>");
	}
	//monsterChance();
	document.onkeydown = checkKeycode;
}

function plantSeed() { //planted a seed
	if (seeds > 0) {
		seeds--;
		map[playerX][playerY] = 7;
		document.getElementById("seeds").value = seeds;
		setTimeout('growSeed('+playerX+','+playerY+')', Math.floor(Math.random()*growingTimeMax)+growingTime);
	} else {
		$('#status').html("You have no seeds, visit the shop!");
	}
}

function growSeed(x,y) { //seeds-a-growing
	map[x][y] = 0;
	rndFlower = Math.floor(Math.random() * 100);
	if (rndFlower > 85) {
		objectMap[x][y] = 6;
	} else {
		objectMap[x][y] = 5;
		
	}
	document.getElementById("pts").value = pts;
}

function plantTree() { //planted a treeSeeds
	if (treeSeeds > 0) {
		treeSeeds--;
		map[playerX][playerY] = 7;
		document.getElementById("treeseeds").value = treeSeeds;
		setTimeout('growTreeSmall('+playerX+','+playerY+')', Math.floor(Math.random()*growingTimeTreeMax)+growingTimeTree);
	} else {
		$('#status').html("You have no treeSeeds, visit the shop!");
	}
}

function growTreeSmall(x,y) { //treeSeeds-a-growing
	map[x][y] = 0;
	objectMap[x][y] = 7;
	document.getElementById("treeseeds").value = treeSeeds;
	setTimeout('growTreeLarge('+x+','+y+')', Math.floor(Math.random()*growingTimeTreeMax)+growingTimeTree);
}

function growTreeLarge(x,y) { //treeSeeds-a-grown
	objectMap[x][y] = 8;
	pts = pts + 30;
	document.getElementById("pts").value = pts;
	setTimeout('growTreeDead('+x+','+y+')', Math.floor(Math.random()*growingTimeTreeMax)+growingTimeTree);
}

function growTreeDead(x,y) { //treeSeeds-a-grown
	objectMap[x][y] = 9;
}

function monsterChance() { //are you going to be "attacked"?
	rndTile = map[playerX][playerY];
	if (rndTile == 3 || rndTile == 4 || rndTile == 5) {
		//safe
		changeStatus('white');
		document.getElementById("hp").style.backgroundColor = "#c4c4c4";
		document.getElementById("hp").style.color = "#000";
	} else {
		rndMonster = Math.floor(Math.random() * 100);
		if (rndMonster < 25) {
			tmpAttack = Math.floor(Math.random() * 14) + 1;
			
			//events update
			eventUpdate = tmpAttack;
			health = health - tmpAttack;
			
			$('#status').html("<strong style='color:red;'>You tripped over your feet again!!<br /></strong><br /><h2 style='font-size:18px;'>-"+tmpAttack+"hp</h2>");
			$('#status').animate({ opacity:1 },'fast',function() { $('#status').animate({ opacity:0.5 },'fast'); });
			document.getElementById("hp").style.backgroundColor = "red";
			document.getElementById("hp").style.color = "#fff";
			document.getElementById("hp").value = health;
		} else {
			rndPhrase = Math.floor(Math.random() * 3);
			changeStatus('orange');
			document.getElementById("hp").style.backgroundColor = "orange";
			document.getElementById("hp").style.color = "#000";
		}
		if (health < 1) {
			alert(
				"GAME OVER.\r\n"
				+"----------\r\n"
				+"I'm afraid you got too injured to garden anymore!\r\n"
				+"-------------------------------------------------\r\n"
				+"POINTS: "+pts+"\r\n"
				+"HARVESTED FLOWERS: "+harvests+"\r\n"
				+"MONEY: "+money+"\r\n"
				+"FISH: "+fish+"\r\n"
				+"TIME: "+time
			);
			ctx = document.getElementById("main").getContext("2d");
			window.location.reload();
		}
	}
}

function repairTools() { //repair your shovel
	if (money >= 15) {
		money = money - 15;
		pts = pts - 30;
		document.getElementById("money").value = money;
		document.getElementById("pts").value = pts;
		spade = spade + 8;
		document.getElementById("spade").value = spade;
		$('#status').html("Your spade has been repaired!<br >");
	} else {
		$('#status').html("You must have 15moneys to repair!");
	}
}

function brickMenu() { //place a brick
	if (statue > 0) {
		if (map[playerX][playerY] > 0) {
			$('#status').html("You cannot build on this land!");
		} else {
			statue--;
			objectMap[playerX][playerY] = 1;
			pts = pts + 20;
		}
	} else {
		$('#status').html("You have no statues!");
	}
}

function loadAll(){ //load the game
	if(loaded == tileDict.length + charDict.length + objectDict.length){
		clearInterval(loadTimer);
		loadTimer = setInterval(gameUpdate,100);
	}
}
 
function changeStatus(col) {
	if (col == "orange") {
		if (rndPhrase == 0) {
			$('#status').html("<em>Be warey, don't fall over clumsy rabbit!</em>");
		} else if (rndPhrase == 1) {
			$('#status').html("<em>oh oh bunny! You're big feet could trip over here!</em>");
		} else {
			$('#status').html("<em>Careful now clumsy, don't want to trip!</em>");
		}
	} else if (col == "white") {
		//$('#status').html("<em>Ahh, a nice path - you'll be safe here!</em>"); //overwrites the fishing dialog...
	}
}
 
function drawMap(){ //draw the map (in intervals)
	var tileH = 25;
	var tileW = 50;
	mapX = 80;
	mapY = 10;
	for(i=0;i<map.length;i++){
		for(j=0;j<map[i].length;j++){
			var drawTile= map[i][j];
			var drawObj = objectMap[i][j];
			var xpos = (i-j)*tileH + mapX*4.5;
			var ypos = (i+j)*tileH/2+ mapY*3.0;
			ctx.drawImage(tileImg[drawTile],xpos,ypos);
			
			if(drawObj){
				if (drawObj > 0) {
					ctx.drawImage(objectImg[drawObj-1],xpos,ypos-(objectImg[drawObj-1].height/2));
				}
				/*if (drawObj == 1) {
					ctx.drawImage(objectImg[drawObj-1],xpos,ypos-(objectImg[drawObj-1].height/2));
				} else if (drawObj == 2) {
					ctx.drawImage(objectImg[drawObj-1],xpos,ypos-(objectImg[drawObj-1].height/2));
				} else if (drawObj == 4) {
					ctx.drawImage(objectImg[drawObj-1],xpos,ypos-(objectImg[drawObj-1].height/2));
				} else if (drawObj == 5) {
					ctx.drawImage(objectImg[drawObj-1],xpos,ypos-(objectImg[drawObj-1].height/2));
				} else if (drawObj == 6) {
					ctx.drawImage(objectImg[drawObj-1],xpos,ypos-(objectImg[drawObj-1].height/2));
				} else if (drawObj == 7) {
					ctx.drawImage(objectImg[drawObj-1],xpos,ypos-(objectImg[drawObj-1].height/2));
				} else if (drawObj == 8) {
					ctx.drawImage(objectImg[drawObj-1],xpos,ypos-(objectImg[drawObj-1].height/2));
				} else if (drawObj == 9) {
					ctx.drawImage(objectImg[drawObj-1],xpos,ypos-(objectImg[drawObj-1].height/2));
				}*/
			}
			if(i == playerX && j == playerY){
				you = ctx.drawImage(charImg[0],xpos,ypos-(charImg[0].height/2));
			}
			if(i == zombieX && j == zombieY){
				enemy = ctx.drawImage(charImg[1],xpos,ypos-(charImg[0].height/2));
			}
			if(i == zombieXa && j == zombieYa){
				enemy = ctx.drawImage(charImg[1],xpos,ypos-(charImg[0].height/2));
			}
			if(i == zombieXb && j == zombieYb){
				enemy = ctx.drawImage(charImg[1],xpos,ypos-(charImg[0].height/2));
			}
			/*if(i == xmouse && j == ymouse){
				ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
				ctx.beginPath();
				ctx.moveTo(xpos, ypos+12.5);
				ctx.lineTo(xpos+25, ypos);
				ctx.lineTo(xpos+50, ypos+12.5);
				ctx.lineTo(xpos+25, ypos+25);
				ctx.fill();
			}*/
		}
	}
}
 
function init(){ //initialise the main functions and even handlers
	setInterval('updateClock()',1000);
	$('#start,#help').remove();
	$('#hud,#main,#status,#infoKey').fadeIn(350);
	ctx = document.getElementById('main').getContext('2d');
	loadImg();
	loadTimer = setInterval(loadAll,100);
	//document.getElementById("main").addEventListener("mousemove", mouseCheck, false);
	//document.getElementById("main").addEventListener("mousedown", mouseClick, false);
	document.onkeydown = checkKeycode;
	$('#status').html("<h2>WELCOME!<br />Start by pressing <em>HELP</em> or by DIGGING (d).<br /><br />Beware of zombie rabbits - be careful!</h2>");
	document.getElementById("money").value = money;
	document.getElementById("spade").value = spade;
	document.getElementById("dirt").value = dirt;
	document.getElementById("hp").value = health;
	document.getElementById("seeds").value = seeds;
	document.getElementById("pts").value = pts;
	document.getElementById("harvests").value = harvests;
	document.getElementById("fish").value = fish;
	document.getElementById("hammer").value = hammer; /* LOL unintentional hammertime */
	document.getElementById("time").value = time;
	document.getElementById("treeseeds").value = treeSeeds;
	document.getElementById("saw").value = saw;
	document.getElementById("wood").value = wood;
	document.getElementById("stone").value = stone;
	document.getElementById("statue").value = statue;
	tmpEle = document.getElementById("coords");
	tmpCoord = playerX + ", " + playerY;
	tmpEle.value = tmpCoord;
}

/*function mouseCheck(e){
	var x = e.pageX;
	var y = e.pageY;
	var ctx = document.getElementById('main');
	ymouse= (2 * (y - ctx.offsetTop - mapY) - x + ctx.offsetLeft + mapX) / 2;
	xmouse= x + ymouse - mapX - 25 - ctx.offsetLeft;
	ymouse= Math.round(ymouse/25);
	xmouse= Math.round(xmouse/25);
}

function mouseClick(e) {
	var tile = document.getElementById('tile').value;
	map[xmouse][ymouse] = tile;
}*/

function gameUpdate() { //update the game, clear canvas etc
	ctx.clearRect(0,0,904,460);	
	
	ctx.fillStyle = "rgba(255, 255, 255, 1.0)"; //assign color
	//event = ctx.fillText("Injured: -"+eventUpdate,2,16); //new event text
	drawMap();
}

function updateClock() {
	time++;
	document.getElementById("time").value = time;
}