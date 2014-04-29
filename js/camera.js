// var controlsEnabled = true;
// var controlsEnabled = false;
var controlsEnabled = true;
var cameraTweenEnabled = false;
function CameraController(){
  var travelDistance = 1000;
  var camAnimationTime = 20000;
  this.init = function(){
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 100000);
    camera.position.x -= WIDTH/2 +55;
    scene.add(camera);
    if(controlsEnabled){
      controls = new THREE.TrackballControls(camera);
     // controls = new THREE.FlyControls(camera);
     controls.movementSpeed = 300;
     controls.rollSpeed = 0.5;
     controls.dragToLook = true;
    }

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
    if(cameraTweenEnabled){
      var camTween = new TWEEN.Tween(currentPos).
        to(finalPos, camAnimationTime).
        easing(TWEEN.Easing.Quadratic.In).
        onUpdate(function(){
          camera.position.set(currentPos.x, currentPos.y, currentPos.z);
        }).start();
    }
  };

  this.update = function(){
    
    var delta = clock.getDelta();
    if(controlsEnabled){
      controls.update(delta); 
    }
  };
}