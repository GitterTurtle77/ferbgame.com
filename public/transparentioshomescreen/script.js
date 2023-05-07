var img = new Image();
 
// (C) CROP ON LOAD
img.onload = () => {
  // (C1) GET CANVAS + 2D CONTEXT
  let canvas = document.getElementById("demo"),
  ctx = canvas.getContext("2d");
 
  // (C2) CROP BY COPYING PART OF SOURCE IMAGE TO CANVAS
  ctx.drawImage(img,
    // SOURCE X, Y, WIDTH, HEIGHT
    90, 231, 180, 180,
    // DESTINATION X, Y, WIDTH, HEIGHT
    0, 0, 180, 180
  );
};


function upload() {
    var file = document.getElementById("input").files[0]
    img.src = URL.createObjectURL(file);
    console.log(file)
}
