function Text(){
  this.init = function(){
   var theText = "THREE.JS";

        // Get text from hash

        var hash = document.location.hash.substr( 1 );

        if ( hash.length !== 0 ) {

          theText = hash;

        }

        var material = new THREE.MeshFaceMaterial( [
          new THREE.MeshLambertMaterial( { color: 0xffffff, shading: THREE.FlatShading, opacity: 0.95 } ),
          new THREE.MeshLambertMaterial( { color: 0xffffff } )
        ] );

        // var text3d = new THREE.TextGeometry( theText, {

        //   size: 70,
        //   height: 25,
        //   curveSegments: 4,
        //   font: "helvetiker",

        //   bevelEnabled: true,
        //   bevelThickness: 2,
        //   bevelSize: 2,

        //   material: 0,
        //   extrudeMaterial: 1

        // });

    // text3D.computeVertexNormals();
    // text3D.computeBoundingBox();

    // var text = new THREE.Mesh(text3D, material);
    // scene.add(text);

  };

}