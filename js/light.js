var lightSpeed = 2000;
function Light(word){

  //Add the light in front of the word
  var lightDebugGeo = new THREE.SphereGeometry(10);
  var lightDebug = new THREE.Mesh(lightDebugGeo, new THREE.MeshBasicMaterial());
  // word.add(lightDebug);
  lightDebug.position.z += 200;
  lightDebug.position.x += 100;

  var light = new THREE.PointLight(0x0000ff);
  light.position.z += 200;
  light.position.x += 100;
  word.add(light);

  var curLight = {
    intensity: light.intensity,
    r: light.color.r,
    g: light.color.g,
    b: light.color.b,
  };
  var finalLight = {
    intensity: light.intensity * 2,
    r: 1,
    g: 0,
    b: 1
  };
  var lightTween = new TWEEN.Tween(curLight).
    to(finalLight, lightSpeed).
    easing(TWEEN.Easing.Cubic.InOut).
    repeat(1000).
    yoyo(true).
    onUpdate(function(){
      light.intensity = curLight.intensity;
      light.color.setRGB(curLight.r, curLight.g, curLight.b);
    }).start();

  this.update = function(){

  };
}