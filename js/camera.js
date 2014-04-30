var controlsEnabled = false;
// var controlsEnabled = true;
function CameraController() {
  var travelDistance = HEIGHT * 0.6;
  var self;
  this.init = function() {
    self = this;
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 100000);
    camera.rotation.y = Math.PI;
    camera.translateZ(-400);
    scene.add(camera);
    if (controlsEnabled) {
      controls = new THREE.TrackballControls(camera);
      camera.position.z = 100;
      camera.position.y = 300;
      // controls = new THREE.FlyControls(camera);
      // controls.movementSpeed = 300;
      // controls.rollSpeed = 0.5;
      // controls.dragToLook = true;
    }
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
    };

    var target = camera.clone();
    target.translateZ(-travelDistance);

    var finalPos = {
      x: target.position.x,
      y: target.position.y,
      z: target.position.z,
    };
    var camTween = new TWEEN.Tween(currentPos).
    to(finalPos, scenes[1].duration).
    easing(TWEEN.Easing.Quadratic.In).
    onUpdate(function() {
      camera.position.set(currentPos.x, currentPos.y, currentPos.z);


    }).start();
    camTween.onComplete(function() {
      self.revealPic();
    });

  };
  this.revealPic = function() {
    var currentPos = {
      x: camera.position.x,
      y: camera.position.y,
      z: camera.position.z,
      rotX: camera.rotation.x,
      rotY: camera.rotation.y,
      rotZ: camera.rotation.z,
      fov: camera.fov
    };

    var finalPos = {
      x: 0,
      y:1100,
      z: HEIGHT- 300,
      rotX: Math.PI * 0.55,
      rotY: camera.rotation.y,
      rotZ: Math.PI,

    };
    var revealTween = new TWEEN.Tween(currentPos).
    to(finalPos, 10000).
    easing(TWEEN.Easing.Cubic.InOut).
    onUpdate(function() {
      console.log('hm');
      camera.position.set(currentPos.x, currentPos.y, currentPos.z);
      camera.rotation.set(currentPos.rotX, currentPos.rotY, currentPos.rotZ);

    }).start();

  };
}