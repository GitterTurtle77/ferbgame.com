function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
  document.getElementById("main").style.marginRight = "-250px";
  document.body.style.backgroundColor = "#111111";
  console.log(document.getElementById("main").getElementsByTagName("button"))
  var collection = document.getElementById("main").getElementsByTagName("input");
  for (let i = 0; i < collection.length; i++) {
    console.log(collection[i]);
    collection[i].style.border = "2px solid #111111"
  }
  collection = document.getElementById("main").getElementsByTagName("select");
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
  var collection = document.getElementById("main").getElementsByTagName("input");
  for (let i = 0; i < collection.length; i++) {
    console.log(collection[i]);
    collection[i].style.border = "2px solid #222222"
  }
  collection = document.getElementById("main").getElementsByTagName("select");
  for (let i = 0; i < collection.length; i++) {
    console.log(collection[i]);
    collection[i].style.border = "2px solid #222222"
  }
}

const jsonData = {
  "area": {
    "km2": "Square Kilometer",
    "m2": "Square Meter",
    "mi2": "Square Mile",
    "yrd2": "Square Yard",
    "ft2": "Square Foot",
    "in2": "Square Inch",
    "hec": "Hectare",
    "acre": "Acre",
  },
  "dtr": {
    "bitps": "Bit /s",
    "kbitps": "Kilobit /s",
    "kbps": "Kilobyte /s",
    "kbbitps": "Kibibit /s",
    "mbitps": "Megabit /s",
    "mbps": "Megabyte /s",
    "mbbitps": "Mebibit /s",
    "gbitps": "Gigabit /s",
    "gbps": "Gigabyte /s",
    "gbbitps": "Gibibit /s",
    "tbitps": "Terabit /s",
    "tbps": "Terabyte /s",
    "tbbitps": "Tibibit /s",
  },
  "ds": {
    "bit": "Bit",
    "kbit": "Kilobit",
    "kbbit": "Kibibit",
    "mbit": "Megabit",
    "mbbit": "Mebibit",
    "gbit": "Gigabit",
    "gbbit": "Gibibit",
    "tbit": "Terabit",
    "tbbit": "Tebibit",
    "pbit": "Petabit",
    "pbbit": "Pebibit",
    "byte": "Byte",
    "kb": "Kilobyte",
    "kbb": "Kibibyte",
    "mb": "Megabyte",
    "mbb": "Mebibyte",
    "gb": "Gigabyte",
    "gbb": "Gibibyte",
    "tb": "Terabyte",
    "tbb": "Tebibyte",
    "pb": "Petabyte",
    "pbb": "Pebibyte"
  },
  "energy": {
    "jl": "Joule",
    "kljl": "Kilojoule",
    "grcal": "Gram Calorie",
    "klcal": "Kilocalorie",
    "wh": "Watt Hour",
    "kwh": "Kilowatt Hour",
    "elv": "Electron Volt",
    "btu": "British Thermal Unit",
    "ust": "US Therm",
    "ftpd": "Foot-Pound"
  },
  "fqy": {
    "hz": "Hertz",
    "khz": "Kilohertz",
    "mhz": "Megahertz",
    "ghz": "Gigahertz"
  },
  "fe": {
    "mpg": "Miles Per Gallon",
    "mpgi": "Miles Per Gallon (Imperial)",
    "kmpl": "Kilometre Per Litre",
    "lp100km": "Litre Per 100 Km"
  },
  "length": {
    "km": "Kilometre",
    "m": "Meter",
    "cm": "Centimeter",
    "mm": "Millimetre",
    "mcm": "Micrometre",
    "nom": "Nanometre",
    "mile": "Mile",
    "yard": "Yard",
    "foot": "Foot",
    "inch": "Inch",
    "nmile": "Nautical Mile"
  },
  "mass": {
    "tnne": "Tonne",
    "kg": "Kilogram",
    "gram": "Gram",
    "mg": "Milligram",
    "mcg": "Microgram",
    "impton": "Imperial Ton",
    "uston": "US Ton",
    "stone": "Stone",
    "pound": "Pound",
    "ounce": "Ounce"
  },
  "pa": {
    "arcsec": "Arcsecond",
    "deg": "Degree",
    "grad": "Gradian",
    "mlrad": "Milliradian",
    "moa": "Minute of Arc",
    "rad": "Radian"
  },
  "pressure": {
    "bar": "Bar",
    "pascal": "Pascal",
    "ppsi": "Pound Per Square Inch",
    "stat": "Standard Atmosphere",
    "torr": "Torr"
  },
  "speed": {
    "Mph": "Mile Per Hour",
    "Fps": "Foot Per Second",
    "Mps": "Meter Per Second",
    "Kmph": "Kilometer Per Hour",
    "knot": "Knot"
  },
  "temp": {
    "dc": "Celcius",
    "df": "Fahrenheit",
    "dk": "Kelvin"
  },
  "time": {
    "nsec": "Nanosecond",
    "mcrsec": "Microsecond",
    "msec": "Millisecond",
    "sec": "Second",
    "min": "Minute",
    "hour": "Hour",
    "day": "Day",
    "week": "Week",
    "month": "Month",
    "year": "Year",
    "decade": "Decade",
    "century": "Century"
  },
  "volume": {
    "uslg": "US Liquid Gallon",
    "uslq": "US Liquid Quart",
    "uslp": "US Liquid Pint",
    "uslc": "US Legal Cup",
    "flounce": "Fluid Ounce",
    "ustbsp": "US Tablespoon",
    "ustsp": "US Teaspoon",
    "m3": "Cubic Meter",
    "l": "Liter",
    "ml": "Milliliter",
    "impgall": "Imperial Gallon",
    "impquart": "Imperial Quart",
    "imppint": "Imperial Pint",
    "impcup": "Imperial Cup",
    "impfo": "Imperial Fluid Ounce",
    "imptbsp": "Imperial Tablespoon",
    "imptsp": "Imperial Teaspoon",
    "ft3": "Cubic Foot",
    "inch3": "Cubic Inch"
  }
}

