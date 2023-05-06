function clearDisplay() {
  console.log("clear")
  document.getElementById("display").innerHTML = "0"
}

function num1() {
  if (document.getElementById("display").innerHTML != "0") {
    document.getElementById("display").innerHTML = document.getElementById("display").innerHTML + "1"
  } else {
    document.getElementById("display").innerHTML = "1"
  }
}

function num2() {
  if (document.getElementById("display").innerHTML != "0") {
    document.getElementById("display").innerHTML = document.getElementById("display").innerHTML + "2"
  } else {
    document.getElementById("display").innerHTML = "2"
  }
}

function num3() {
  if (document.getElementById("display").innerHTML != "0") {
    document.getElementById("display").innerHTML = document.getElementById("display").innerHTML + "3"
  } else {
    document.getElementById("display").innerHTML = "3"
  }
}

function num4() {
  if (document.getElementById("display").innerHTML != "0") {
    document.getElementById("display").innerHTML = document.getElementById("display").innerHTML + "4"
  } else {
    document.getElementById("display").innerHTML = "4"
  }
}

function num5() {
  if (document.getElementById("display").innerHTML != "0") {
    document.getElementById("display").innerHTML = document.getElementById("display").innerHTML + "5"
  } else {
    document.getElementById("display").innerHTML = "5"
  }
}

function num6() {
  if (document.getElementById("display").innerHTML != "0") {
    document.getElementById("display").innerHTML = document.getElementById("display").innerHTML + "6"
  } else {
    document.getElementById("display").innerHTML = "6"
  }
}

function num7() {
  if (document.getElementById("display").innerHTML != "0") {
    document.getElementById("display").innerHTML = document.getElementById("display").innerHTML + "7"
  } else {
    document.getElementById("display").innerHTML = "7"
  }
}

function num8() {
  if (document.getElementById("display").innerHTML != "0") {
    document.getElementById("display").innerHTML = document.getElementById("display").innerHTML + "8"
  } else {
    document.getElementById("display").innerHTML = "8"
  }
}

function num9() {
  if (document.getElementById("display").innerHTML != "0") {
    document.getElementById("display").innerHTML = document.getElementById("display").innerHTML + "9"
  } else {
    document.getElementById("display").innerHTML = "9"
  }
}

function num0() {
  if (document.getElementById("display").innerHTML != "0") {
    document.getElementById("display").innerHTML = document.getElementById("display").innerHTML + "0"
  } else {
    document.getElementById("display").innerHTML = "0"
  }
}

function point() {
  document.getElementById("display").innerHTML = document.getElementById("display").innerHTML + "."
}

function multiply() {
  document.getElementById("display").innerHTML = document.getElementById("display").innerHTML + "&times"
}

function divide() {
  document.getElementById("display").innerHTML = document.getElementById("display").innerHTML + "&divide"
}

function minus() {
  document.getElementById("display").innerHTML = document.getElementById("display").innerHTML + "-"
}

function plus() {
  document.getElementById("display").innerHTML = document.getElementById("display").innerHTML + "+"
}

function equals() {
  var string = document.getElementById("display").innerHTML
  string = string.replaceAll("×", "*").replaceAll("÷", "/")
  document.getElementById("display").innerHTML = eval(string)
}

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
  document.getElementById("main").style.marginRight = "-250px";
  document.body.style.backgroundColor = "#111111";
  console.log(document.getElementById("main").getElementsByTagName("button"))
  var collection = document.getElementById("main").getElementsByTagName("button");
  for (let i = 0; i < collection.length; i++) {
    console.log(collection[i]);
    collection[i].style.border = "2px solid #111111"
  }
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft= "0";
  document.getElementById("main").style.marginRight = "0px";
  document.body.style.backgroundColor = "#222222";
  document.button.style.border = "2px solid #222222";
  var collection = document.getElementById("main").getElementsByTagName("button");
  for (let i = 0; i < collection.length; i++) {
    console.log(collection[i]);
    collection[i].style.border = "2px solid #222222"
  }
}