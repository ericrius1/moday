 function Text() {
  var animationTime = 1000;
  //Pass in a letter, then abstract the rest away!
  this.init = function() {

    this.letterMaterial = new THREE.MeshBasicMaterial({color: 0xff00ff});
    this.addLetter('H');
  };

  this.addLetter = function(letter){
    var letterGeo = new THREE.TextGeometry(letter, {
      size: 50,
      height: 5,
      curveSegments: 4,
      font:'helvetiker'
    });
    letterGeo.computeVertexNormals();
    letterGeo.computeBoundingBox();

    letterMesh = new THREE.Mesh(new THREE.SphereGeometry(10, 10), this.letterMaterial);
    letterMesh.lookAt(camera.position);
    scene.add(letterMesh);
    letterMesh.scale.multiplyScalar(0.1);
    

    var target = camera.clone();
    target.translateZ(-100);
    var currentPos = {
      x: 0,
      y: 100, 
      z: 0
    };
    var finalPos = {
      x: target.position.x,
      y: target.position.y,
      z: target.position.z,
    };
    var letterTween = new TWEEN.Tween(currentPos).
      to(finalPos, animationTime).
      easing(TWEEN.Easing.Cubic.InOut).
      onUpdate(function(){
        letterMesh.position.set(currentPos.x, currentPos.y, currentPos.z);
      }).start();
  };
}