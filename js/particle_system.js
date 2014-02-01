
var particleSystem = function(cfg)
{
  this.initCFG(cfg);

  this.canvas = document.getElementById(this.canvas_id);
  this.ctx = this.canvas.getContext("2d");

  this.width = window.innerWidth;
  this.height = window.innerHeight;

  this.canvas.width = this.width;
  this.canvas.height = this.height;

  this.initMessage();

  // create the particles, add base 2 number, higher = less particles
  for(var i=0;i<this.area.length;i+=256)
  {
    this.particles.push(new particle({
      x: this.area[i][0],
      y: this.area[i][1],
      vx: Math.floor((Math.random() * 2) -1),
      vy: Math.floor((Math.random() * 2) -1)
    },this.ctx));
  }
};

particleSystem.prototype.initCFG = function(cfg)
{
  cfg = cfg || {};

  this.fps = cfg.fps || 30;
  this.now;
  this.dist;
  this.then = Date.now();
  this.interval = 1000/this.fps;
  this.delta;
  this.canvas_id = cfg.canvas_id || "canvas";
  this.min_dist = cfg.min_dist || 20;
  this.particles = [];
};

particleSystem.prototype.initMessage = function()
{
  this.str = "2764";
  this.fontStr = "500pt Helvetica Arial, sans-serif";

  this.ctx.beginPath();
  this.ctx.font = this.fontStr;
  this.ctx.textAlign = "center";
  this.ctx.fillStyle = "#ffffff";
  this.ctx.fillText(String.fromCharCode(parseInt(this.str, 16)),this.width/2 ,this.height - 50);
  this.ctx.closePath();

  this.mask = this.ctx.getImageData(0,0,this.width,this.height);
  this.area = [];

  // save all white pixels, these will be used as the bounds for the particles
  for (var i = 0; i < this.mask.data.length; i += 4) 
  {
    if (this.mask.data[i] == 255 && this.mask.data[i+1] == 255 && this.mask.data[i+2] == 255 && this.mask.data[i+3] == 255) 
    {
      this.area.push([this.toPosX(i,this.mask.width),this.toPosY(i,this.mask.width)]);
    }
  }

  this.repaint();
};

particleSystem.prototype.update = function()
{
  for(var i=0;i<this.particles.length;i++)
  {
    // reverse direction if moving onto a black pixel
    if(this.isBlackPixelX(this.particles[i]))
    {
      this.particles[i].vx *= -1;
    }

    if(this.isBlackPixelY(this.particles[i]))
    {
      this.particles[i].vy *= -1;
    }

    this.particles[i].x += this.particles[i].vx;
    this.particles[i].y += this.particles[i].vy;

    for(var j=0;j<this.particles.length;j++)
    {
      if(this.areClose(this.particles[i],this.particles[j]))
      {
        this.drawConnectionLine(this.particles[i],this.particles[j]);
      }
    }
  }
};

particleSystem.prototype.drawConnectionLine = function(p1, p2)
{
  // Draw the line between particles, opacity based on distance
  this.ctx.beginPath();
  this.ctx.strokeStyle = "rgba(247,66,126,"+(1 - (Math.sqrt(this.getDistX(p1,p2) + this.getDistY(p1,p2)) / this.min_dist))+")";
  this.ctx.moveTo(p1.x, p1.y);
  this.ctx.lineTo(p2.x, p2.y);
  this.ctx.stroke();
  this.ctx.closePath();
};

particleSystem.prototype.start = function(e)
{
  requestAnimFrame(delegate(this,this.start));

  this.now = Date.now();
  this.delta = this.now - this.then;
   
  // control the fps
  if (this.delta > this.interval) 
  {
    this.then = this.now - (this.delta % this.interval);
    this.draw();
  }
};

particleSystem.prototype.draw = function() 
{
  // clear screen, remove for cool effect ;)
  this.repaint();

  for (var k = 0, m = this.particles.length; k < m; k++)
  {
    this.particles[k].draw();
  }

  this.update();
};

//
// Helper Methods
//

particleSystem.prototype.isBlackPixelY = function(p)
{
  return this.mask.data[this.posToArea(p.x , p.y + p.vy, this.mask.width)] != 255;
};

particleSystem.prototype.isBlackPixelX = function(p)
{
  return this.mask.data[this.posToArea(p.x + p.vx, p.y, this.mask.width)] != 255;
};

particleSystem.prototype.areClose = function(p1, p2)
{ 
  return Math.sqrt(this.getDistX(p1,p2) + this.getDistY(p1,p2))  < this.min_dist;
}

particleSystem.prototype.getDistX = function(p1, p2)
{
  return Math.pow((p1.x - p2.x),2);
};

particleSystem.prototype.getDistY = function(p1, p2)
{
  return Math.pow((p1.y - p2.y),2);
};

particleSystem.prototype.posToArea = function(x,y,w) 
{
  return ((this.mask.width*y)+x)*4;
};

particleSystem.prototype.toPosX = function(i,w) 
{
  return (i % (4 * w)) / 4;
};

particleSystem.prototype.toPosY = function(i, w)
{
  return Math.floor(i / (4 * w));
};

particleSystem.prototype.repaint = function()
{
  // clear the screen
  this.ctx.fillStyle = "#1d1d1d";
  this.ctx.fillRect(0,0,this.width,this.height);
};

window.delegate=function(ctx,func)
{
  return function() { return func.apply(ctx,arguments); };
};

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       || 
      window.webkitRequestAnimationFrame || 
      window.mozRequestAnimationFrame    || 
      window.oRequestAnimationFrame      || 
      window.msRequestAnimationFrame     ||  
      function( callback ){
      window.setTimeout(callback, 1000 / 60);
      };
})();
