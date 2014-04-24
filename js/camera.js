function CameraController(){

  this.init = function(){
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = HEIGHT;
    camera.position.set(-1740, 8, 1100);
    camera.rotation.set(-0.00778, -1.006, -0.1017);
    // camera.rotation.x = Math.PI/2;
    // camera.translateZ(HEIGHT/2 + 70);
    // camera.position.x -= 2;
    if(controlsEnabled){
     controls = new THREE.TrackballControls(camera);
    }

    var currentPos = {
      x: camera.position.x,
      y: camera.position.y,
      z: camera.position.z,
      rotX: camera.rotation.x,
      rotY: camera.rotation.y,
      rotZ: camera.rotation.z
    };

    var finalPos = {
      x: 0,
      y: camera.position.y,
      z: 0,
      rotX: camera.rotation.x,
      rotY: camera.rotation.y,
      rotZ: camera.rotation.z
    };
    var camTween = new TWEEN.Tween(currentPos).
      to(finalPos, 50000).
      easing(TWEEN.Easing.Quadratic.In).
      onUpdate(function(){
        camera.position.set(currentPos.x, currentPos.y, currentPos.z);
        camera.rotation.x = currentPos.rotX;
      }).start();
  };

  this.update = function(){
    

    if(controlsEnabled){
      controls.update(); 
    }
  };
}