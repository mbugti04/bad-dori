var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

// variables
var notew = 100, noteh = 30
var notespeed = 3;

var line = (canvas.height - noteh*4);

var l1 = (canvas.width - (notew * 6)) / 2, l2 = l1 + notew, l3 = l2 + notew, l4 = l3 + notew, l5 = l4 + notew;

var notes = [
	{x:l1, y:-noteh, sec: 7.601, active:true},
	{x:l2, y:-noteh, sec: 8.985, active:true},  
	{x:l3, y:-noteh, sec: 10.2, active:true},   
	{x:l4, y:-noteh, sec: 11.475, active:true}, 
	{x:l1, y:-noteh, sec: 12.757, active:true}, 
	{x:l2, y:-noteh, sec: 13.982, active:true}, 
	{x:l1, y:-noteh, sec: 15.019, active:true}, 
	{x:l1, y:-noteh, sec: 15.332, active:true}, 
	{x:l2, y:-noteh, sec: 17.517, active:true}, 
	{x:l2, y:-noteh, sec: 17.81, active:true},  
	{x:l1, y:-noteh, sec: 20.097, active:true}, 
	{x:l1, y:-noteh, sec: 20.408, active:true}, 
	{x:l2, y:-noteh, sec: 21.352, active:true}, 
	{x:l2, y:-noteh, sec: 21.693, active:true},
];

var canvasbg = new Image()
canvasbg.src = 'yukina2.png';

var hitnotes = 0;
var missnotes = 0;

var game_started = false;

setup()

var startTime = 0;
var elapsedTime = 0;
function gameloop()
{
	elapsedTime = performance.now() - startTime;
	// console.log(`hhh time passed: ${elapsedTime}`);

	updateNotes(elapsedTime);
}

function setup()
{
	drawSetup();
	var music = new Audio('R.ogg');
	music.volume = 0.5;

	let playAttempt = setInterval(() => {
		music.play()
		  .then(() => {
			clearInterval(playAttempt);
			startTime = performance.now()
			console.log(`start time: ${startTime}`)
			setInterval(gameloop, 1000/60);
			setInterval(draw, 1000/60);
		  })
		  .catch(error => {
			// console.log('Unable to play the video, User has not interacted yet.');
		  });
	  }, 1);	  
}

function updateNotes(elapsedTime)
{
	timeInSec = elapsedTime / 1000;
	timeToPass = line/(notespeed*60);
	for (var j = 0; j < notes.length; j++)
	{
		diff = notes[j].sec - timeInSec;
		// if it's active, move it down
		if (notes[j].active)
		{
			px = line - (diff * notespeed * 60);
			notes[j].y = px;
			// console.log(`note ${j}!!!! time rn: ${timeInSec}, timetopass: ${timeToPass}, diff: ${diff}, px: ${px}`);
		}
		// if it goes below the line, delete it
		if (notes[j].active && notes[j].y >= line+(noteh*1.5))
		{
			notes[j].active = false;
			missnotes += 1;
		}
	}
}

function update()
{
	updateNotes();
}

function drawSetup()
{
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	canvasbg.onload = function()
	{
		ctx.globalAlpha = 0.7;
		ctx.drawImage(canvasbg, 0, 0);
		ctx.globalAlpha = 1;

		ctx.font = "30px Comic Sans MS";
		ctx.fillStyle = "red";
		ctx.textAlign = "center";

		ctx.fillText("R - Roselia", canvas.width/2, canvas.height/2);
		ctx.fillText("Click to start", canvas.width/2, canvas.height/2 + 50)
	}
	// ctx.globalAlpha = 1;
}

function drawCanvasbg()
{
	ctx.globalAlpha = 0.5;
	ctx.drawImage(canvasbg, 0, 0);
	ctx.globalAlpha = 1;
}

function drawNotes()
{
	for (var j = 0; j < notes.length; j++)
	{
		if (notes[j].active)
		{
			ctx.beginPath();
			ctx.rect(notes[j].x, notes[j].y - noteh/2, notew, noteh);
			ctx.fillStyle = "#0095DD";
			ctx.fill();
			ctx.closePath();
		}
	}
}

