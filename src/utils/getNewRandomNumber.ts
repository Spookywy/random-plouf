export default function getNewRandomNumber(max: number, previousNumber = -1) {
  let newRandomNumber = Math.floor(Math.random() * max);
  while (newRandomNumber === previousNumber) {
    newRandomNumber = Math.floor(Math.random() * max);
  }
  return newRandomNumber;
}
