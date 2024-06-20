const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");

SerialPort.list().then(
  (ports) => console.log(ports),
  (err) => console.log(err)
);

const port = new SerialPort({
  path: "/dev/tty.usbmodem1101",
  baudRate: 9600,
  autoOpen: false,
});

const parser = port.pipe(new ReadlineParser({ delimiter: "\r\n" }));

port.open(function (err) {
  if (err) {
    return console.log("Error opening port: ", err.message);
  }

  port.write("Ready!");
});

// Read the port data
port.on("open", () => {
  console.log("Serial port open");
});

parser.on("data", (data) => {
  console.log(data);
});
