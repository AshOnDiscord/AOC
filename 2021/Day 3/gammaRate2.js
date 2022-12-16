let inputArr = [
  11110, 10110, 10111, 10101, 11100, 10000, 11001, 00100, 01111, 00111, 00010,
  01010,
];
let inputLength = 5;

let addZeros = (num, length) => {
  let numStr = num.toString();
  while (numStr.length < length) {
    numStr = "0" + numStr;
  }
  return numStr;
};

let binaryToString = (value, length) => {
  //check if value starts with 0
  if (
    value.toString().includes("2") ||
    value.toString().includes("3") ||
    value.toString().includes("4") ||
    value.toString().includes("5") ||
    value.toString().includes("6") ||
    value.toString().includes("7") ||
    value.toString().includes("8") ||
    value.toString().includes("9")
  ) {
    return addZeros(value.toString(8), length);
  }
  return value.toString(10);
};

let arr1 = inputArr.map((value) => {
  return binaryToString(value, inputLength);
});

console.log(inputArr);
console.log(arr1);
