var photo;
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
    // window.testText.rotation.x -= 0.01;
    cameraController.update();
    photo.update();
  };
}