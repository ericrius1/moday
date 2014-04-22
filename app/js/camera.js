function CameraController(){
  var controlsEnabled = false;
  this.init = function(){
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 300;
    // camera.position.set(-110, -369, 3);
    // camera.rotation.set(1.565, -0.164, -0.87);
    // camera.rotation.x = Math.PI/2;
    // camera.translateZ(HEIGHT/2 + 70);
    camera.position.x -= 2;
    if(controlsEnabled){
     controls = new THREE.TrackballControls(camera);
    }

    var currentPos = {
      x: camera.position.x,
      y: camera.position.y,
      z: camera.position.z
    };

    var finalPos = {
      x: camera.position.x,
      y: camera.position.y,
      z: camera.position.z - 500
    };
    var camTween = new TWEEN.Tween(currentPos).
      to(finalPos, 20000).
      easing(TWEEN.Easing.Quadratic.In).
      onUpdate(function(){
        camera.position.set(currentPos.x, currentPos.y, currentPos.z);
      }).start();
  };

  this.update = function(){
    // camera.translateZ(-0.2);
    // console.log(camera.position.z)
    // camera.position.x= Math.sin(clock.getElapsedTime()) * 2;
    if(controlsEnabled){
      controls.update(); 
    }
  };
}