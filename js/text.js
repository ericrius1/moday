var currentLetter;

function Text() {
  var message = "HAPPYMOTHERSDAY!";
  var letterIndex = 0;
  var animationTime = 3000;
  var textPosOffset = 2.5;
  //Pass in a letter, then abstract the rest away!
  this.init = function() {

    this.letterMaterial = new THREE.MeshBasicMaterial({
      color: 0xff00ff
    });
    this.addLetter('H');
  };

  this.addLetter = function(theLetter) {
    var letterGeo = new THREE.TextGeometry(theLetter, {
      size: 50,
      height: 5,
      curveSegments: 4,
      font: 'helvetiker'
    });
    letterGeo.computeVertexNormals();
    letterGeo.computeBoundingBox();

    currentLetter = new THREE.Mesh(letterGeo, this.letterMaterial);
    currentLetter.lookAt(camera.position);
    scene.add(currentLetter);
    currentLetter.scale.multiplyScalar(0.1);

    var target = camera.clone();
    target.translateZ(-100);
    var currentPos = {
      x: 0,
      y: 100,
      z: 0
    };
    var finalPos = {
      x: target.position.x - textPosOffset,
      y: target.position.y - textPosOffset,
      z: target.position.z,
    };
    var letterTweenIn = new TWEEN.Tween(currentPos).
    to(finalPos, animationTime).
    easing(TWEEN.Easing.Cubic.InOut).
    onUpdate(function() {
      currentLetter.position.set(currentPos.x, currentPos.y, currentPos.z);
    }).start();
    letterTweenIn.onComplete(function() {
      tweenLetterOut();
    });
    var self = this;
    //Now do this again every x seconds!
    setTimeout(function(){
      letterIndex++;
      self.addLetter(message[letterIndex]);
    }, animationTime * 2);
  };

  function tweenLetterOut() {
    var currentPos = {
      x: currentLetter.position.x,
      y: currentLetter.position.y,
      z: currentLetter.position.z,
    };
    var finalPos = {
      x: 0,
      y: 100,
      z: 0
    };
    var letterTweenOut = new TWEEN.Tween(currentPos).
    to(finalPos, animationTime).
    easing(TWEEN.Easing.Cubic.InOut).
    onUpdate(function() {
      currentLetter.position.set(currentPos.x, currentPos.y, currentPos.z);
    }).start();
  }
}