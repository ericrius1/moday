

//Should be word by word
function Text() {
  var message = [];
  var messageArray = ['Happy', "Mother's", 'Day!'];
  var wordIndex = 0;
  var textPosOffset = 2.5;
  var finalWordX = -WIDTH/2;
  var finalWordScale = 2.0; 
  var distanceToCam = 20;
  var wordGap = finalWordScale * 300;
  var animationTime = scenes[0].duration/messageArray.length;
  this.init = function() {

    setUpWords();
    this.wordMaterial = new THREE.MeshLambertMaterial({
      color: 0xffffff
    });
    this.addWord();
  };

  this.addWord = function() {
    var self = this;
    var wordKey = messageArray[wordIndex];
    var wordGeo = new THREE.TextGeometry(wordKey, {
      size: 50,
      height: 5,
      curveSegments: 8,
      font: 'helvetiker'
    });

    wordGeo.computeVertexNormals();
    wordGeo.computeBoundingBox();

    var word = new THREE.Mesh(wordGeo, this.wordMaterial);
    // word.lookAt(camera.position);
    word.rotation.y = camera.rotation.y;
    //Add mesh to letterObj
    message[wordKey].mesh = word;
    var light = new Light(word);


    scene.add(word);
    word.scale.multiplyScalar(0.1);

    var target = camera.clone();
    target.translateZ(-distanceToCam);
    var currentPos = {
      x: 0,
      y: 0,
      z: HEIGHT
    };
    var finalPos = {
      x: target.position.x + 10,
      y: target.position.y,
      z: target.position.z,
    };
    var wordTweenIn = new TWEEN.Tween(currentPos).
    to(finalPos, animationTime).
    easing(TWEEN.Easing.Quintic.Out).
    // delay(10000).
    onUpdate(function() {
      word.position.set(currentPos.x, currentPos.y, currentPos.z);
    }).start();
    wordTweenIn.onComplete(function() {
      tweenWordOut(wordIndex);
      wordIndex++;
      if(wordIndex < messageArray.length){
        self.addWord();
      }
    });
  };

  function tweenWordOut(wordIndex) {
    var wordObj = message[messageArray[wordIndex]];
    var word = wordObj.mesh;
    var currentPos = {
      x: word.position.x,
      y: word.position.y,
      z: word.position.z,
      scale: word.scale.x,
      rotX: word.rotation.x,
      rotY: word.rotation.y,
      rotZ: word.rotation.z
    };
    var finalPos = {
      x: wordObj.finalPos.x,
      y: wordObj.finalPos.y,
      z: wordObj.finalPos.z,
      scale: wordObj.finalPos.scale,
      rotX: wordObj.finalPos.rotX,
      rotY: 0,
      rotZ: 0
    };
    var wordTweenOut = new TWEEN.Tween(currentPos).
    to(finalPos, animationTime).
    easing(TWEEN.Easing.Cubic.InOut).
    onUpdate(function() {
      word.position.set(currentPos.x, currentPos.y, currentPos.z);
      word.scale.set(currentPos.scale, currentPos.scale, currentPos.scale);
      word.rotation.set(currentPos.rotX, currentPos.rotY, currentPos.rotZ);
    }).start();
  }

  function setUpWords() {
    for (var i = 0; i < messageArray.length; i++) {
      message[messageArray[i]] = {
        finalPos: {
          x: finalWordX + (i * wordGap),
          y: 11,
          z: 0,
          scale: finalWordScale,
          rotX: -Math.PI/2
        }
      };
    }
  }
}

