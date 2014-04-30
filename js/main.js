//Love should be a heart
var scene, camera, controls, renderer, canvas, cameraController, clock, director;
var geometry, material, mesh;


var song = loadAudio('assets/starwars.mp3');
init();
function init() {
  //CANVAS
  console.log('wahh');
  canvas = document.createElement('canvas');
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  scene = new THREE.Scene();
  context = canvas.getContext('2d');
  director = new Director();
  director.init();

  var light = new THREE.DirectionalLight(0xff0000);
  light.position.y = 100;
  // scene.add(light);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);


}

function animate() {
    // note: three.js includes requestAnimationFrame shim
    requestAnimationFrame(animate);
    director.update();
    TWEEN.update();
    renderer.render(scene, camera);
}

// handle resizing windows
window.onload = function(){
  window.addEventListener( 'resize', onWindowResize, false );
};

function onWindowResize(){

    renderer.setSize( window.innerWidth, window.innerHeight );
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

function createDebugPoints(){
  var sphereGeo = new THREE.SphereGeometry(10);
  var sphereMesh = new THREE.Mesh(sphereGeo, new THREE.MeshBasicMaterial({color: 0xff0000}));
  scene.add(sphereMesh);

  sphereMesh = new THREE.Mesh(sphereGeo, new THREE.MeshBasicMaterial({color: 0xff0000}));
  sphereMesh.position.z = HEIGHT;
  scene.add(sphereMesh);
}

function loadAudio(uri)
{
    var audio = new Audio();
    audio.addEventListener('canplaythrough', function(){
      this.play();
    }, false); // It works!!
    audio.src = uri;
    return audio;
}

