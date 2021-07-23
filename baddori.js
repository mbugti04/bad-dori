var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

var img = new Image();
img.onload = function() {
	ctx.globalAlpha = 0.5;
	ctx.drawImage(img, 0, 0);
	ctx.globalAlpha = 1;
};
img.src = 'yukina.png';