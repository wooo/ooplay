var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1411'; // fill in your serial port name here
var inData; // for incoming serial data
var xPos = 0; // x position of the graph


function setup() {

createCanvas(800, 600);
  // background(0x04, 0x4, 0x40);
  background(0, 0, 0);

  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('list', printList); // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen); // callback for the port opening
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('error', serialError); // callback for errors
  serial.on('close', portClose); // callback for the port closing


  serial.list(); // list the serial ports
  serial.open(portName); // open a serial port
}

function draw() {
  graphData(inData);
}

function graphData(newData) {
  // map the range of the input to the window height:
  var yPos = map(newData, 0, 255, 0, height);
  // draw the line in a pretty color:
  // stroke(0xA8, 0xD9, 0xA7);
  stroke(255, 255, 255);
  line(xPos, height, xPos, height - yPos);
  // at the edge of the screen, go back to the beginning:
  if (xPos >= width) {
    xPos = 0;
    // clear the screen by resetting the background:
    //background(0x08, 0x16, 0x40);
    background(0, 0, 0);
  } else {
    // increment the horizontal position for the next reading:
    xPos++;
  }
}
 
function serverConnected() {
  println('connected to server.');
}

function portOpen() {
  println('the serial port opened.')
}

// function serialEvent() {
//   // read a string from the serial port:
//   var inString = serial.readLine();
//   // check to see that there's actually a string there:
//   if (inString.length > 0) {
//     // convert it to a number:
//     inData = Number(inString);
//   }
// }

function serialEvent() {
  // read a byte from the serial port, convert it to a number:
  inData = serial.readLine();
  
  
distance = int(map(parseInt(inData),1,200,1,height));
 if(distance<0){
    distance = 0;
 }
  
}

// function serialEvent() {
//   // read a string from the serial port:
//   var inString = serial.readLine();
//   // check to see that there's actually a string there:
//   if (inString.length > 0 ) {
//   // convert it to a number:
//   inData = Number (inString);
//   }
// }

function serialError(err) {
  println('Something went wrong with the serial port. ' + err);
}

function portClose() {
  println('The serial port closed.');
}

// get the list of ports:
function printList(portList) {
  // portList is an array of serial port names
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    println(i + " " + portList[i]);
  }
}