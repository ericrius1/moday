var controlsEnabled = false;
// var controlsEnabled = true;
function CameraController() {
  var travelDistance = HEIGHT * 0.6;
  var self;
  this.init = function() {
    self = this;
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 100000);
    camera.rotation.y = Math.PI;
    scene.add(camera);
    if (controlsEnabled) {
      controls = new THREE.TrackballControls(camera);
      camera.position.z = 100;
      camera.position.y = 300;
    }
    this.beginTaxi();
  };

  this.beginTaxi = function(){
    var curPos = {
      z: camera.position.z
    };

    var finalPos = {
      z: camera.position.z + 400
    };
    var taxiTween = new TWEEN.Tween(curPos).
      to(finalPos, scenes[0].duration).
      onUpdate(function(){
        camera.position.z = curPos.z;
      }).start();

  };

  this.update = function() {

    var delta = clock.getDelta();
    if (controlsEnabled) {
      controls.update(delta);
    }
  };


  this.activateHyperDrive = function() {
    var currentPos = {
      x: camera.position.x,
      y: camera.position.y,
      z: camera.position.z,
      rotX: camera.rotation.x,
      rotY:  camera.rotation.y,
      rotZ: camera.rotation.z 
    };

    var target = camera.clone();
    target.translateZ(-travelDistance);

    var finalPos = {
      x: 0,
      y: 1100,
      z: HEIGHT - 400,
      rotX: Math.PI * 0.55,
      rotY: camera.rotation.y,
      rotZ: Math.PI,
    };
    var camTween = new TWEEN.Tween(currentPos).
    to(finalPos, scenes[1].duration).
    easing(TWEEN.Easing.Quadratic.In).
    onUpdate(function() {
      camera.position.set(currentPos.x, currentPos.y, currentPos.z);
      camera.rotation.set(currentPos.rotX, currentPos.rotY, currentPos.rotZ);


    }).start();
  };
}