function Frame() {
  var sphereGeo = new THREE.SphereGeometry(5);


  var sphere;
  var self = this;
  var increment = 10;
  var burnRate = 20;
  var bottomFrame = false;
  var doneBurning = false;
  this.init = function() {
    this.setFire({
      x: 0,
      y: 0,
      z: 0
    });

  };

  this.update = function() {

  };

  this.setFire = function(pos) {
    var sphereMat = new THREE.MeshBasicMaterial({color:0xfffffff});
    var sphere1 = new THREE.Mesh(sphereGeo, sphereMat);
    var sphere2 = new THREE.Mesh(sphereGeo, sphereMat);
    if (pos.x < WIDTH / 2 && !bottomFrame) {
      sphere1.position.x = pos.x;
      sphere2.position.x = -pos.x;
      pos.x += increment;

    } else if (pos.z < HEIGHT) {
      bottomFrame = true;
      sphere1.position.z = pos.z;
      sphere2.position.z = pos.z;
      sphere1.position.x = pos.x;
      sphere2.position.x = -pos.x;
      pos.z += increment;
    } else if (pos.x >= 0) {
      sphere1.position.x = pos.x;
      sphere2.position.x = -pos.x;
      sphere1.position.z = pos.z;
      sphere2.position.z = pos.z;
      pos.x -= increment;
    } else {
      doneBurning = true;
    }
    scene.add(sphere1);
    scene.add(sphere2);
    var curColor = {
      r: sphereMat.color.r,
      g: sphereMat.color.g,
      b: sphereMat.color.b
    };
    var finalColor = {
      r: THREE.Math.randFloat(0,0.4),
      g: THREE.Math.randFloat(0,0.1),
      b: THREE.Math.randFloat(0.7,1.0)
    };
    var frameTween = new TWEEN.Tween(curColor).
      to(finalColor, lightSpeed).
      easing(TWEEN.Easing.Cubic.InOut).
      yoyo(true).
      repeat(1000).
      onUpdate(function(){
        sphere1.material.color.setRGB(curColor.r, curColor.g, curColor.b);
        sphere2.material.color.setRGB(curColor.r, curColor.g, curColor.b);
      }).start();

    if (!doneBurning) {
      setTimeout(function() {
        self.setFire(pos);
      }, burnRate);

    }

  };
}