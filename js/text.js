function Text() {
  //Pass in a letter, then abstract the rest away!
  this.init = function(letter) {

    var material = new THREE.MeshBasicMaterial({color: 0xff00ff});

    var text3D = new THREE.TextGeometry(letter, {

      size: 70,
      height: 25,
      curveSegments: 4,
      font: "helvetiker",

      bevelEnabled: true,
      bevelThickness: 2,
      bevelSize: 2,

      material: 0,
      extrudeMaterial: 1

    });

    text3D.computeVertexNormals();
    text3D.computeBoundingBox();

    var text = new THREE.Mesh(text3D, material);
    scene.add(text);

  };

}