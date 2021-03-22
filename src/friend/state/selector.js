//createSelector함수를 이용해서 선택자 함수를 만든다
import { createSelector } from "reselect";

//상태값에 있는 데이터를 단순히 전달하는 함수들이고, 이 함수들도 선택자 함수다
// 이렇게 만들어 놓으면 추후에 코드 중복을 없앨 수 있다.
export const getFriends = (state) => state.friend.friends;
export const getAgeLimit = (_, ageLimit) => ageLimit;
export const getShowLimit = (state) => state.friend.showLimit;

//연령제한이 적용된 친구목록을 반환해주는 선택자 함수를 정의한다.
export const getFriendsWithAgeLimit = createSelector(
  //아래 함수로 전달된 인수를 정의한다. 배열의 각 함수가 반환하는 값이 순서대로 전달된다.
  [getFriends, getAgeLimit],

  //배열의 함수들이 반환한 값을 입력받아서 처리하는 함수이다.
  (friends, ageLimit) => friends.filter((friend) => friend.age <= ageLimit)
);

export const getFriendsWithAgeShowLimit = createSelector(
  //getFriendsWithAgeShowLimit는 getFriendsWithAgeLimit함수를 이용한다.
  [getFriendsWithAgeLimit, getShowLimit],
  (friendsWithAgeLimit, showLimit) => friendsWithAgeLimit.slice(0, showLimit)
);

//reselect패키지는 메모제이션 기능이 있다. 연산에 사용되는 데이터가 변경된 경우에만 연산을 수행하고 변경되지 않았따면 이전 결과값을 재사용한다.
//따라서 getFriendsWithAgeLimit함수는 friends, ageLimit가 변경될 때만 연산하고 , getFriendsWithAgeShowLimit는 friend, ageLimit, showLimit가 변경될 때만 연산한다.
//이렇게 선택자 함수를 정의해 놓으면 여러컴포넌트에서 쉽게 재사용할 수 있다.
// 게다가 데이터를 가공하는 코드가 컴포넌트파일에서 분리되기 때문에 컴포넌트 파일에서는 UI코드에 집중할 수 있다는 장점이 있다.

//아래와 같이 자신만의 선택자 함수를 만들 수 있도록 새로운 함수를 생성하고 기존의 getFriendsWithAgeLimit, getFriendsWithAgeShowLimit 함쑤를 삭제한다.
export const makeGetFriendsWithAgeLimit = () => {
  return createSelector([getFriends, getAgeLimit], (friends, ageLimit) =>
    friends.filter((friend) => friend.age <= ageLimit)
  );
};
