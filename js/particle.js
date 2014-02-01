var particle = function(cfg,ctx)
{
  this.ctx = ctx;

  this.x = cfg.x || 0;
  this.y = cfg.y || 0;

  this.vx = cfg.vx || 1;
  this.vy  = cfg.vy || 1;

  this.radius = cfg.radius || 1;
  this.color = cfg.color || '#1d1d1d';
};

particle.prototype.draw = function()
{
  this.ctx.fillStyle = this.color;
  this.ctx.beginPath();
  this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);    
  this.ctx.fill();
};
