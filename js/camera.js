// var controlsEnabled = false;
// var cameraTweenEnabled = true;
var controlsEnabled = true;
var cameraTweenEnabled = false;
function CameraController(){
  var travelDistance = 1000;
  var camAnimationTime = 2000;
  var self;
  this.init = function(){
    self = this;
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 100000);
    camera.rotation.y = Math.PI;
    scene.add(camera);
    if(controlsEnabled){
      controls = new THREE.TrackballControls(camera);
      camera.position.z = 100;
      camera.position.y = 300;
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
        camTween.onComplete(function(){
          self.revealPic();
        });
    }
  };

  this.update = function(){
    
    var delta = clock.getDelta();
    if(controlsEnabled){
      controls.update(delta); 
    }
  };

  this.revealPic = function(){
    // var currentPos = {
    //   x: camera.position.x,
    //   y: camera.position.y,
    //   z: camera.position.z,
    //   rotX: camera.rotation.x,
    //   rotY: camera.rotation.y,
    //   rotZ: camera.rotation.z,
    // }

    // var finalPos = {
    //   x:    ,
    //   y:     ,
    //   z:      ,
    //   rotX: Math.PI/2,
    //   rotY: camera.rotation.y,
    //   rotZ: camera.rotation.z,

    // }
    // var revealTween= new TWEEN.Tween(currentPos).
    //   to(finalPos, 10000).
    //   easing(TWEEN.Easing.Cubic.InOut).
    //   onUpdate(function(){
    //     camera.position.set(finalPos.x, finalPos.y, finalPos.z);
    //     camera.rotation.set(finalPos.rotX, finalPos.rotY, finalPos.rotZ);
    //   })

  };
}