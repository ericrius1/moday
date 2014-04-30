//MAKE SURE TO REMEBER WE ROTATED PARTICLE MESH 180 degrees AROUND Y AXIS so well ened to reverse x translations
var image;

var WIDTH = 1356;
var HEIGHT = 1129;
var DENSITY = 4;
var step = DENSITY * 2;
function Photo(){
  var particleSystem, particles, colors;

  //Draw the image to the canvas
  image = document.createElement('img');
  image.src = "assets/mom4.jpg";

  this.init = function(){

    context.drawImage(image, 0, 0 );
    //set up particle material
    var material = new THREE.ParticleSystemMaterial({
      wireframe: true,
      size: DENSITY * 1.5,
      opacity: 0.1,
      vertexColors: true,
      // sizeAttenuation: true
    });
    var geometry = new THREE.Geometry();
    var pixels = context.getImageData(0, 0, WIDTH, HEIGHT);
    var x = 0, y=0;
    var i = 0;
    //go through the image pixels
    for(x = 0; x < WIDTH * 4; x+=step){
      for(z = HEIGHT; z >=0; z-=DENSITY/2){
        var p = ((z * WIDTH * 4) + x);

        //grab the data from the pixel, ignoring transparent ones
        if(pixels.data[p+3] > 0){
          var pixelCol  = (pixels.data[p] << 16) + (pixels.data[p+1] << 8) + pixels.data[p+2];
          var color     = new THREE.Color(pixelCol);
          var vector    = new THREE.Vector3( x/4 + _.random(-2, 2), _.random(-20, -10), -z);

          //push on the particle
          geometry.vertices.push(vector);
          geometry.colors.push(color);
          i++;
        }
      }
    }


    //now create a new system
    particleSystem = new THREE.ParticleSystem(geometry, material);
    particleSystem.rotation.y = Math.PI;
    // particleSystem.sortParticles = true;

    particles = particleSystem.geometry.vertices;

    colors = particleSystem.geometry.colors;
    scene.add(particleSystem);
    particleSystem.position.x += WIDTH/2;
    pixels = null;

    // this.slowUpdate();
  };

  this.update = function(){
    particleSystem.geometry.verticesNeedUpdate = true;

  };

  this.slowUpdate = function(){
        //get some vertices close to where the camera is, and twirl them around a bit
     var self = this;
    //grab some vertices near the camera
   
    setTimeout(function(){
      _.each(particles, function(particle){
        particle.y = _.random(-10,-5);
      });
      var someParticles = _.sample(particles, 10000);
      _.each(someParticles, function(particle){
        particle.y = 20;
      });
      self.slowUpdate();
    }, 1000);
  };
}




window.map = function(value, min1, max1, min2, max2){
  return min2 + (max2 - min2) * ((value - min1) / (max1 - min1));
};







