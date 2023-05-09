const list = [
    "90,231",
    "360,231",
    "630,231",
    "900,231",
    "90,525",
    "360,525",
    "630,525",
    "900,525",
    "90,819",
    "360,819",
    "630,819",
    "900,819",
    "90,1113",
    "360,1113",
    "630,1113",
    "900,1113",
    "90,1407",
    "360,1407",
    "630,1407",
    "900,1407",
    "90,1701",
    "360,1701",
    "630,1701",
    "900,1701"
]


var selectedArea = 1;

var img = new Image();
var img2 = new Image();
var background = document.getElementById("grid");
var div = document.getElementById("grid-container");

var x;
var y;


function upload() {
    var file = document.getElementById("input").files[0]
    img.src = URL.createObjectURL(file);
    background.style.backgroundImage = "url( " + URL.createObjectURL(file) + ")"
    console.log(URL.createObjectURL(file))
    div.style.display = "grid"
};

function upload2() {
  var file2 = document.getElementById("input2").files[0]
  img2.src = URL.createObjectURL(file2);
  console.log(URL.createObjectURL(file2))
};

function btnclick(btn) {
  selectedArea = btn.id;
  x = list[selectedArea - 1].split(",")[0]
  y = list[selectedArea - 1].split(",")[1]
  console.log(x,y)
  
  let canvas = document.getElementById("demo"),
  ctx = canvas.getContext("2d");
  ctx.fillStyle = "#000";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.drawImage(img,
    // SOURCE X, Y, WIDTH, HEIGHT
    x, y, 180, 180,
    // DESTINATION X, Y, WIDTH, HEIGHT
    0, 0, 180, 180
  );
  
  ctx.drawImage(img,
    // SOURCE X, Y, WIDTH, HEIGHT
    x, y, 180, 180,
    // DESTINATION X, Y, WIDTH, HEIGHT
    0, 0, 180, 180
  );
}
