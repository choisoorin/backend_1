// @ts-check

// const animals = ['dog', 'cat', 'pig'];

// const showAnimals = () =>
// function showAnimals() {
//   // 배열함수를 사용하지 않은 버전
//   for (let i = 0; i < animals.length; i++) {
//     console.log(animals[i]);
//   }

//   // 배열함수를 쓰는 버전
//   animals.map((value) => console.log(value));
// }

// module.exports = {
//   animals,
//   showAnimals,
// };

// 방법2
// exports.animals = animals;

// exports.showAnimals = function () {
//   animals.map((value) => console.log(value));
// };

// 방법3
// const animals = {
//   animals: ['dog', 'cat', 'pig'],
//   showAnimals: function () {
//     console.log(this.animals);
//   },
//   showAnimalsByMap: function () {
//     this.animals.map((value) => console.log(value));
//   },
// };

// module.exports = animals;

// es6문법
// const animals = ['dog', 'cat', 'pig'];

// function showAnimals() {
//   animals.map((value) => console.log(value));
// }

// export { animals, showAnimals };

// es6 - export default
export default class Animal {
  constructor() {
    this.animals = ['dog', 'cat', 'pig'];
  }
  showAnimals() {
    this.animals.map((value) => console.log(value));
  }
}
