canvas-particles
================

[![solarized dualmode](https://raw2.github.com/ottis/canvas-particles/master/screens/screen.jpg)](#features)

A simple particle system using html5 canvas written in straight JS. It's pretty basic at the moment but give's you the flexibility to add more effects.

### Basic Usage

The system relatively straight forward to add to your page, below shows the basics.

#### DOM
    <head>
      <title>Particles</title>
      <script type="text/javascript" src="js/particle.js"></script>
      <script type="text/javascript" src="js/particle_system.js"></script>
    </head>
    
    <body>
    <canvas id="container"></canvas>
    <script type="text/javascript">
      var system = new particleSystem({"canvas_id":"container"});
      system.start();
    </script>
    </body>
    
That's basically it, once start is called it will begin the system.

#### Particle bounds <3

You'll notice the particles will keep within a heart shape, this can be overrided to use plain text or no text at all, to change the text check out the initMessage method. You'll see a this.str var which is currently set the the unicode hex 16 for a heart, change this to whatever character you want, making sure to update 

    this.ctx.fillText(String.fromCharCode(parseInt(this.str, 16)),.....) -> 
    this.ctx.fillText(this.str,.....)
    
if plain text.

#### Config options

The system comes with a number of options that you can pass through to suit it to your needs.

    fps (frames per second) - defaults to 30
    canvas_id (id of your canvas element in DOM) - defaults to 'canvas'
    width (canvas width) - defaults to page width
    height (canvas height) - defaults to canvas height
    min_dist (the minimum distance a particles needs to be from another to draw a line) - defaults to 30

### Future

It's current form is pretty basic, and really just a demo, but in future i'll add more effects and configurable options, if you have any questions or want to improve just fire a pull request :) enjoy!
