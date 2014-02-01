canvas-particles
================

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

#### Config options

The system comes with a number of options that you can pass through to suit it to your needs.

    fps (frames per second) - defaults to 30
    canvas_id (id of your canvas element in DOM) - defaults to 'canvas'
    width (canvas width) - defaults to page width
    height (canvas height) - defaults to canvas height
    min_dist (the minimum distance a particles needs to be from another to draw a line) - defaults to 30

### Future

It's current form is pretty basic, and really just a demo, but in future i'll add more effects and configurable options, if you have any questions or want to improve just fire a pull request :) enjoy!
