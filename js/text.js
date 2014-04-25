

//Should be word by word
function Text() {
  var message = [];
  var messageArray = ['We', 'Love', 'You', 'Mom!'];
  var wordIndex = 0;
  var animationTime = 3000;
  var textPosOffset = 2.5;
  this.init = function() {

    // initTestText();
    setUpWords();
    this.wordMaterial = new THREE.MeshBasicMaterial({
      color: 0xff00ff
    });
    this.addWord();
  };

  this.addWord = function() {
    var self = this;
    var wordKey = messageArray[wordIndex];
    var wordGeo = new THREE.TextGeometry(wordKey, {
      size: 50,
      height: 5,
      curveSegments: 4,
      font: 'helvetiker'
    });

    wordGeo.computeVertexNormals();
    wordGeo.computeBoundingBox();

    var word = new THREE.Mesh(wordGeo, this.wordMaterial);
    word.lookAt(camera.position);

    //Add mesh to letterObj
    message[wordKey].mesh = word;


    scene.add(word);
    word.scale.multiplyScalar(0.1);

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
    var wordTweenIn = new TWEEN.Tween(currentPos).
    to(finalPos, animationTime).
    easing(TWEEN.Easing.Cubic.InOut).
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
      scale: word.scale.x
    };
    var finalPos = {
      x: wordObj.finalPos.x,
      y: wordObj.finalPos.y,
      z: wordObj.finalPos.z,
      scale: wordObj.finalPos.scale
    };
    var wordTweenOut = new TWEEN.Tween(currentPos).
    to(finalPos, animationTime).
    easing(TWEEN.Easing.Cubic.InOut).
    onUpdate(function() {
      word.position.set(currentPos.x, currentPos.y, currentPos.z);
      word.scale.set(currentPos.scale, currentPos.scale, currentPos.scale);
    }).start();
  }

  function setUpWords() {
    for (var i = 0; i < messageArray.length; i++) {
      message[messageArray[i]] = {
        finalPos: {
          x: -1268,
          y: 11,
          z: -548,
          scale: 1
        }
      };
    }
  }
}

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