function drawLine()
{
	ctx.globalAlpha = 0.5;
	ctx.beginPath();
	ctx.rect(0, line, canvas.width, noteh);
	ctx.fillStyle = "#000000";
	ctx.fill();
	ctx.closePath();

	for (var j = 0; j < 5; j++)
	{
		ctx.beginPath();
		ctx.rect((canvas.width - (notew * 6)) / 2 + j*notew, line, notew, noteh);
		if (j % 2 == 0)
			ctx.fillStyle = "#4d8bf0";
		else
			ctx.fillStyle = "#4ddaf0";
		ctx.fill();
		ctx.closePath();
	}

	ctx.globalAlpha = 1;
}

function drawText()
{
	ctx.font = "30px Comic Sans MS";
	ctx.fillStyle = "red";
	ctx.textAlign = "center";

	ctx.globalAlpha = 0.7;
	ctx.fillText("*Yukina noises*", canvas.width/2, canvas.height/2 + 30);
	ctx.globalAlpha = 1;

	ctx.font = "30px Comic Sans MS";
	ctx.fillStyle = "red";
	ctx.textAlign = "left";

	ctx.fillText("Hit: " + hitnotes, 10, 40);
	ctx.fillText("Miss: " + missnotes, 10, 80)

	ctx.font = "25px Comic Sans MS";
	ctx.fillStyle = "red";
	ctx.textAlign = "left";
	ctx.fillText('Elapsed time: ' + elapsedTime/1000, 700, 50)
}

function draw()
{
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawCanvasbg();
	drawNotes();
	drawLine();
	drawText();
}

function getLane(coords)
{
	if (coords.x >= l1 && coords.x  < l1 + notew)
		return 0;
	else if (coords.x >= l2 && coords.x < l2 + notew)
		return 1;
	else if (coords.x >= l3 && coords.x < l3 + notew)
		return 2;
	else if (coords.x >= l4 && coords.x < l4 + notew)
		return 3;
	else if (coords.x >= l5 && coords.x < l5 + notew)
		return 4;
	return -1;
}

function laneToCoords(lane)
{
	return lane * notew + (canvas.width - (notew * 6)) / 2
}

function insideRect(x, y, rx, rw, ry, rh)
{
	if (x >= rx && x <= rw && y >= ry && y <= rh)
		return true;
	return false;
}

function collisionCheck(coords)
{
	var nextNote = null;
	for (var i = 0; i < notes.length; i++)
	{
		nextNote = notes[i];
		if (nextNote.active)
			break;
	}
	var noteLane = getLane({x:nextNote.x});
	var clickLane = getLane(coords)

	// console.log(`note: ${noteLane} vs click: ${clickLane}`)

	// if the click is inside the line
	if (insideRect(coords.x, coords.y, 0, canvas.width, line, canvas.height - noteh*3))
	{
		// if wrong lane, it's a miss
		if (clickLane != noteLane)
		{
			missnotes += 1;
			nextNote.active = false;
		}
		// if right lane
		else
		{
			// if note is inside of line
			if (insideRect(nextNote.x, nextNote.y, 0, canvas.width, line, canvas.height - noteh*3))
			{
				hitnotes += 1;
				nextNote.active = false;
			}
		}
	}
}

function getCursorPosition(canvas, event)
{
	var rect = canvas.getBoundingClientRect()
	var x = event.clientX - rect.left
	var y = event.clientY - rect.top
	// console.log("x: " + x + " y: " + y)
	return {x: x, y: y}
}

c.addEventListener('mousedown', function(e)
{
	coords = getCursorPosition(canvas, e)
	// console.log(`${elapsedTime/1000}`);
	collisionCheck(coords)
})

// c.addEventListener('touchstart', function(e)
// {
// 	// coords = getCursorPosition(canvas, e)
// 	clientX = e.touches[0].clientX;
//   	clientY = e.touches[0].clientY;
// 	// coords = {x: e.touches.clientX, y: e.touches.clientY}
// 	coords = {x: clientX, y: clientY}
// 	collisionCheck(coords)
// })