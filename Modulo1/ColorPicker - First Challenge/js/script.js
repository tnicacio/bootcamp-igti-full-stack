window.addEventListener('load', start);

let data = getData();

function start() {
  addEvents();
}

function getData() {
  input = Array.from(document.querySelectorAll('input'));
  colorBox = document.querySelector('.output-box');

  const dataObject = {
    redInput: input[0],
    redOutput: input[1],
    greenInput: input[2],
    greenOutput: input[3],
    blueInput: input[4],
    blueOutput: input[5],
    colorBox: colorBox,
  };
  return dataObject;
}

function addEvents() {
  data.redInput.addEventListener('input', setOutput);
  data.greenInput.addEventListener('input', setOutput);
  data.blueInput.addEventListener('input', setOutput);
}

function setOutput(event) {
  setValues(event);
  setColor();
}

function setValues(event) {
  let stringValue = parseInt(event.target.value, 10).toString();

  switch (event.target.id) {
    case 'red-input':
      data.redOutput.value = stringValue;
      break;
    case 'green-input':
      data.greenOutput.value = stringValue;
      break;
    case 'blue-input':
      data.blueOutput.value = stringValue;
      break;
  }
}

function setColor() {
  let rgbColor = `rgb(${data.redOutput.value}, ${data.greenOutput.value}, ${data.blueOutput.value})`;
  data.colorBox.style.backgroundColor = rgbColor;
}
