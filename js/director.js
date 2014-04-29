var photo;
var camAnimationTime = 20000;
function Director() {
  this.init = function() {
    cameraController = new CameraController();
    cameraController.init();
    //PHOTO
    photo = new Photo();
    //Give the browser a chance to create the image object
    setTimeout(function() {
      photo.init();
      var text = new Text();
      text.init();
      animate();

    }, 100);

  };

  this.update = function() {
    // window.testText.rotation.x -= 0.01;
    cameraController.update();
    photo.update();
  };
}