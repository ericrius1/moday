function Frame() {
  var sphereGeo = new THREE.SphereGeometry(5);
  var sphereMat = new THREE.MeshBasicMaterial(0xff00ff);
  var sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
  var sphere;
  var self = this;
  var increment = 10;
  var burnRate = 20;
  var bottomFrame = false;
  var doneBuring = false;
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
    console.log('YAT');
    sphere1 = sphereMesh.clone();
    sphere2 = sphereMesh.clone();
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
      sphere1.position.x = pos.x
      sphere2.position.x = -pos.x
      sphere1.position.z = pos.z;
      sphere2.position.z = pos.z;
      pos.x -= increment;
    } else {
      doneBuring = true;
    }
    scene.add(sphere1);
    scene.add(sphere2);

    if (!doneBuring) {
      setTimeout(function() {
        self.setFire(pos);
      }, burnRate);

    }

  };
}