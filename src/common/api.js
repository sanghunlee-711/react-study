//해당 함수는 이행됨 상태가 되는 프로미스 객체를 1초후에 반환한다.
// export function callApiLike() {
//   return new Promise((resolve, reject) => {
//     setTimeout(resolve, 1000);
//   });
// }

//Under is Refactored

export function callApiLike() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() * 10 < 5) {
        resolve();
      } else {
        reject("callApiLike Fail");
      }
    }, 1000);
  });
}
