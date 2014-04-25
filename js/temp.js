function initTestText(){

   var textMaterial = new THREE.MeshBasicMaterial({
      color: 0xff00ff
    });
   var textGeo = new THREE.TextGeometry("WE LOVE YOU MOM!", {
      size: 140,
      height: 5,
      curveSegments: 4,
      font: 'helvetiker'
    });

    textGeo.computeVertexNormals();
    textGeo.computeBoundingBox();

    window.testText = new THREE.Mesh(textGeo, textMaterial);
    scene.add(testText);
    testText.position.x= -WIDTH;
    testText.position.z= -500;
    testText.rotation.x = -Math.PI/2;

}