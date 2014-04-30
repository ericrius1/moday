//MAKE SURE TO REMEBER WE ROTATED PARTICLE MESH 180 degrees AROUND Y AXIS so well ened to reverse x translations
var image;

var WIDTH = 1356;
var HEIGHT = 1129;
var DENSITY = 4;
var step = DENSITY * 2;
var numParticlesPerRow = Math.round(HEIGHT/(DENSITY*2));
console.log(numParticlesPerRow);

function Photo() {
  var particleSystem, particles, colors;

  //Draw the image to the canvas
  image = document.createElement('img');
  image.src = "assets/mom4.jpg";

  this.init = function() {

    context.drawImage(image, 0, 0);
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
    var x = 0,
      y = 0;
    var i = 0;
    //go through the image pixels
    for (x = 0; x < WIDTH * 4; x += step) {
      for (z = HEIGHT; z >= 0; z -= DENSITY / 2) {
        var p = ((z * WIDTH * 4) + x);

        //grab the data from the pixel, ignoring transparent ones
        if (pixels.data[p + 3] > 0) {
          var pixelCol = (pixels.data[p] << 16) + (pixels.data[p + 1] << 8) + pixels.data[p + 2];
          var color = new THREE.Color(pixelCol);
          var vector = new THREE.Vector3(x / 4 + _.random(-2, 2), _.random(-20, -10), -z);

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
    particleSystem.position.x += WIDTH / 2;
    pixels = null;

  };

  this.update = function() {
    particleSystem.geometry.verticesNeedUpdate = true;

  };

  this.createRunway = function() {
    //get some vertices close to where the camera is, and twirl them around a bit
    var self = this;
    //grab some vertices near the camera

    // for (var i = Math.round(particles.length * 0.48); i < particles.length * 0.49; i++) {
    var i = Math.round(particles.length * 0.52);
    tweenVertex(i);
    //one row is HEIGHT/(DENSITY/2)

    function tweenVertex(i) {

      var particle = particles[i];
      var curPos = {y:particle.y};
      var testTween = new TWEEN.Tween(curPos).
        to({y: 50}, 500).
        onUpdate(function() {
          particle.y = curPos.y;
          var index = Math.round(i + 8 * numParticlesPerRow);
          particles[index].y = curPos.y
        }).start();
        testTween.onComplete(function() {
          if( i  <  Math.round(particles.length * 0.70)){
            i--;
            tweenVertex(i);
          }
        });
    }
  };
}



window.map = function(value, min1, max1, min2, max2) {
  return min2 + (max2 - min2) * ((value - min1) / (max1 - min1));
};