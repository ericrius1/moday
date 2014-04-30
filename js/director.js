var photo;
var camAnimationTime = 50000;
var clock = new THREE.Clock();
var currentSceneIndex = 0;
var short = true;

function Director() {
  var scenes = [];
  var startTime;
  this.init = function() {

    cameraController = new CameraController();
    photo = new Photo();
    this.initScenes();
    //Give the browser a chance to create the image object
  };

  this.update = function() {
    scenes[currentSceneIndex].update();
    var currentTime = Date.now();
    if(currentTime > scenes[currentSceneIndex].endTime){
      if(currentSceneIndex < scenes.length-1){
        currentSceneIndex++;
        scenes[currentSceneIndex].init();
      }
    }
  };

  this.initScenes = function() {
    var duration = 34000;
    if(short){
      duration = 1000;
    }
    var startTime = Date.now();
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
      endTime: scene1.endTime + duration,
      songPoint: 34000
    };
    scene2.init = function(){
      cameraController.activateHyperDrive();
      if(short){
        song.currentTime = this.songPoint/1000;
      }
    };
    scene2.update =  function(){

    };
    scenes.push(scene2);
    scenes[currentSceneIndex].init();
  };
}