// //createReducer함수에 immer패키지 사용하여 리듀서 함수에서 간편하게 상태값 수정하게 만들기
// import createReducer from "../common/createReducer";

// //action type 상수변수로 정의
// const ADD = "friend/ADD";
// const REMOVE = "firend/REMOVE";
// const EDIT = "friend/EDIT";

// //액션 생성자 함수 정의 외부에서 사용필요하므로 export사용
// export const addFriend = (friend) => ({ type: ADD, friend });
// export const removeFriend = (friend) => ({ type: REMOVE, friend });
// export const editFriend = (friend) => ({ type: EDIT, friend });

// const INITIAL_STATE = { friends: [] };

// //친구 데이터 추가, 삭제, 수정 을 위한 reducer 생성
// const friendReducer = createReducer(INITIAL_STATE, {
//   [ADD]: (state, action) => state.friends.push(action.friend),
//   [REMOVE]: (state, action) =>
//     (state.friends = state.friends.filter(
//       (friend) => friend.id !== action.friend.id
//     )),
//   [EDIT]: (state, action) => {
//     const index = state.friends.findIndex(
//       (friend) => friend.id === action.friend.id
//     );
//     if (index >= 0) {
//       state.friends[index] = action.friend;
//     }
//   },
// });

// //스토어 생성시 필요하므로 외부 공개
// export default friendReducer;

// // 공식문서에는 액션타입, 액션생성자 함수 , 리듀서함수를 각각의 파일로 작성하여 관리하라 설명함
// //근데 귀찮음 그래서 덕스패턴 사용함

// //덕스패턴: 연관된 액션 타입, 생성자 함수, 리듀서 함수를 하나의 파일로 작성
// // 리듀서 함수는 exporttt default키워드로 내보낸다
// // 액션생성자 함수는 export키워드로 내보낸다
// // 액션타입은 접두사와 액션이름을 조합해서 만든다

///Under is Refactored

import createItemsLogic from "../common/createItemsLogic";

const { add, remove, edit, reducer } = createItemsLogic("friends");
export const addFriend = add;
export const removeFriend = remove;
export const editFriend = edit;

export default reducer;
