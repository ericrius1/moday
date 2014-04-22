//MAKE SURE TO REMEBER WE ROTATED PARTICLE MESH 180 degrees AROUND Y AXIS so well ened to reverse x translations
var image;

var WIDTH = 2048;
var HEIGHT = 1356;
var DENSITY = 6;
var step = DENSITY * 4;
function Photo(){
  var particleSystem, particles, colors;

  //Draw the image to the canvas
  image = document.createElement('img');
  image.src = "assets/mom3.jpg";

  this.init = function(){

    context.drawImage(image, 0, 0 );
    //set up particle material
    var material = new THREE.ParticleSystemMaterial({
      size: DENSITY * 1.5,
      opacity: 0.9,
      vertexColors: true,
      // sizeAttenuation: true
    });
    var geometry = new THREE.Geometry();
    var pixels = context.getImageData(0, 0, WIDTH, HEIGHT);
    var x = 0, y=0;
    var i = 0;
    //go through the image pixels
    for(x = 0; x < WIDTH * 4; x+=step){
      for(z = HEIGHT; z >=0; z-=DENSITY){
        var p = ((z * WIDTH * 4) + x);

        //grab the data from the pixel, ignoring transparent ones
        if(pixels.data[p+3] > 0){
          var pixelCol  = (pixels.data[p] << 16) + (pixels.data[p+1] << 8) + pixels.data[p+2];
          var color     = new THREE.Color(pixelCol);
          //the more blue, the higher the pixel from (0 -255)
          var yHeight = map(pixels.data[p+2], 0, 255, -20, 20);
          if(x % 50){
            // console.log(yHeight);
          }
          var vector    = new THREE.Vector3(-300 + x/4, 0, 240-z);

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
    particleSystem.sortParticles = true;

    particles = particleSystem.geometry.vertices;
    colors = particleSystem.geometry.colors;
    scene.add(particleSystem);
    pixels = null;
  };

  this.update = function(){
    
  };
}




window.map = function(value, min1, max1, min2, max2){
  return min2 + (max2 - min2) * ((value - min1) / (max1 - min1));
};







