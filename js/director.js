var photo;
// var controlsEnabled = true;
var controlsEnabled = false;
function Director(){
  this.init = function(){
    cameraController = new CameraController();
    cameraController.init();
      //PHOTO
  photo = new Photo();
  //Give the browser a chance to create the image object
  setTimeout(function(){
    photo.init();
    animate();

  }, 100);

  };

  this.update = function(){
    cameraController.update();
    photo.update();
  };
}