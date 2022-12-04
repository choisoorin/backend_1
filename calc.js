//@ ts-check

// const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// exports.arr = arr;

// exports.sumAll = function () {
//   let sum = 0;
//   for (let i = 0; i < arr.length; i++) {
//     sum += arr[i];
//   }
//   return sum;
// };

// function sumAll() {
//   let sum = 0;
//   // for문
//   //   for (let i = 0; i < arr.length; i++) {
//   //     sum += arr[i];
//   //   }
//   //   return sum;

//   // 메소드
//   sum = arr.reduce((acc, num) => acc + num);
//   return sum;
// }

// module.exports = {
//   arr,
//   sumAll,
// };

// ES6문
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function sumAll() {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}

export { arr, sumAll };
