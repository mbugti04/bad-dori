var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

// variables
var notew = 100, noteh = 30
var l1 = (canvas.width - (notew * 6)) / 2, l2 = l1 + notew, l3 = l2 + notew, l4 = l3 + notew, l5 = l4 + notew; //, LANE2 = LANE1 + notew, LANE3 = LANE2 + notew, LANE4 = LANE3 + notew, LANE5 = LANE4 + notew;
// var note = {x:l1, y:0}
var notes = [
	{x:l1, y:0}, {x:l2, y:-100}
];

var canvasbg = new Image()
canvasbg.src = 'yukina2.png';

var notespeed = 3

setup()

function setup()
{
	// yukina();
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
		ctx.beginPath();
		ctx.rect(notes[j].x, notes[j].y, notew, noteh);
		ctx.fillStyle = "#0095DD";
		ctx.fill();
		ctx.closePath();

		notes[j].y += notespeed;
	}
}

function draw()
{
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawCanvasbg();
	drawNotes();
}
setInterval(draw, 10)

function collisionCheck(coords)
{

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