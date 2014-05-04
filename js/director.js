var photo;
var clock = new THREE.Clock();
var currentSceneIndex = 0;
// var short = true;
var short = false;
var scenes = [];

function Director() {
  scenes = [];
  var startTime;
  this.init = function() {

    cameraController = new CameraController();
    photo = new Photo();
    this.initScenes();
    //Give the browser a chance to create the image object
  };

  this.update = function() {
    cameraController.update();
    scenes[currentSceneIndex].update();
    var currentTime = Date.now();
    if (currentTime > scenes[currentSceneIndex].endTime) {
      if (currentSceneIndex < scenes.length - 1) {
        currentSceneIndex++;
        scenes[currentSceneIndex].init();
      }
    }
  };

  this.initScenes = function() {
    var duration = 34500;
    if (short) {
      duration = 2000;
    }
    var startTime = Date.now();

    //SCENE1
    var scene1 = {
      startTime: startTime,
      duration: duration,
      endTime: startTime + duration,
      init: function() {
        setTimeout(function() {
          cameraController.init();
          photo.init();
          var text = new Text();
          text.init();
          animate();
        }, 300);

      },
      update: function() {
        photo.update();
      }
    };
    scenes.push(scene1);
    duration = 19000;
    if (short) {
      duration = 2000;
    }

    //SCENE2
    var scene2 = {
      startTime: scene1.endTime,
      duration: duration,
      endTime: scene1.endTime + duration,
      songPoint: 34000
    };
    scene2.init = function() {
      cameraController.activateHyperDrive();
      if (short) {
        song.currentTime = this.songPoint / 1000;
      }
    };
    scene2.update = function() {
      photo.update();
    };
    scenes.push(scene2);


    //SCENE3
    duration = 10000;
    var scene3 = {
      startTime: scene2.endTime,
      duration: duration,
      endTime: scene2.endTime + duration,
      songPoint: 53000
    };
    scene3.init = function() {
      frame.init();
      if (short) {
        song.currentTime = this.songPoint / 1000;
      }

    };
    scene3.update = function() {

    };
    scenes.push(scene3);
    scenes[currentSceneIndex].init();
  };
}