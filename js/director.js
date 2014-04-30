var photo;
var camAnimationTime = 50000;
var clock = new THREE.Clock();

function Director() {
  var scenes = [];
  var startTime;
  this.init = function() {
    clock.start();
    this.initScenes();
    cameraController = new CameraController();
    cameraController.init();
    //PHOTO
    photo = new Photo();
    //Give the browser a chance to create the image object


  };

  this.update = function() {
    scenes[this.currentSceneIndex].update();
  };

  this.initScenes = function() {
    var duration = 2040;
    var startTime = clock.startTime;
    var scene1 = {
      startTime: startTime,
      duration: duration,
      endTime: startTime + duration,
      init: function() {
        setTimeout(function() {
          photo.init();
          var text = new Text();
          text.init();
          animate();
        }, 100);

      },
      update: function() {
        cameraController.update();
        photo.update();
      }
    };
    scenes.push(scene1);
    duration = 10000;
    var scene2 = {
      startTime: scene1.endTime,
      duration: duration,
      endTime: scene1.endTime + duration
    };
    scenes.push(scene2);
    this.currentSceneIndex = 0;
    scenes[this.currentSceneIndex].init();
  };
}