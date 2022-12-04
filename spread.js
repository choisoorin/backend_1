// @ts-check

// 전개 구문
const arr = [1, 2, 3, 4, 5, 6];
// console.log(arr);
// console.log(...arr);

// 실습1 (객체합치기)
// const sooData = {
//   name: '최수린',
//   gender: 'Female',
// };
// const sooInfo = {
//   nickName: 'soo',
//   email: 'ss@naver.com',
// };

// X
// const soo = {
//   sooData,
//   sooInfo,
// };

// X
// const soo = {
//   name: sooData.name,
//   gender: sooData.gender,
//   nickName: sooInfo.nickName,
//   email: sooInfo.email,
// };

// 전개구문 객체합치기 O
// const soo = {
//   ...sooData,
//   ...sooInfo,
// };

// console.log(soo);

// 실습2 (배열합치기)
const arr1 = [1, 2, 3, 4, 5];
const arr2 = ['6', '7', '8'];

const merge = [...arr1, ...arr2];

// console.log(merge);

// 실습3 (나머지연산자, 객체)
const rinData = {
  name: '최수린',
  gender: 'Female',
  nickName: 'soo',
  email: 'ss@naver.com',
};

// 구조분해할당
// const { name, gender, nickName, email } = rinData;
// const { name, ...rinInfo } = rinData;

// console.log(name, rinInfo);

// 실습4 (나머지연산자, 배열)
// const arr3 = [1, 2, 3, 4, 5, 6];

// const [first, second, ...rest] = arr3;

// console.log(first);
// console.log(second);
// console.log(rest);

// 실습5 (매개변수)
function spread(first, second, ...rest) {
  console.log(first, second);
  console.log(rest);
}

spread(1, 2, 3, 4, 5);
