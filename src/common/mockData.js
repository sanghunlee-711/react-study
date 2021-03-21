const freinds = [
  { name: "H1", age: 28 },
  { name: "H2", age: 28 },
  { name: "H3", age: 28 },
  { name: "H4", age: 28 },
  { name: "H5", age: 28 },
];

const timelines = [
  { desc: "GOOD", likes: 0 },
  { desc: "IM GOOD", likes: 10 },
  { desc: "YOU GOOD", likes: 30 },
  { desc: "WE GOOD", likes: 20 },
  { desc: "EVERY GOOD", likes: 50 },
];

function makeDataGenerator(items) {
  //친구목록이나 타임라인이나 생성하는 로직이 같기 때문에 하나의 함수로 작성한다.
  let itemIndex = 0;
  return function getNextData() {
    //getNextData() 함수는 items, itemIndex 변수를 기억하는 클로저다.
    const item = items[itemIndex % items.length];
    itemIndex += 1;
    //getNextData함수는 중복되지 않는 id 값을 넣어서 반환한다.
    return { ...item, id: itemIndex };
  };
}

export const getNextFriend = makeDataGenerator(freinds);
export const getNextTimeLine = makeDataGenerator(timelines);
