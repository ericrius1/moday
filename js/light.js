function Light(word){

  //Add the light in front of the word
  var lightDebugGeo = new THREE.SphereGeometry(10);
  var lightDebug = new THREE.Mesh(lightDebugGeo, new THREE.MeshBasicMaterial());
  word.add(lightDebug);
  lightDebug.position.z += 200;
  lightDebug.position.x += 100;

  var light = new THREE.PointLight(0xff00ff);
  light.position.z += 200;
  light.position.x += 100;
  word.add(light);

  this.update = function(){

  };
}