const formulaData = {
  "area": {
    "km2m2":"*1000000",
    "km2mi2":"*0.38610215854245",
    "km2yrd2":"*1195990.0463",
    "km2ft2":"*10763910.41671",
    "km2in2":"*1550003100.0062",
    "km2hec":"*100",
    "km2acre":"*247.10538",
  }
}

setTimeout(function() {
  document.getElementById("unit1").innerHTML = ""
document.getElementById("unit2").innerHTML = ""

for (const key in jsonData["area"]){
  if(jsonData["area"].hasOwnProperty(key)){

      document.getElementById("unit1").innerHTML = document.getElementById("unit1").innerHTML + '<option value="'+ key +'">'+ jsonData["area"][key] +'</option>'
      document.getElementById("unit2").innerHTML = document.getElementById("unit2").innerHTML + '<option value="'+ key +'">'+ jsonData["area"][key] +'</option>'
      
}
}
}, 100)

function unitChange(unit) {
  console.log(jsonData[unit]);
  document.getElementById("unit1").innerHTML = ""
  document.getElementById("unit2").innerHTML = ""
  
  for (const key in jsonData[unit]){
  if(jsonData[unit].hasOwnProperty(key)){
    document.getElementById("unit1").innerHTML = document.getElementById("unit1").innerHTML + '<option value="'+ key +'">'+ jsonData[unit][key] +'</option>'
    document.getElementById("unit2").innerHTML = document.getElementById("unit2").innerHTML + '<option value="'+ key +'">'+ jsonData[unit][key] +'</option>'
  }
}
}

function input1Change(textBox) {
  var value = textBox.value;
  document.getElementById("input2").value = eval(value + formulaData[document.getElementById("unit").value][document.getElementById("unit1").value + document.getElementById("unit2").value])
}

function input2Change(textBox) {
  var value = textBox.value;
  document.getElementById("input1").value = eval(value + formulaData[document.getElementById("unit").value][document.getElementById("unit2").value + document.getElementById("unit1").value])
}

function unit1Change() {
  var value = document.getElementById("input2").value;
  document.getElementById("input1").value = eval(value + formulaData[document.getElementById("unit").value][document.getElementById("unit2").value + document.getElementById("unit1").value])
}

function unit2Change() {
  var value = document.getElementById("input2").value;
  document.getElementById("input2").value = eval(value + formulaData[document.getElementById("unit").value][document.getElementById("unit1").value + document.getElementById("unit2").value])
}