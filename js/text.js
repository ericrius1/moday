

//Have a tween for each letter?
function Text() {
  var message = [];
  var messageArray = 'Hey';
  var letterIndex = 0;
  var animationTime = 3000;
  var textPosOffset = 2.5;
  //Pass in a letter, then abstract the rest away!
  this.init = function() {

    setUpLetters();
    this.letterMaterial = new THREE.MeshBasicMaterial({
      color: 0xff00ff
    });
    this.addLetter();
  };

  this.addLetter = function() {
    var letterKey = messageArray[letterIndex];
    var letterGeo = new THREE.TextGeometry(letterKey, {
      size: 50,
      height: 5,
      curveSegments: 4,
      font: 'helvetiker'
    });

    letterGeo.computeVertexNormals();
    letterGeo.computeBoundingBox();

    var letter = new THREE.Mesh(letterGeo, this.letterMaterial);
    letter.lookAt(camera.position);

    //Add mesh to letterObj
    message[letterKey].mesh = letter;


    scene.add(letter);
    letter.scale.multiplyScalar(0.1);

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
      letter.position.set(currentPos.x, currentPos.y, currentPos.z);
    }).start();
    letterTweenIn.onComplete(function() {
      tweenLetterOut(letterIndex);
    });
    var self = this;
    //Now do this again every x seconds!
    setTimeout(function() {
      letterIndex++;
      if (letterIndex < message.length) {
        self.addLetter(message[letterIndex]);
      }
    }, animationTime * 1.1);
  };

  function tweenLetterOut(letterIndex) {
    var letter = message[messageArray[letterIndex]].mesh;
    var currentPos = {
      x: letter.position.x,
      y: letter.position.y,
      z: letter.position.z,
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
      letter.position.set(currentPos.x, currentPos.y, currentPos.z);
    }).start();
  }

  function setUpLetters() {
    for (var i = 0; i < messageArray.length; i++) {
      message[messageArray[i]] = {
        finalPos: {
          x: 10,
          y: 10,
          z: 10
        }
      };
    }
  }
}