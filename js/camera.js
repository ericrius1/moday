function CameraController(){

  this.init = function(){
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = HEIGHT;
    camera.position.set(-1059, 0.5, 888);
    camera.rotation.set(-0.00778, -1.006, -0.1017);
    scene.add(camera);
    if(controlsEnabled){
     controls = new THREE.OrbitControls(camera);
    }

    var currentPos = {
      x: camera.position.x,
      y: camera.position.y,
      z: camera.position.z,
    };

    var target = camera.clone();
    target.translateZ(-100);

    var finalPos = {
      x: target.position.x,
      y: target.position.y,
      z: target.position.z,
    };
    if(!controlsEnabled){
      var camTween = new TWEEN.Tween(currentPos).
        to(finalPos, 2000).
        easing(TWEEN.Easing.Quadratic.In).
        onUpdate(function(){
          camera.position.set(currentPos.x, currentPos.y, currentPos.z);
        }).start();
    }
  };

  this.update = function(){
    

    if(controlsEnabled){
      controls.update(); 
    }
  };
}