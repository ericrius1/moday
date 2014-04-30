function Light(word){

  //Add the light in front of the word
  var lightDebugGeo = new THREE.SphereGeometry(10);
  var lightDebug = new THREE.Mesh(lightDebugGeo, new THREE.MeshBasicMaterial());
  word.add(lightDebug);
  lightDebug.position.z += 500;

  var light = new THREE.PointLight(0xff00ff);
  word.add(light);
  light.position.z += 500;

  this.update = function(){

  };
}