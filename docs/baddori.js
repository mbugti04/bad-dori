var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

// variables
var notew = 100, noteh = 30
var l1 = (canvas.width - (notew * 6)) / 2, l2 = l1 + notew, l3 = l2 + notew, l4 = l3 + notew, l5 = l4 + notew; //, LANE2 = LANE1 + notew, LANE3 = LANE2 + notew, LANE4 = LANE3 + notew, LANE5 = LANE4 + notew;
// var note = {x:l1, y:0}
var notes = [
	{x:l1, y:0, active:true}, {x:l2, y:-100, active:true}
];

var canvasbg = new Image()
canvasbg.src = 'yukina2.png';

var notespeed = 3;

var hitnotes = 0;
var missnotes = 0;

var game_started = false;

setup()

function setup()
{
	drawSetup();
	var music = new Audio('R.ogg');

	let playAttempt = setInterval(() => {
		music.play()
		  .then(() => {
			clearInterval(playAttempt);
			setInterval(draw, 10)
		  })
		  .catch(error => {
			console.log('Unable to play the video, User has not interacted yet.');
		  });
	  }, 1);	  
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
			ctx.rect(notes[j].x, notes[j].y, notew, noteh);
			ctx.fillStyle = "#0095DD";
			ctx.fill();
			ctx.closePath();
		}

		notes[j].y += notespeed;
	}
}

function drawLine()
{
	ctx.globalAlpha = 0.5;
	ctx.beginPath();
	ctx.rect(0, canvas.height - noteh*4, canvas.width, noteh);
	ctx.fillStyle = "#000000";
	ctx.fill();
	ctx.closePath();

	for (var j = 0; j < 5; j++)
	{
		ctx.beginPath();
		ctx.rect((canvas.width - (notew * 6)) / 2 + j*notew, canvas.height - noteh*4, notew, noteh);
		if (j % 2 == 0)
			ctx.fillStyle = "#4d8bf0";
		else
			ctx.fillStyle = "#4ddaf0";
		ctx.fill();
		ctx.closePath();
	}

	ctx.globalAlpha = 1;
}

function drawScore()
{
	ctx.font = "30px Comic Sans MS";
	ctx.fillStyle = "red";
	ctx.textAlign = "center";

	ctx.globalAlpha = 0.7;
	// ctx.fillText("*Yukina noises*", canvas.width/2, canvas.height/2 + 30);
	ctx.globalAlpha = 1;

	ctx.fillText("Hit: " + hitnotes, 50, 30);
	ctx.fillText("Miss: " + missnotes, 60, 70)
}

function draw()
{
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawCanvasbg();
	drawNotes();
	drawLine();
	drawScore();
}

function getLane(coords)
{
	console.log(`l1: ${l1}, ${l1 + notew}`)
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
	// console.log(`${rx} < ${x} < ${rw}`)
	// console.log(`${ry} < ${y} < ${rh}`)
	if (x >= rx && x <= rw && y >= ry && y <= rh)
		return true;
	return false;
}

function collisionCheck(coords)
{
	// if click is inside the line
	if (insideRect(coords.x, coords.y, 0, canvas.width, canvas.height - noteh*4, canvas.height - noteh*3))
	{
		// console.log('clicked inside line')
		lane = getLane(coords);
		for (var j = 0; j < notes.length; j++)
		{
			note = notes[j];
			// note in the right lane
			console.log(`note: ${{x: note.x}.x}, ${getLane({x: note.x})}, click: ${lane}`)
			if (getLane({x: note.x}) == lane)
			{
				console.log(`correct lane`)
				if (note.y < canvas.height - noteh*4 || note.y > canvas.height - noteh*3)
				{
					missnotes += 1;
					note.active = false;
				}
				else if (insideRect(note.x, note.y, 0, canvas.width, canvas.height - noteh*4, canvas.height - noteh*3))
				{
					hitnotes += 1;
					note.active = false;
				}
			}
		}
	}
}

function getCursorPosition(canvas, event)
{
    var rect = canvas.getBoundingClientRect()
    var x = event.clientX - rect.left
    var y = event.clientY - rect.top
    console.log("x: " + x + " y: " + y)
	return {x: x, y: y}
}

c.addEventListener('mousedown', function(e)
{
    coords = getCursorPosition(canvas, e)
	collisionCheck(coords)
})

c.addEventListener('touchstart', function(e)
{
    coords = getCursorPosition(canvas, e)
	collisionCheck(coords)
})