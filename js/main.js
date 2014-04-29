//Love should be a heart
var scene, camera, controls, renderer, canvas, cameraController, clock, director;
var geometry, material, mesh;


init();

function init() {

  clock = new THREE.Clock();

  //CANVAS
  canvas = document.createElement('canvas');
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  context = canvas.getContext('2d');



  scene = new THREE.Scene();

  director = new Director();
  director.init();

  var light = new THREE.DirectionalLight(0xff0000);
  light.position.y = 100;
  scene.add(light);

  light = new THREE.DirectionalLight(0xff00ff);
  light.position.z = -100;
  scene.add(light);

  // createDebugPoints();

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
  onWindowResize();
  
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

